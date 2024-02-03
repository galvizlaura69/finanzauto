import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';

const TableUsers = ({ 
  list,   
  setOpenUpdate,
  setOpenDelete,
  setUserSelected, }) => {

  return (
    <div>
      <h1>Tabla de Datos</h1>
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
                <TableCell>{`${user.firstName} ${user.LastName}`}</TableCell>
                <TableCell>
                  <>
                    <Button onClick={() => { setUserSelected(user); setOpenDelete(true); }}>
                      eliminar
                    </Button>
                    <br></br>
                    <Button onClick={() => { setUserSelected(user); setOpenUpdate(true); }}>
                      actualizar
                    </Button></>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TableUsers;
