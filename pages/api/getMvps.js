import { Network, Alchemy } from "alchemy-sdk";
import { ZeroAddress, ethers } from "ethers";

const fitNFTContractABI = require("../../artifacts/FITNFT-abi.json");

export default async function handler(req, res) {
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

  // TODO pass the nfts as props or use a persistant storage
  // Get All NFTs from Alchemy API
  const nfts = await alchemy.nft.getNftsForContract(
    process.env.FOLDER_NFT_CONTRACT_ADDRESS,
    {}
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
      description,
      format: media[0]?.format ? media[0]?.format : "png",
    };
  });

  // Get MVP values
  // Get contract address and abi
  const fitNFTAddress = process.env.FOLDER_NFT_CONTRACT_ADDRESS;
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

  try {
    // Load the contract
    const fitNFTContract = new ethers.Contract(
      fitNFTAddress,
      fitNFTContractABI,
      provider
    );

    // Retrieve MVP arrays from contract storage
    const mvps = await fitNFTContract.getMontlhyMvps();
    // Array of filtered NFTs that will be returned to the UI
    let mpvsByAddressMap = new Object();

    if (Array.isArray(mvps) && mvps.length) {
      for (const [index, mvp] of mvps.entries()) {
        if (mvp != ZeroAddress) {
          mpvsByAddressMap[mvp] = months[index];
        }
      }
    }

    // Filter NFTs using MVPs
    const filteredNfts = formattedNfts.filter(
      (nft) => nft.tokenId === "8" || nft.tokenId === "4" || nft.tokenId === "2"
    );

    res.status(200).json({
      nfts: filteredNfts.length ? filteredNfts.reverse() : null,
      pageKey: nfts.pageKey,
    });
  } catch (e) {
    console.warn(e);
    res.status(500).send({
      message: "something went wrong while retrieving mvps",
    });
  }
}
