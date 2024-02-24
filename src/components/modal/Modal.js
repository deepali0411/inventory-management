import React from "react";

import styles from "./modal.module.scss";

const Modal = ({ children, hideModal }) => {
  return (
    <div>
      <div className={styles.container} onClick={hideModal}></div>
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
};

export default Modal;
