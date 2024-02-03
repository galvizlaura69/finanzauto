import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  TextField,
  Typography,
  Select,
  MenuItem,
  Grid
} from "@mui/material";
import updateUser from "../hooks/updateUser";
import getUserId from "../hooks/getUserId";

const FormUpdateUser = ({ id, handleClose, isUpdate }) => {
  
  const [title, setTitle] = useState("");
  const [picture, setPicture] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");

  const getUserById = async () => {
    const fullDataUser = await getUserId(id);
    setTitle(fullDataUser.title);
    setFirstName(fullDataUser.firstName);
    setLastName(fullDataUser.lastName);
    setGender(fullDataUser.gender);
    setEmail(fullDataUser.email);
    setDateOfBirth(fullDataUser.dateOfBirth.slice(0, 10));
    setPhone(fullDataUser.phone);
    setPicture(fullDataUser.picture);
  };

  useEffect(() => {
    getUserById();
  }, []);

  const handleUpdateUser = async () => {
    await updateUser(id, firstName, lastName, gender, email, dateOfBirth, phone, picture);
    handleClose();
  };

  return (
    <Box mt={2} mb={2} style={{ overflowY: 'auto' }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography mb={2}>{isUpdate ? "Editar Usuario" : "Ver Usuario"}</Typography>
        <Button variant="contained" onClick={handleClose} mt={1}>
          X
        </Button>
      </Box>
      <form>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Id Usuario"
              variant="outlined"
              value={id}
              fullWidth
              disabled
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Imagen"
              variant="outlined"
              value={picture}
              onChange={(e) => setPicture(e.target.value)}
              fullWidth
              disabled={!isUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
          <Select
              labelId="Title-label"
              id="title"
              value={title}
              label="Titulo"
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              disabled
            >
              <MenuItem value={"mr"}>Mr</MenuItem>
              <MenuItem value={"ms"}>Ms</MenuItem>
              <MenuItem value={"mrs"}>Mrs</MenuItem>
              <MenuItem value={"miss"}>Miss</MenuItem>
              <MenuItem value={"dr"}>Dr</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Nombre"
              variant="outlined"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              disabled={!isUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Apellido"
              variant="outlined"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              disabled={!isUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Select
              labelId="gender-label"
              id="gender"
              value={gender}
              label="Genero"
              onChange={(e) => setGender(e.target.value)}
              fullWidth
              disabled={!isUpdate}
            >
              <MenuItem value={"male"}>Male</MenuItem>
              <MenuItem value={"female"}>Female</MenuItem>
              <MenuItem value={"other"}>Other</MenuItem>
            </Select>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Correo"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              disabled={!isUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha de Nacimiento"
              variant="outlined"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              fullWidth
              disabled={!isUpdate}
            />
          </Grid>
          <Grid item xs={12} sm={6} mb={2}>
            <TextField
              label="Celular"
              variant="outlined"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              fullWidth
              disabled={!isUpdate}
            />
          </Grid>
        </Grid>
        {isUpdate && (
          <Button variant="contained" onClick={handleUpdateUser} mt={2} mb={2}>
            Actualizar
          </Button>
        )}
      </form>
    </Box>
  );
}

export default FormUpdateUser;