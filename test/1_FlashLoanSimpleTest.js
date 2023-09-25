// Import necessary modules
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Define the addresses and contract information
const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f"; // Mainnet DAI Address
const DAI_WHALE = "0x8A610c1C93da88c59F51A6264A4c70927814B320"; // Random user's address with a lot of DAI
const POOL_ADDRESS_PROVIDER = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"; // Mainnet Pool contract address

describe("Storage", function () {
  it("test initial value", async function () {
    // Get the contract factory for FlashLoanSimpleETH
    const FlashLoanSimple = await ethers.getContractFactory("FlashLoanSimple");
    
    // Attach the FlashLoanSimpleETH contract to an existing instance
    let FlashLoanSimple = FlashLoanSimple.attach("");

    // Get the DAI token contract
    const token = await ethers.getContractAt("IERC20", DAI);

    // Define the amount of DAI to borrow
    const BALANCE_AMOUNT_DAI = ethers.utils.parseEther("2000");

    // Create a Flash Loan of 1000 DAI with no upfront collateral
    const tx = await FlashLoanSimple.createFlashLoan(DAI, ethers.utils.parseEther("1000"));
    await tx.wait();

    // Check the remaining balance of DAI in the Flash Loan contract
    const remainingBalance = await token.balanceOf(FlashLoanSimple.address);
    console.log(`Remaining balance: ${remainingBalance}`);

    // Assert that the remaining balance is less than the initial balance
    expect(remainingBalance.lt(BALANCE_AMOUNT_DAI)).to.be.true;
  });
});
