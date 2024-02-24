import React from "react";

import styles from "./card.module.scss";

const Card = ({ icon, title, amount }) => {
  return (
    <div className={styles.container}>
      <img src={icon} alt="card icon" width={30} height={30} />
      <div className={styles.text}>
        <div className={styles.title}>{title}</div>
        <div className={styles.amount}>{amount}</div>
      </div>
    </div>
  );
};

export default Card;
