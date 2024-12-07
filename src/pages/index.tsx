import React, { useState } from 'react';
import { ConnectWallet, Wallet, WalletDropdown, WalletDropdownBasename, WalletDropdownDisconnect } from "@coinbase/onchainkit/wallet";
import { Address, Avatar, Name, Identity, EthBalance } from "@coinbase/onchainkit/identity";
import { color } from "@coinbase/onchainkit/theme";
import RoomCode from '../components/RoomCode';

const Home = () => {
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [showNewButtons, setShowNewButtons] = useState(false);
    const [showRoomCode, setShowRoomCode] = useState(false);
    const [selectedTopic, setSelectedTopic] = useState<'zk' | 'solidity' | null>(null);
    const [roomCode, setRoomCode] = useState<string>("000000000");

    const handlePlayClick = () => {
        setIsGameStarted(true);
    };

    const handleCreateClick = () => {
        setShowNewButtons(true);
    };

    const handleTopicClick = (topic: 'zk' | 'solidity') => {
        setSelectedTopic(topic);
        // Generate or set room code based on topic
        const newRoomCode = '111111111';
        setRoomCode(newRoomCode);
        setShowRoomCode(true);
    };

    const handleStartGame = () => {
        console.log('Starting game with code:', roomCode);
        // Add your game start logic here
    };

    const handleCopyCode = () => {
        navigator.clipboard.writeText(roomCode);
        alert('Code copied to clipboard!');
    };

    return (
        <div className="relative">
            <div className="flex flex-col items-center mt-4 bg-white/10 rounded-lg p-6 shadow-lg backdrop-blur-md space-y-4">
                <Wallet>
                    <ConnectWallet className="flex items-center space-x-3 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow-md transition-transform duration-300 hover:scale-105">
                        <Avatar className="h-8 w-8 rounded-full" />
                        <span className="font-semibold">Connect Wallet</span>
                    </ConnectWallet>
                    <WalletDropdown>
                        <Identity className="px-4 pt-3 pb-2 text-white space-y-3 bg-gray-800 rounded-lg shadow-md">
                            <Avatar className="h-12 w-12" />
                            <Name className="font-bold text-lg" />
                            <Address className={`text-sm ${color.foregroundMuted}`} />
                            <EthBalance className="font-medium text-white/90" />
                        </Identity>
                        <WalletDropdownBasename className="text-sm text-gray-300 hover:text-white" />
                        <button className="mt-4 py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md">
                            <WalletDropdownDisconnect />
                        </button>
                    </WalletDropdown>
                </Wallet>
            </div>
            <div 
                className="min-h-screen w-full"
                style={{
                    backgroundImage: `url('/assets/${isGameStarted ? 'final_bg' : 'final_bg_with_text'}.svg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                }}
            />
            {isGameStarted && !showNewButtons ? (
                <div className="absolute top-1/4 left-0 w-full flex justify-center gap-32">
                    <button 
                        className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                        style={{
                            backgroundImage: "url('/assets/join_button.svg')",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'transparent'
                        }}
                    />
                    <button 
                        onClick={handleCreateClick}
                        className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                        style={{
                            backgroundImage: "url('/assets/create_button.svg')",
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat',
                            border: 'none',
                            cursor: 'pointer',
                            backgroundColor: 'transparent'
                        }}
                    />
                </div>
            ) : isGameStarted && showNewButtons ? (
                <div className="absolute top-1/4 left-0 w-full flex flex-col items-center">
                    {!showRoomCode ? (
                        <>
                            <div className="mb-8">
                                <img 
                                    src="/assets/select_topic.svg" 
                                    alt="Select Topic"
                                    className="w-[600px]"
                                />
                            </div>
                            <div className="flex justify-center gap-32">
                                <button 
                                    onClick={() => handleTopicClick('zk')}
                                    className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                                    style={{
                                        backgroundImage: "url('/assets/ZK_Math.svg')",
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent'
                                    }}
                                />
                                <button 
                                    onClick={() => handleTopicClick('solidity')}
                                    className="w-[486px] h-[122px] transform hover:scale-110 transition-transform"
                                    style={{
                                        backgroundImage: "url('/assets/solidity.svg')",
                                        backgroundSize: 'contain',
                                        backgroundPosition: 'center',
                                        backgroundRepeat: 'no-repeat',
                                        border: 'none',
                                        cursor: 'pointer',
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            </div>
                        </>
                    ) : (
                        <div className="flex justify-center items-center min-h-[20vh]">
                            <RoomCode 
                                numbers={roomCode}
                                onStartGame={handleStartGame}
                                onCopyCode={handleCopyCode}
                            />
                        </div>
                    )}
                </div>
            ) : (
                <button 
                    onClick={handlePlayClick}
                    className="absolute bottom-0 left-0 w-full h-1/5 transform scale-[0.2]"
                    style={{
                        backgroundImage: "url('/assets/play_game.svg')",
                        backgroundSize: 'contain',
                        backgroundPosition: 'center bottom',
                        backgroundRepeat: 'no-repeat',
                        border: 'none',
                        cursor: 'pointer',
                        backgroundColor: 'transparent'
                    }}
                />
            )}
        </div>
    );
};

export default Home;