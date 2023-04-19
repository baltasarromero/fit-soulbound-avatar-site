import styles from "../styles/NftCardV2.module.css";
import { FaMedal, FaBirthdayCake } from "react-icons/fa";

const displayBirthday =  (birthday) =>   {
  // Birth date
  const birthDate = new Date(birthday);
  
  // Current date
  let currentYearBirthday = new Date();

  if (birthDate.getMonth() === currentYearBirthday.getMonth()) {
    currentYearBirthday.setDate(birthDate.getUTCDate());
    currentYearBirthday.setMonth(birthDate.getMonth());
    console.log("current date", currentYearBirthday);
    
    // Get the current year and calculate the age
    const currentYear = currentYearBirthday.getFullYear();
    const age = currentYear - birthDate.getFullYear();
    const date = currentYearBirthday.getUTCDate();

    // Get the day of the week from the input date
    // Create an array of weekday names
    var weekdays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
    var weekday = weekdays[currentYearBirthday.getUTCDay()];
    
    // Return the formatted output
    return `${weekday} ${date} - ${age} años `;
  } else {
    return ""
  }  
}

export default function NftCardV2({ nft }) {
    return (
      <div className={nft.mvp? styles.mvp_card_container: styles.card_container}>
        <div className={styles.image_container}>
          {nft.format == "mp4" ? (
            <video src={nft.media} controls>
              Your browser does not support the video tag.
            </video>
          ) : (
            <img src={nft.media}></img>
          )}
        </div>
        <div className={styles.info_container}>
          <div className={styles.title_container}>
            <h3 className={styles.name_info_container}>{nft.title}</h3>
          </div>
          <hr className={styles.separator} />
          <div className={styles.symbol_contract_container}>
            <div className={styles.symbol_container}>
              <p>{nft.symbol}</p>
  
              {nft.verified == "verified" ? (
                <img
                  src={
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Twitter_Verified_Badge.svg/2048px-Twitter_Verified_Badge.svg.png"
                  }
                  width="20px"
                  height="20px"
                />
              ) : null}
            </div>
            <div className={styles.contract_container}>
              <p className={styles.contract_container}>
                {nft.contract?.slice(0, 6)}...
                {nft.contract?.slice(38)}
              </p>
              <img
                src={
                  "https://etherscan.io/images/brandassets/etherscan-logo-circle.svg"
                }
                width="15px"
                height="15px"
              />
            </div>
          </div>
  
          <div style={{display: 'flex'}}>
            {nft.birthday ?  (<div className={styles.details_container}>{displayBirthday(nft.birthday)}</div> ) : ("")}
          </div>
        </div>
      </div>
    );
  }
  