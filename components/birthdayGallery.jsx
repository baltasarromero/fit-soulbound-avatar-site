import { useEffect, useState } from "react";
import styles from "../styles/MvpGallery.module.css";
import BirthdayNFTCard from "./birthdayNFTCard";

export default function BirthdayGallery({}) {
  const [birthdays, setBirthdays] = useState();
  const [collectionAddress] =
    useState(process.env.FOLDER_NFT_CONTRACT_ADDRESS);
  const [fetchMethod] = useState("collection");
  const [spamFilter] = useState(true);
  const [isLoading, setIsloading] = useState(false);
  const [birthdayText, setBirthdayText] = useState();
  const [apiEndpoint] = useState(process.env.NEXT_PUBLIC_GET_BIRTHDAYS_API_URL);

  const generateBirthdayText = async () => {
    var date = new Date(); // current date
    var monthLong = date.toLocaleString("es-ES", { month: "long" }); // full name
    const birthdayTest = `Cumpleaños del mes de ${monthLong}`;
    setBirthdayText(birthdayTest);
  }


  const fetchBirthdays = async () => {
    setIsloading(true);
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        body: JSON.stringify({
          currentMonth: new Date().getMonth() // use current month to retrieve all NFTs that have a birthday this month
        }),
      }).then((res) => res.json());

      
      // Set previous MVPs
      setBirthdays();
      setBirthdays(res.nfts);
    } catch (e) {
      console.log(e);      
    }

    setIsloading(false);
  };

  useEffect(() => {
    fetchBirthdays();
  }, [fetchMethod]);
  useEffect(() => {
    fetchBirthdays();
  }, [spamFilter]);


  useEffect(() => {
    generateBirthdayText();
  } );

  return (
    <div className={styles.mvp_gallery_page} >
      {isLoading ? (
        <div className={styles.loading_box}>
          <p>Loading...</p>
        </div>
      ) : (
        <div>
          <div>
            {birthdays?.length ? (
              <div className={styles.mvp_titles}>
              {birthdayText}
              </div>    
            ) : ""}    
            <div className={styles.nfts_display}>
              {birthdays?.length ? (
                birthdays.map((nft) => {
                  return <BirthdayNFTCard key={nft.tokenId} nft={nft} />;
                })
              ) : (
                <div className={styles.mvp_titles}>
                  <p>No hay cumpleaños este mes</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

