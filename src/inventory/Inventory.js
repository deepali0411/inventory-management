import React from "react";
import { useSelector } from "react-redux";

import { Assets } from "../assets/Assets";
import InventoryTable from "../components/inventoryTable/InventoryTable";
import Card from "../components/card/Card";

import {
  getOutOfStocksProduct,
  getTotalAmount,
  getTotalCategory,
} from "../helpers/helpers";
import { TITLE } from "./inventory.constants";

import styles from "./inventory.module.scss";

const Inventory = (props) => {
  const { isAdmin } = props;

  const inventoryData = useSelector((state) => state.changeTheData) || [];

  return (
    <div className={styles.container}>
      <div className={styles.inventoryHeading}>Inventory stats</div>
      <div className={styles.widget}>
        <Card
          icon={Assets.CART}
          title={TITLE.TOTAL_PRODUCTS}
          amount={getTotalAmount(inventoryData, "quantity")}
        />
        <Card
          icon={Assets.DOLLAR}
          title={TITLE.TOTAL_STORE_VALUE}
          amount={getTotalAmount(inventoryData, "value")}
        />
        <Card
          icon={Assets.CANCEL}
          title={TITLE.OUT_OF_STOCKS}
          amount={getOutOfStocksProduct(inventoryData)}
        />
        <Card
          icon={Assets.WAREHOUSE}
          title={TITLE.NO_OF_CATEGORY}
          amount={getTotalCategory(inventoryData)}
        />
      </div>
      <InventoryTable isAdmin={isAdmin} />
    </div>
  );
};

export default Inventory;
