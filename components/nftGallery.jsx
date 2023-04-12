import { useEffect, useState } from "react";
import styles from "../styles/NftGallery.module.css";
import NFTCardV2 from "./nftCardV2";

export default function NFTGallery({}) {
  const [nfts, setNfts] = useState();
  const [fetchMethod] = useState("collection");
  const [pageKey, setPageKey] = useState();
  const [spamFilter] = useState(false);
  const [isLoading, setIsloading] = useState(false);
  const [apiEndpoint] = useState(process.env.NEXT_PUBLIC_NFT_BY_COLLECION_API_URL);

  const fetchNFTs = async (pagekey) => {
    if (!pageKey) setIsloading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify({
          pageKey: pagekey ? pagekey : null,
          pageSize: 20,
          excludeFilter: spamFilter,
        }),
      }).then((res) => res.json());
      
      if (nfts?.length && pageKey) {
        setNfts((prevState) => [...prevState, ...res.nfts]);
      } else {
        setNfts();
        setNfts(res.nfts);
      }
      if (res.pageKey) {
        setPageKey(res.pageKey);
      } else {
        setPageKey();
      }
    } catch (e) {
      console.log(e);
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchNFTs();
  }, [fetchMethod]);
  useEffect(() => {
    fetchNFTs();
  }, [spamFilter]);

  return (
    <div className={styles.nft_gallery_page} >
      {isLoading ? (
        <div className={styles.loading_box}>
          <p>Loading...</p>
        </div>
      ) : (
        <div className={styles.nft_gallery}>
          <div className={styles.nfts_display}>
            {nfts?.length ? (
              nfts.map((nft) => {
                return <NFTCardV2 key={nft.tokenId} nft={nft} />;
              })
            ) : (
              <div className={styles.loading_box}>
                <p>No NFTs found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {pageKey && nfts?.length && (
        <div>
          <a
            className={styles.button_black}
            onClick={() => {
              fetchNFTs(pageKey);
            }}
          >
            Load more
          </a>
        </div>
      )}
    </div>
  );
}