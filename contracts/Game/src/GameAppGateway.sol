// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "socket-protocol/contracts/base/AppGatewayBase.sol";
import "./Game.sol";

interface IGameReader {
        function getGameDetails(uint256 roomNumber) external;
}

contract GameGateway is AppGatewayBase{
    // Game configuration and tracking
    uint256 public totalRooms;
    mapping(uint256 => Game) public games;
    mapping(address => Player) public players;
    mapping(address => bool) public userSignUp;
    mapping(address => bool) public hasGameStarted;
    mapping(uint256 => LeaderboardEntry) public leaderboard;

    // Structs to manage game and player data
    struct Player {
        address playerAddress;
        uint256 totalGamesPlayed;
        uint256 totalGamesWon;
    }

    struct LeaderboardEntry {
        address winner;
        uint256 timeTaken;
        uint256 roomNumber;
        uint8 gameType;
        uint256 timestamp;
    }

    // Enum for different game types
    enum GameType {
        Solidity,
        JavaScript,
        ZkMath,
        CryptoGraphy,
        AccountAbstraction,
        Layer2
    }

    // Events for tracking game lifecycle
    event UserSignedUp(address indexed user);
    event GameCreated(uint256 indexed roomNumber, address indexed creator, uint8 gameType);
    event GameJoined(uint256 indexed roomNumber, address indexed player);
    event GameEnded(uint256 indexed roomNumber, address indexed winner);
    event LeaderboardUpdated(uint256 indexed roomNumber, address indexed winner);

    // Interface for async game detail reading
   

    // Constructor
    constructor(
        address _addressResolver,
        address deployerContract_,
        FeesData memory feesData_
    ) AppGatewayBase(_addressResolver) {
        addressResolver.setContractsToGateways(deployerContract_);
        _setFeesData(feesData_);
    }

    // User signup function
    function signUpUser() external {
        require(!userSignUp[msg.sender], "User already signed up");
        userSignUp[msg.sender] = true;
        players[msg.sender] = Player({
            playerAddress: msg.sender,
            totalGamesPlayed: 0,
            totalGamesWon: 0
        });
        emit UserSignedUp(msg.sender);
    }

    // Create a new game
    function createGame(address _instance , uint8 gameType) external async returns (uint256) {
        require(userSignUp[msg.sender], "User must sign up first");

        if(hasGameStarted[_instance]){
            revert("Game already started");
        }
        
        // Increment room number
        uint256 roomNumber = ++totalRooms;
        
        // Deploy new game contract
        Game newGame = Game(_instance);
        games[roomNumber] = newGame;
        
        // Set initial game state
        newGame.initializeGame(msg.sender, gameType, roomNumber);
        
        emit GameCreated(roomNumber, msg.sender, gameType);
        return roomNumber;
    }

    // Join an existing game
    function joinGame(uint256 roomNumber) external async {
        require(userSignUp[msg.sender], "User must sign up first");
        
        Game game = games[roomNumber];
        game.joinGame(msg.sender);
        
        emit GameJoined(roomNumber, msg.sender);
    
        hasGameStarted[address(game)] = true;
        
    }

    // Async end game function
    function endGame(uint256 roomNumber) external async {
        // Ensure the game is in progress
        Game game = games[roomNumber];
        require(hasGameStarted[address(game)], "Game not started");
        game.completeGame(msg.sender);

        // Mark the start of an async read call
        _readCallOn();
        
        // Call to get game details
        IGameReader(address(game)).getGameDetails(roomNumber);
        
        // Create a promise to handle the callback
        IPromise(address(game)).then(
            this.processGameEnd.selector, 
            abi.encode(roomNumber)
        );
        
        // Mark the end of the read call
        _readCallOff();
    }

    // Callback function to process game end
    function processGameEnd(
        bytes calldata data, 
        bytes calldata returnData
    ) external onlyPromises {
        // Decode room number
        uint256 roomNumber = abi.decode(data, (uint256));
        
        // Decode game details
        (address winner, uint256 timeTaken, uint8 gameType) = 
            abi.decode(returnData, (address, uint256, uint8));

        // Update player statistics
        Player storage winnerPlayer = players[winner];
        winnerPlayer.totalGamesPlayed++;
        winnerPlayer.totalGamesWon++;

        // Create leaderboard entry
        leaderboard[roomNumber] = LeaderboardEntry({
            winner: winner,
            timeTaken: timeTaken,
            roomNumber: roomNumber,
            gameType: gameType,
            timestamp: block.timestamp
        });

        // Emit events
        emit GameEnded(roomNumber, winner);
        emit LeaderboardUpdated(roomNumber, winner);

        // Clean up game state
        hasGameStarted[address(games[roomNumber])] = false;
        delete games[roomNumber];
    }


   

    // Retrieve player stats
    function getPlayerStats(address player) external returns (Player memory) {
        return players[player];
    }

    // Retrieve leaderboard entry
    function getLeaderboardEntry(uint256 roomNumber) external  returns (LeaderboardEntry memory) {
        return leaderboard[roomNumber];
    }
}
