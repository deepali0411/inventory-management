import React, { useState, useCallback } from "react";

import { useDispatch, useSelector } from "react-redux";
import _isEmpty from "lodash/isEmpty";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";

import Assets from "../../assets/Assets";
import Modal from "../modal/Modal";
import EditForm from "../editForm/EditForm";

import { deleteRow } from "../../actions/actions";

import styles from "./inventory.module.scss";

const InventoryTable = (props) => {
  const { isAdmin } = props;

  const [isModalVisible, setIsmodalVisible] = useState(false);
  const [formValues, setFormValues] = useState({});
  const [disabledRow, setDisabledRow] = useState([]);

  const inventoryData = useSelector((state) => state.changeTheData) || [];
  const dispatch = useDispatch();

  const handleDeleteClick = (name) => {
    dispatch(deleteRow(name));
  };

  const handleEditClick = (name) => {
    const data = inventoryData.filter((data) => data.name === name);
    setFormValues(...data);
    setIsmodalVisible(true);
  };

  const hideModal = useCallback(() => {
    setIsmodalVisible(false);
  }, [isModalVisible]);

  const handleEyeClick = (name) => {
    if (disabledRow.includes(name)) {
      setDisabledRow((prev) => prev.filter((data) => data !== name));
    } else {
      setDisabledRow((prev) => [...prev, name]);
    }
  };

  return (
    <>
      {_isEmpty(inventoryData) ? (
        <div className={styles.noData}>No Data</div>
      ) : (
        <div className={styles.container}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow className={styles.TableRow}>
                  <TableCell sx={{ fontSize: "1.6rem", fontWeight: 600 }}>
                    Name
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.6rem", fontWeight: 600 }}>
                    Category
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.6rem", fontWeight: 600 }}>
                    Price
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.6rem", fontWeight: 600 }}>
                    Quantity
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.6rem", fontWeight: 600 }}>
                    Value
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.6rem", fontWeight: 600 }}>
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {inventoryData.map((row) => {
                  const isRowDisabled = disabledRow.includes(row.name);
                  return (
                    <TableRow key={row.name}>
                      <TableCell
                        sx={{
                          fontSize: "1.6rem",
                          color: isRowDisabled && "rgb(174, 174, 174)",
                        }}
                      >
                        {row.name}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.6rem",
                          color: isRowDisabled && "rgb(174, 174, 174)",
                        }}
                      >
                        {row.category}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.6rem",
                          color: isRowDisabled && "rgb(174, 174, 174)",
                        }}
                      >
                        {row.price}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.6rem",
                          color: isRowDisabled && "rgb(174, 174, 174)",
                        }}
                      >
                        {row.quantity}
                      </TableCell>
                      <TableCell
                        sx={{
                          fontSize: "1.6rem",
                          color: isRowDisabled && "rgb(174, 174, 174)",
                        }}
                      >
                        {row.value}
                      </TableCell>
                      <TableCell sx={{ fontSize: "1.6rem" }}>
                        {
                          <>
                            <Button
                              size="small"
                              sx={{ minWidth: "2.2rem" }}
                              disabled={!isAdmin}
                              onClick={() => {
                                handleEditClick(row.name);
                              }}
                            >
                              <img
                                src={
                                  isAdmin && !isRowDisabled
                                    ? Assets.EDIT
                                    : Assets.DISABLED_EDIT
                                }
                                alt="edit icon"
                                width={20}
                                height={20}
                              />
                            </Button>
                            <Button
                              size="small"
                              sx={{ minWidth: "2.4rem" }}
                              disabled={!isAdmin}
                              onClick={() => handleEyeClick(row.name)}
                            >
                              <img
                                src={
                                  isAdmin && !isRowDisabled
                                    ? Assets.EYE
                                    : !isAdmin
                                    ? Assets.DISABLED_EYE
                                    : Assets.EYE_SLASH
                                }
                                alt="enable/disable icon"
                                width={20}
                                height={20}
                              />
                            </Button>
                            <Button
                              size="small"
                              sx={{ minWidth: "2.4rem" }}
                              disabled={!isAdmin || isRowDisabled}
                              onClick={() => handleDeleteClick(row.name)}
                            >
                              <img
                                src={
                                  isAdmin && !isRowDisabled
                                    ? Assets.DELETE
                                    : Assets.DISABLED_DELETE
                                }
                                alt="delete icon"
                                width={20}
                                height={20}
                              />
                            </Button>
                          </>
                        }
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          {isModalVisible && (
            <Modal hideModal={hideModal}>
              <EditForm formValues={formValues} hideModal={hideModal} />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export default InventoryTable;
