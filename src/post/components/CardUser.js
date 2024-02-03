import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useHistory } from "react-router-dom";
import swal from 'sweetalert';
import deleteUser from "../hooks/deleteUser";

export default function CardUser( {user, handleClose, setOpen, setUserSelected, setOpenDelete} ) {
  const {
    firstName,
    id,
    lastName,
    picture,
    } = user;

    let history = useHistory();
  
  const handleEliminar = async () => {
    try {
      console.log(id);
      await deleteUser(id);
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
    <Card variant="outlined" sx={{ minHeight: 200, minWidth:300 }}>
      <CardContent>
        <Typography variant="h6" color="blue" mb={2}> {`${firstName} ${lastName}`}  </Typography>
        <img src={picture} alt={id}  className="img-fluid"/>

      </CardContent>
      <CardActions>
        <Button  onClick={() => {handleEliminar(id);}}>
          eliminar
        </Button>
        <br></br>
        <Button  onClick={() => {setUserSelected(user); setOpen(true);}}>
          actualizar
        </Button>
      </CardActions>
    </Card>
  );
}
