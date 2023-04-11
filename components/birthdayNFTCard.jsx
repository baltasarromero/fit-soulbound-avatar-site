import styles from "../styles/BirthdayNFTCard.module.css";

 // input is a date
 const displayBirthday = (input) => {
  // Create an array of weekday names
  var weekdays = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado"];
  // Get the day of the week from the input date
  var weekday = weekdays[input.getDay()];
  // Get the date and month from the input date
  var date = input.getDate();
  // Get the current year and calculate the age
  var currentYear = new Date().getFullYear();
  var age = currentYear - input.getFullYear();
  // Return the formatted output
  return `${weekday} ${date} - ${age} años `;
}


export default function BirthdayNFTCard({ nft }) {
    return (
      <div className={styles.card_container}>
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
            <h3>{nft.employeeName}</h3>
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
  
          <div className={styles.description_container}>
            <p>{displayBirthday(new Date(nft.birthday))}</p>
          </div>
        </div>
      </div>
    );
  }
  