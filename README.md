# FlashLoanSimple

Welcome to the `FlashLoanSimple` repository. This project showcases a basic implementation of a FlashLoan contract for Aave v3, using the Hardhat framework. The primary goal of this project is to provide a simple example of how flash loans work within the Aave ecosystem.

## Table of Contents

- [What is a Flash Loan?](#what-is-a-flash-loan)
- [Usage](#usage)
- [Purpose and Utility](#purpose-and-utility)
- [Verification and Security](#verification-and-security)
- [Commented Code](#commented-code)
- [Getting Started](#getting-started)
- [Smart Contract Deployment](#smart-contract-deployment)
- [Testing and Transfer](#testing-and-transfer)
- [Contributions](#contributions)
- [License](#license)
- [Project Updates](#project-updates)
- [Additional Resources](#additional-resources)
- [Donations](#donations)

## What is a Flash Loan?

A flash loan is a type of DeFi (Decentralized Finance) lending mechanism that allows users to borrow assets from a liquidity pool without the need for collateral, as long as the borrowed amount is returned within a single transaction block. Flash loans are typically used for arbitrage opportunities, liquidations, or other complex financial operations in the DeFi space.

## Usage

Please refer to the code comments and documentation within the project for details on how to use the FlashLoan contract. Make sure to follow best practices for security and testing before deploying it in a production environment.

## Purpose and Utility

The purpose of this project is to demonstrate a basic flash loan contract built on the Aave protocol. While this implementation is simplified, it can serve as a starting point for developers looking to integrate flash loans into their projects or learn how flash loans work in practice.

## Verification and Security

Each modification to this project undergoes a meticulous verification process and subsequent signing. This stringent approach guarantees the authenticity and integrity of our codebase. In case you encounter any modifications that lack appropriate verification, we strongly advise against cloning or utilizing them, as they might harbor malicious code.

## Commented Code

**Please take note:** Our codebase is meticulously documented with comprehensive comments, aimed at providing a clear understanding of the functionality of individual components.

## Getting Started

To explore and interact with our `FlashLoanSimple` project, follow these steps:

1. Clone this repository to your local machine.

   ```bash
   git clone https://github.com/Innovation-Web-3-0-Blockchain/FlashLoanSimple.git
   ```
   
2. Ensure you have `node.js` and `npm` installed in your environment.

3. Install the necessary dependencies by running the following command in your terminal:

   ```bash
   npm install
   ```
   
## Smart Contract Deployment

**For easier understanding of how flash loans work, we did not write the deployment script. We used Remix to deploy the smart contract on the Hardhat local blockchain.**

To deploy the `FlashLoanSimple.sol` contract, follow these steps:

1. Visit the Remix Ethereum website: [Remix Ethereum](https://remix.ethereum.org/)

2. Import the `FlashLoanSimple.sol` contract from the `./contracts` repository.

3. Compile the contract on Remix with the compiler version 0.8.10.

4. Set your deployment environment by forking the network you want to use for the Hardhat node. We recommend using your own RPC URL for better reliability. You can create your own Web3 API keys on the Infura website: [Infura](https://www.infura.io/)

   You can also use a public RPC URL. Visit the Chainlist website for any public URL on the network you want to use: [Chainlist](https://chainlist.org/)

5. If you use your own RPC URL, create a **.env** file and add the following:

   ```env
   API_KEY=""        // Insert your Web3 API key between the quotation marks
   PRIVATE_KEY=""    // Insert your wallet private key between the quotation marks
   ```

6. Command to fork Ethereum mainnet for your Hardhat node, using your own RPC URL:

   ```bash
   npx hardhat node --fork https://mainnet.infura.io/v3/PASTE_YOUR_API_KEY_HERE    
   ```

   Command to fork Ethereum mainnet for your Hardhat node, using a public RPC URL:

   ```bash
   npx hardhat node --fork https://ethereum.publicnode.com
   ```

7. Connect Remix with Hardhat by setting the environment tab with the **"Dev - Hardhat Provider"** option.

8. In the **"address provider"** tab, paste one of the **PoolAddressesProvider** addresses provided by Aave. Visit their website for the specific address of the network you want to use: [Aave V3 Deployed Contracts](https://docs.aave.com/developers/deployed-contracts/v3-mainnet)

   Ethereum mainnet:

   ```bash
   0x2f39d218133AFaB8F2B819B1066c7E434Ad94E9e
   ```

9. Click **"deploy"**, and if the deployment is successful, you should see the transaction hash on your local node.

**IMPORTANT NOTE:** Make sure that your **.env** file is private, and that you never share its contents.

## Testing and Transfer

**Before proceeding, ensure that your local node is running in your command line.** 

To test the FlashLoan and transfer assets, open a new command line tab to follow these steps:

1. Initiate a JavaScript Console

   ```bash
   npx hardhat console --network localhost
   ```

2. Copy lines 6 and 7 from the **1_FlashLoanSimpleTest.js** file, and paste them into your console.

   ```javascript
   const DAI = "0x6b175474e89094c44da98b954eedeac495271d0f"; 
   const DAI_WHALE = "0x8A610c1C93da88c59F51A6264A4c70927814B320"
   ```

3. Get the Token Contract Address

   ```javascript
   token = await ethers.getContractAt("IERC20", DAI)
   ```

   **Handling the Uncaught Hardhat Error**

   If you encounter an Uncaught Hardhat Error, follow these additional steps:

   ```javascript
   // Wrap the token address in a shell contract
   Lock = await ethers.getContractFactory("Lock")

   // Attach the DAI to the lock contract
   Lock.attach(DAI)

   // Assign DAI to a variable
   dai = Lock.attach(DAI)

   // Check if you can get a symbol back
   await dai.symbol()
   ```

4. Unlock the WHALE Address

   ```javascript
   // Fetch the WHALE address
   DAI_WHALE

   // Unlock the WHALE address
   await hre.network.provider.request({
     method: "hardhat_impersonateAccount",
     params: [DAI_WHALE],
   })
   ```

5. Set the WHALE Address as Signer

   ```javascript
   signer = await ethers.getSigner(DAI_WHALE);
   ```

   If have you encountered the **Uncaught Hardhat Error**, use the `dai` variable instead of `token` for the steps below.

6. Connect the Signer

   ```javascript
   token.connect(signer)
   ```

7. Verify the Balance of the `FlashLoanSimple` Address

   ```javascript
   await token.balanceOf("")    // Paste the address of the SimpleFlashLoan between quotation marks
   ```

   This should return a balance of 0.

8. Transfer Assets to the `FlashLoanSimple` Address

   ```javascript
   await token.connect(signer).transfer("", ethers.utils.parseEther("1000"))    // Paste the address of the SimpleFlashLoan between quotation marks
   ```

9. Verify the Transfer

   Recheck the balance of the `FlashLoanSimple` address by using the same command as in step 7. This time, it should return a value. These assets are used to pay for the FlashLoan fees.

10. Test the FlashLoan with Remix

    In Remix under the **"Deployed Contract"** section, you should see `createFlashLoan` with 2 tabs: **"asset"** & **"amount"**.

    - In the **"asset"** tab, paste the token contract address, DAI address on Ethereum mainnet:

      ```bash
      0x6b175474e89094c44da98b954eedeac495271d0f
      ```

    - In the **"amount"** tab, input the `parseEther` amount you want to borrow. To get the `parseEther` value, you can use the following command in your console:

      ```javascript
      ethers.utils.parseEther("500")
      ```

    - Copy the return value and paste it in the **"amount"** tab. Then, click **"transact"**.

    - If the transaction is successful, you should see a transaction hash.

**All of these steps are intended for educational purposes only; do not try this on a mainnet.**

## Contributions

Contributions to this project are welcome and encouraged. If you identify any bugs, have feature requests, or would like to improve the project, please open an issue or submit a pull request. We appreciate your interest and contributions.

## License

This project is licensed under the MIT License. For details, please refer to the [LICENSE](LICENSE) file.

## Project Updates

As the DeFi ecosystem continues to evolve, we will monitor and update this project to align with the latest developments and best practices. Stay tuned for updates and improvements!

## Additional Resources

For more advanced topics related to this project, including deployment scripts and deploying the SimpleFlashLoan contract on testnets, including Layer 2 solutions, please refer to the [Aave-Simple-Flash-Loan-Pt-2](https://github.com/CyberAnon1010101/Blockchain-BasicFlashLoan-Part-2) repository.

For more details on flash loans and how they work in Aave, please refer to the [Aave Flash Loans Guide](https://docs.aave.com/developers/guides/flash-loans).

## Donations

### Our Values

We do not use any form of social media or engage in marketing activities. Our principles are rooted in open source and privacy, and we do not receive compensation for our contributions to GitHub. Furthermore, we do not endorse or have affiliations with any other projects.

### Supporting Us

While we remain committed to providing valuable resources for aspiring blockchain developers, any donations are greatly appreciated. Your support will help us offset the time and effort we invest in these projects to facilitate access to accessible information.

### Donation Options

We welcome contributions in Bitcoin and Monero, and you can send contributions by scanning one of the addresses in the QR codes at the following link: [Donate to Innovation Web 3.0](https://innovationweb3.github.io/)

Thank you for your support and for being part of our community!