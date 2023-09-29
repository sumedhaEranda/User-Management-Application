import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Box from '@mui/material/Box';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography"; 
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';

export default function FullFeaturedCrudGrid() {
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const token = localStorage.getItem("jwtToken");

  useEffect(() => {
    getItem();
  }, []);


  const getItem = () => {
   
    console.log(token);
    if (token) {
      
      // Make an API GET request to fetch the list of users with the JWT token in the headers
      axios.get("https://localhost:7260/api/User/GetAllUser", {
        headers: {
          Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
        }
      })
        .then((response) => {

          // Add unique IDs to each row in the response data
          const invoicesWithIds = response.data.map((row, index) => ({ ...row, id: index + 1 }));
          setRows(invoicesWithIds);
        })
        .catch((error) => {
          history.push("auth/signin");
          console.error("Error fetching users:", error);
        });
    }
  };


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    const row = rows.find((row) => row.id === id);

    if (token) {
      
      axios.delete(`https://localhost:7260/api/User/${row.userId}`, {
        headers: {
          Authorization: `Bearer ${token}` // Include the JWT token in the Authorization header
        }
      })
        .then((response) => {
          console.log(response.data);
          getItem();

          // Add unique IDs to each row in the response data
          const invoicesWithIds = response.data.map((row, index) => ({ ...row, id: index + 1 }));
        
        })
        .catch((error) => {
          
          console.error("Error fetching users:", error);
        });
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    if (token) {
      // Make the PUT request to update the user data
      axios.put(`https://localhost:7260/api/User/${updatedRow.userId}`, updatedRow, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json', // Set the content type for JSON data
          Authorization: `Bearer ${token}`, // Include the JWT token in the Authorization header
        },
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
         
          console.error("Error updating user:", error);
        });
    }
    return updatedRow;
  };



  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    {
      field: 'userId',
      headerName: 'UserId',
      width: 180,
      editable: false,
      flex: 1,
    },
    {
      field: 'userName',
      headerName: 'UserName',
      width: 80,
      align: 'left',
      headerAlign: 'left',
      editable: true,
      flex: 1,
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,

      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
       <Typography variant="h5" component="div" gutterBottom>
        User Management
      </Typography>

      <DataGrid 
        autoHeight
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}

        slotProps={{
          toolbar: { setRows, setRowModesModel },
        }}
      />
    </Box>
  );
}