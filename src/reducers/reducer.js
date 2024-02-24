export const changeTheData = (state = [], actions) => {
  switch (actions?.type) {
    case "set": {
      return actions?.payload;
    }
    case "edit": {
      const finalData = state.map((data) => {
        if (data.name !== actions?.payload?.name) return data;
        else return actions?.payload;
      });
      return finalData;
    }
    case "delete": {
      const finalData = state.filter((data) => data.name !== actions.payload);
      return finalData;
    }
    default:
      return state;
  }
};
