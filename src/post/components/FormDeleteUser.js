import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import deleteUser from "../hooks/deleteUser";
import swal from "sweetalert";

function FormDeleteUser({user, handleClose}) {
 
  const handleDelete = async () => {
    try {
      console.log(user.id);
      await deleteUser(user.id);
      handleClose();

    }
    catch (error) {
      swal({
        title: "Error",
        text: "No se ha podido borrar",
        icon: "error"
      });
      console.log('error');
      return error.message;
    }
  };


  return (
    <Box mt={2} mb={2}>
        <Typography mb={2}>Seguro que quiere borrar este usuario {user.id}</Typography>
      <form>

        <Button variant="contained"  onClick={()=>{handleDelete()}}>borrar</Button>
        <Button variant="contained"  onClick={()=>{handleClose()}}>no borrar</Button>

      </form>
    </Box>
  );
}
export default FormDeleteUser;
