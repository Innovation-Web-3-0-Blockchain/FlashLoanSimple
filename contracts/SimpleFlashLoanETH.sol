// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

// Import SafeMath library from OpenZeppelin
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

// Import necessary Aave and ERC20 interfaces
import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract SimpleFlashLoan is FlashLoanSimpleReceiverBase {
    using SafeMath for uint;

    // Event to log asset and balance
    event Log(address asset, uint val);

    constructor(IPoolAddressesProvider provider) FlashLoanSimpleReceiverBase(provider) {}

    // Function to initiate a flash loan
    function createFlashLoan(address asset, uint amount) external {
        address receiver = address(this);
        bytes memory params = "";
        uint16 referralCode = 0;

        emit Log(asset, IERC20(asset).balanceOf(address(this)));

        POOL.flashLoanSimple(
            receiver,
            asset,
            amount,
            params,
            referralCode
        );
    }

    // Function called by Aave after a flash loan is initiated
    function executeOperation(
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata params
    ) external returns (bool) {

        // 👇 Your custom logic for the flash loan should be implemented here 👇

                         /** YOUR CUSTOM LOGIC HERE */

        // 👆 Your custom logic for the flash loan should be implemented above here 👆

        emit Log(asset, IERC20(asset).balanceOf(address(this)));

        uint amountOwing = amount.add(premium);
        IERC20(asset).approve(address(POOL), amountOwing);

        return true;
    }
}
