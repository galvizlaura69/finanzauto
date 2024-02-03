import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography } from "@mui/material";
import swal from 'sweetalert';
import createUser from "../../users/hooks/createUser";



const FormCreateUser = ({ handleClose })  => {

  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [hasBadRequest, sethasBadRequest] = useState(true);

  const validarEmail = (email) => {
    // Expresión regular para validar un email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleBlur = ({target}) => {
      sethasBadRequest(!validarEmail(email));
  };
  
  const handleGuardar = async () => {

    try {
      const guardar = await createUser(firstName, lastName, email);
      console.log(guardar);
      handleClose();
      swal({
        title: "Exitoso",
        text: "Se ha guardado el usuario exitosamente",
        icon: "success"
      })
    }
    catch (error) {
      swal({
        title: "Error",
        text: "No ha guardado el usuario",
        icon: "error"
      })
      return error.message;

    }
  };


  return (
    <Box mt={2} mb={2}>
      <Typography mb={2}>CREAR USUARIO</Typography>
      <form>
        <Box mb={2}>
          <TextField
            label="nombre"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="nombre"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
          <TextField
            label="lastName"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="lastName"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
          <TextField
            label="email"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              sethasBadRequest(!validarEmail(email));
            }}
            onBlur={handleBlur}
          />
        </Box>
        <Box>
          <Button 
            variant="contained"
            onClick={(e) => { handleGuardar() }}
            disabled={hasBadRequest}
            handleBlur={handleBlur}
          >
            Guardar</Button>
        </Box>
            {
              hasBadRequest &&(
                <p>Hay un error en el email</p>
              )
            }
      </form>
    </Box>
  );
}

export default FormCreateUser;