import React, { useReducer, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import cx from "classnames";

import { getInitialValues, validateForm } from "./editForm.helper";
import { editRow } from "../../actions/actions";

import styles from "./editForm.module.scss";

const EditForm = ({ formValues, hideModal }) => {
  const dispatchToReducer = useDispatch();

  const reducer = (prev, next) => ({ ...prev, ...next });
  const [state, dispatch] = useReducer(reducer, getInitialValues(formValues));

  const [shouldDisableButton, setShouldDisableButton] = useState(false);

  useEffect(() => {
    setShouldDisableButton(
      state.category.hasError ||
        state.price.hasError ||
        state.quantity.hasError ||
        state.value.hasError
    );
  }, [state]);

  const handleChange = (val) => (e) => {
    const { hasError, error } = validateForm(val, e.target.value);

    dispatch({
      [val]: { ...state[val], val: e.target.value, hasError, error },
    });
  };

  const handleSubmit = () => {
    const newFormValues = {
      ...formValues,
      category: state.category.val,
      price: "$" + state.price.val,
      quantity: state.quantity.val,
      value: "$" + state.value.val,
    };
    dispatchToReducer(editRow(newFormValues));
    hideModal();
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>Edit Product</div>
      <div className={styles.productName}>{formValues.name}</div>
      <div className={styles.formContainer}>
        <label className={styles.inputBox}>
          Category
          <input
            placeholder="Type here..."
            type="text"
            className={styles.inputField}
            value={state.category.val}
            onChange={handleChange("category")}
          />
          <div className={styles.errorMessage}>{state.category.error}</div>
        </label>
        <label className={styles.inputBox}>
          Price
          <input
            placeholder="Type here..."
            type="text"
            className={styles.inputField}
            value={state.price.val}
            onChange={handleChange("price")}
          />
          <div className={styles.errorMessage}>{state.price.error}</div>
        </label>
        <label className={styles.inputBox}>
          Quantity
          <input
            placeholder="Type here..."
            type="text"
            className={styles.inputField}
            value={state.quantity.val}
            onChange={handleChange("quantity")}
          />
          <div className={styles.errorMessage}>{state.quantity.error}</div>
        </label>
        <label className={styles.inputBox}>
          Value
          <input
            placeholder="Type here..."
            type="text"
            className={styles.inputField}
            value={state.value.val}
            onChange={handleChange("value")}
          />
          <div className={styles.errorMessage}>{state.value.error}</div>
        </label>
        <div className={styles.buttons}>
          <button
            className={cx(styles.primaryButton, {
              [styles.disableButton]: shouldDisableButton,
            })}
            onClick={handleSubmit}
            disabled={shouldDisableButton}
          >
            Save
          </button>
          <button className={styles.secondaryButton} onClick={hideModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditForm;
