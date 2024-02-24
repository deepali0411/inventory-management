
export const setTableData = (data) => ({type: "set", payload: data})
export const editRow = (data) => ({ type: "edit", payload: data });
export const deleteRow = (name) => ({ type: "delete", payload: name });
