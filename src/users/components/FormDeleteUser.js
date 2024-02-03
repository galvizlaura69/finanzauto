import React from "react";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import deleteUser from "../../users/hooks/deleteUser";
import swal from "sweetalert";

const FormDeleteUser = ({user, handleClose}) => {
 
  const handleDelete = async () => {
    try {
      await deleteUser(user.id);
      handleClose();

    }
    catch (error) {
      swal({
        title: "Error",
        text: "No se ha podido borrar",
        icon: "error"
      });
      return error.message;
    }
  };


  return (
    <Box mt={2} mb={2}>
        <Typography mb={2}>Seguro que quiere borrar este usuario {user.id}</Typography>
      <form>

        <Button variant="contained"   onClick={()=>{handleDelete()}}>Borrar</Button>
        <Button variant="contained" onClick={()=>{handleClose()}}>Cancelar</Button>

      </form>
    </Box>
  );
}
export default FormDeleteUser;
