export const getInitialValues = (formValues) => {
  return {
    category: { val: formValues.category, hasError: false, error: "" },
    price: {
      val:
        formValues.price[0] === "$"
          ? formValues.price.slice(1)
          : formValues.price,
      hasError: false,
      error: "",
    },
    quantity: { val: formValues.quantity, hasError: false, error: "" },
    value: {
      val:
        formValues.value[0] === "$"
          ? formValues.value.slice(1)
          : formValues.value,
      hasError: false,
      error: "",
    },
  };
};

export const validateForm = (stateValue, value) => {
  if (value === "") {
    return {
      hasError: true,
      error: "This is required field",
    };
  }
  if (stateValue !== "category") {
    if (!/^\d+$/i.test(value)) {
      return {
        hasError: true,
        error: "Please enter valid email.",
      };
    }
  }
  return {
    hasError: false,
    error: "",
  };
};
