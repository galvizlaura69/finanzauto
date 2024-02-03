import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import updateUser from "../hooks/updateUser";

function FormDeleteUser({user, handleClose}) {
  console.log(user, 'form');

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

  const handleUpdateUser = async () => {
    await updateUser(user.id, firstName, lastName);
    handleClose();
  };


  return (
    <Box mt={2} mb={2}>
        <Typography mb={2}>Editar Post {user.id}</Typography>
      <form>
        <Box mb={2}>
            <TextField 
            label="titulo" 
            variant="outlined"
            sx={{mb:2}}
            placeholder="titulo"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField 
            label="lastName" 
            variant="outlined"
            sx={{mb:2}}
            placeholder="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </Box>
        <Button variant="contained"  onClick={()=>{handleUpdateUser()}}>actualizar</Button>
      </form>
    </Box>
  );
}
export default FormDeleteUser;
