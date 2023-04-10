import { useEffect, useState } from "react";
import styles from "../styles/MvpGallery.module.css";
import NftCard from "./nftCard";

export default function MVPGallery({}) {
  const [previousMvps, setPreviousMVPs] = useState();
  const [currentMVP, setCurrentMVP] = useState();
  const [collectionAddress] =
    useState(process.env.FOLDER_NFT_CONTRACT_ADDRESS);
  const [fetchMethod] = useState("collection");
  const [spamFilter] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [mvpText, setMVPText] = useState();
  const [apiEndpoint] = useState(process.env.NEXT_PUBLIC_GET_MVPS_API_URL);

  const generateMVPText = async () => {
    const mvpText = `MVP actual`;
    setMVPText(mvpText);
  }

  const fetchMVPs = async () => {
    setIsloading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify({
        }),
      }).then((res) => res.json());

      
      // Set current MVP if the array of MVPs is not empty. Current MVP is the first one because the service returns
      // the mvps in inverse chronological order
      let mvpNfts = res.nfts;
 
      if (Array.isArray(mvpNfts) && mvpNfts.length) {
        setCurrentMVP(mvpNfts.shift());
      }
      // Set previous MVPs
      setPreviousMVPs();
      setPreviousMVPs(mvpNfts);
    } catch (e) {
      console.log(e);      
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchMVPs();
  }, [fetchMethod]);
  useEffect(() => {
    fetchMVPs();
  }, [spamFilter]);


  useEffect(() => {
    generateMVPText();
  } );

  return (
    <div className={styles.mvp_gallery_page} >
      {isLoading ? (
        <div className={styles.loading_box}>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div className={styles.mvp_titles}>
            {mvpText}
          </div>    
          <div className={styles.mvp_gallery}>
            <div className={styles.mvps_current_display}>
              {currentMVP != null? (
                  <NftCard key={currentMVP.tokenId} nft={currentMVP} />
                )
                : (
                <div className={styles.loading_box}>
                  <p>No hay un MVP este mes</p>
                </div>
              )}
            </div>
          </div>
          <div>
            <div className={styles.mvp_titles}>
              Anteriores MVP
            </div>       
            <div className={styles.nfts_display}>
              {previousMvps?.length ? (
                previousMvps.map((nft) => {
                  return <NftCard key={nft.tokenId} nft={nft} />;
                })
              ) : (
                <div className={styles.loading_box}>
                  <p>Aún no se otorgaron MVPs</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

