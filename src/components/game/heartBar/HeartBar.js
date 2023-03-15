import React from "react";
import heartImg from "../../../img/heart.svg";
import emptyHeartImg from "../../../img/empty-heart.svg";
import styles from "./HeartBar.module.scss";

export default function HeartBar({ hearts, maxHearts }) {
  return (
    <div className={styles.heartBar}>
      {Array.from(Array(maxHearts)).map((_, i) => (
        <div className={styles.heart}>
          {console.log(i, hearts)}
          <img src={i < hearts ? heartImg : emptyHeartImg} />
        </div>
      ))}
    </div>
  );
}
