import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import Inventory from "./inventory/Inventory";
import { getInvetoryDataFormApi } from "./actions/api.actions";
import { setTableData } from "./actions/actions";

import "./App.css";

function App() {
  const [isAdmin, setIsAdmin] = useState(true);

  const dispatch = useDispatch();

  const getInvetoryData = async () => {
    const data = await getInvetoryDataFormApi();
    dispatch(setTableData(data));
  };

  useEffect(() => {
    getInvetoryData();
  }, []);

  const handleChangeAdmin = () => {
    setIsAdmin(!isAdmin);
  };

  return (
    <div className="App">
      <header className="header">
        <Typography variant="h5" component="h3">
          Admin
        </Typography>
        <Switch onChange={handleChangeAdmin} value={isAdmin} />
        <Typography variant="h5" component="h3">
          User
        </Typography>
      </header>
      <Inventory isAdmin={isAdmin} />
    </div>
  );
}

export default App;
