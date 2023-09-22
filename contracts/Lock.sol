// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import OpenZeppelin's ERC20 contract
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Lock is ERC20 {
    // State variables
    uint public unlockTime;
    address payable public owner;

    // Events
    event Withdrawal(uint amount, uint when);

    // Constructor to initialize the contract
    constructor(uint _unlockTime) ERC20("LockToken", "LTK") {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );

        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }

    // Withdraw function to release funds to the owner
    function withdraw() public {
        require(block.timestamp >= unlockTime, "You can't withdraw yet");
        require(msg.sender == owner, "You aren't the owner");

        emit Withdrawal(address(this).balance, block.timestamp);

        // Transfer the contract balance to the owner
        owner.transfer(address(this).balance);
    }
}
