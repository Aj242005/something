// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./Game.sol";
import "socket-protocol/contracts/base/AppDeployerBase.sol";

contract GameDeployer is AppDeployerBase {
    bytes32 public myToken = _createContractId("Game");
    constructor(
        address addressResolver_,
        FeesData memory feesData_
    ) AppDeployerBase(addressResolver_) {
        creationCodeWithArgs[myToken] = abi.encodePacked(
            type(Game).creationCode
        );
        _setFeesData(feesData_);
    }

    function deployContracts(uint32 chainSlug) external async {
        _deploy(myToken, chainSlug);
    }

    function initialize(uint32 chainSlug) public override async {}
}