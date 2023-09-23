// Import necessary modules
const { expect } = require("chai");
const { ethers } = require("hardhat");

// Define the addresses and contract information
const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f"; // Mainnet DAI Address
const DAI_WHALE = "0x1821Eb432E091Cce0f2Aa13BD64399A474D325d0"; // Random user's address with a lot of DAI
const POOL_ADDRESS_PROVIDER = "0x87870Bca3F3fD6335C3F4ce8392D69350B4fA4E2"; // Mainnet Pool contract address

describe("Storage", function () {
  it("test initial value", async function () {
    // Get the contract factory for SimpleFlashLoanETH
    const SimpleFlashLoan = await ethers.getContractFactory("SimpleFlashLoan");
    
    // Attach the SimpleFlashLoanETH contract to an existing instance
    let simpleFlashLoan = SimpleFlashLoan.attach("");

    // Get the DAI token contract
    const token = await ethers.getContractAt("IERC20", DAI);

    // Define the amount of DAI to borrow
    const BALANCE_AMOUNT_DAI = ethers.utils.parseEther("2000");

    // Create a Flash Loan of 1000 DAI with no upfront collateral
    const tx = await simpleFlashLoan.createFlashLoan(DAI, ethers.utils.parseEther("1000"));
    await tx.wait();

    // Check the remaining balance of DAI in the Flash Loan contract
    const remainingBalance = await token.balanceOf(simpleFlashLoan.address);
    console.log(`Remaining balance: ${remainingBalance}`);

    // Assert that the remaining balance is less than the initial balance
    expect(remainingBalance.lt(BALANCE_AMOUNT_DAI)).to.be.true;
  });
});
