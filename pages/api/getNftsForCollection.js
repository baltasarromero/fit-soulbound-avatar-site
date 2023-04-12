import { Network, Alchemy } from "alchemy-sdk";

import { ZeroAddress, ethers } from "ethers";
const fitNFTContractABI = require("../../artifacts/FITNFT-abi.json");
// Get MVP values
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

export default async function handler(req, res) {
  const { pageKey, pageSize } = JSON.parse(req.body);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }
  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network[process.env.ALCHEMY_NETWORK],
  };

  const alchemy = new Alchemy(settings);
  const provider = await alchemy.config.getProvider();

  try {
    // Get contract address
    const fitNFTAddress = process.env.FOLDER_NFT_CONTRACT_ADDRESS;

    // Load the contract
    const fitNFTContract = new ethers.Contract(
      fitNFTAddress,
      fitNFTContractABI,
      provider
    );

    // Retrieve MVP arrays from contract storage
    const mvps = await fitNFTContract.getMontlhyMvps();
    // Map of mvps where the key is the tokenID and the value is the month when they were MVP
    let mvpsByTokenIdMap = new Object();

    if (Array.isArray(mvps) && mvps.length) {
      for (const [index, mvp] of mvps.entries()) {
        if (mvp[0] != ZeroAddress) {
          mvpsByTokenIdMap[mvp[1]] = months[index];
        }
      }
    }

    // Get NFTs from FIT NFT collection using alchemy's API
    const nfts = await alchemy.nft.getNftsForContract(
      process.env.FOLDER_NFT_CONTRACT_ADDRESS
    );

    const formattedNfts = nfts.nfts.map((nft) => {
      const { contract, tokenType, tokenId, description, media, rawMetadata } =
        nft;

      return {
        contract: contract.address,
        symbol: contract.symbol,
        media: media[0]?.gateway
          ? media[0]?.gateway
          : "https://via.placeholder.com/500",
        collectionName: contract.openSea?.collectionName,
        verified: contract.openSea?.safelistRequestStatus,
        tokenType,
        tokenId,
        title: rawMetadata.fullName,
        employeeName: rawMetadata.fullName,
        birthday: rawMetadata.birthday,
        description,
        format: media[0]?.format ? media[0]?.format : "png",
        mvp: mvpsByTokenIdMap[tokenId],
        yearlyMVP: false,
      };
    });

    const filteredNfts = formattedNfts.filter(
      (nft) => nft.title && nft.description.length && nft.media
    );

    res.status(200).json({
      nfts: filteredNfts.length ? filteredNfts : null,
      pageKey: nfts.pageKey,
    });
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message:
        "something went wrong while retrieving the NFTs from the collection",
    });
  }
}
