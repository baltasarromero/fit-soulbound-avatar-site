import { Network, Alchemy } from "alchemy-sdk";

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

  try {
    const nfts = await alchemy.nft.getNftsForContract(
      process.env.FOLDER_NFT_CONTRACT_ADDRESS,
      {
        pageKey: pageKey ? pageKey : null,
        pageSize: pageSize ? pageSize : null,
      }
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
      message: "something went wrong while retrieving NFTs by collection",
    });
  }
}
