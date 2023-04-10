# FIT Soulbound Avatar's site

The goal of this project is to connect to an souldbound NFT contract and display the NFTs on the collection. These soulbound tokens have specific metadata to indicate the birthday of the person which is used to populate the birthdays section.
The contract also supports the concept of monthyl and yearly mvps, this information is used to populate the MVP section.
Alchemy SDK is used to get nft metadata and ethers js is used for direct interacion with the contract methods in this case the data for the montly and yearly mvps.

## Site sections

- Team: The complete team
- MVP: Display the latest mvp (the last one selected) and the previous list
- Birthdays: Display current month's birthdays

## Tech Stack

This project was built based on create-web3-dapp from Alchemy and it uses the following tech stack.

- React js
- Next
- Alchemy SDK
- Alchemy API
- Ethers js

### Other dependencies

- Dotenv for access to env variables

## Configuration

Add a .env file with the following key values

```
#ALCHEMY CONFIGS
ALCHEMY_API_KEY = {YOUR_ALCHEMY_API_KEY}
ALCHEMY_NETWORK = {NETWORK_WHERE_THE_CONTRACT_IS_DEPLOYED} // e.g. ETH_SEPOLIA or MATIC_MUMBAI
// Variables visible to frontend. This will be moved to another config file
NEXT_PUBLIC_DEFAULT_CHAIN = ethSepolia
NEXT_PUBLIC_NFT_BY_COLLECION_API_URL = "/api/getNftsForCollection"
NEXT_PUBLIC_GET_MVPS_API_URL = "/api/getMvps"
NEXT_PUBLIC_GET_BIRTHDAYS_API_URL = "/api/getBirthdays"

#Folder NFT contract
FOLDER_NFT_CONTRACT_ADDRESS = {ADDRESS_OF_THE_SOULBOUND_AVATARS_CONTRACT}
```

## Install dependencies

Run the following command

```
yarn install
```

## How to run the site

Run the following command

```
yarn run dev
```
