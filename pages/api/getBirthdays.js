import { Network, Alchemy } from "alchemy-sdk";

export default async function handler(req, res) {
  const { currentMonth } = JSON.parse(req.body);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  const settings = {
    apiKey: process.env.ALCHEMY_API_KEY,
    network: Network[process.env.ALCHEMY_NETWORK],
  };

  try {
    const alchemy = new Alchemy(settings);

    // TODO pass the nfts as props or use a persistant storage
    // Get All NFTs from Alchemy API
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
      };
    });

    // Filter NFTs using current month

    const filteredNfts = formattedNfts.filter(
      (nft) => new Date(nft.birthday).getMonth() === currentMonth
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
