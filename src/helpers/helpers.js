export const getTotalAmount = (inventoryData = [], type) => {
  let totalValue = 0;
  inventoryData.forEach((data) => {
    totalValue +=
      type === "quantity"
        ? Number(data.quantity)
        : Number(data.value[0] === "$" ? data.value.slice(1) : data.value);
  });
  return totalValue;
};

export const getOutOfStocksProduct = (inventoryData) => {
  let totalValue = 0;
  inventoryData.forEach((data) => {
    if (data.quantity === 0) totalValue++;
  });
  return totalValue;
};

export const getTotalCategory = (inventoryData) => {
  const categorySet = new Set();
  inventoryData.forEach((data) => {
    categorySet.add(data.category);
  });
  return categorySet.size;
};
