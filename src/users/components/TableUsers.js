import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Avatar } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import spanishTitle from "../../users/utils/spanishTitle";

const TableUsers = ({
  list,
  setOpenUpdate,
  setOpenDelete,
  setUserSelected,
  setIsEdit
}) => {

  return (

    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Acciones</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell>{`${spanishTitle(user.title)} ${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>
                {user.picture ? (
                  <img src={user.picture} alt={user.id} className="img-icon" />
                ) : (
                  <Avatar>
                    <PersonIcon />
                  </Avatar>
                )}
              </TableCell>
              <TableCell>
                <>
                  <IconButton onClick={() => { setUserSelected(user); setOpenDelete(true); }}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => { setIsEdit(true); setUserSelected(user); setOpenUpdate(true); }}>
                    <UpdateIcon />
                  </IconButton>
                  <IconButton onClick={() => { setIsEdit(false); setUserSelected(user); setOpenUpdate(true); }}>
                    <VisibilityIcon />
                  </IconButton>
                </>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableUsers;
