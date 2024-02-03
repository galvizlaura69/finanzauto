import React, { useState } from "react";
import Box from "@mui/material/Box";
import { Button, TextField, Typography, Select, MenuItem } from "@mui/material";
import updateUser from "../hooks/updateUser";
import getUserId from "../hooks/getUserId";

function FormUpdateUser({ user, handleClose }) {

  console.log(user, "asiii")

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [email, setEmail] = useState(user.email);
  const [dateOfBirth, setDateOfBirth] = useState(user.dateOfBirth);
  const [phone, setPhone] = useState(user.phone);

  const userId = user.id;

  const handlebyUserId = async () => {
    userId = await getUserId();
    console.log(userId, "usuario")
  }

  console.log(userId, "usuario")


  const handleUpdateUser = async () => {
    await updateUser(user.id, firstName, lastName, gender, email, dateOfBirth, phone);
    handleClose();
  };


  return (
    <Box mt={2} mb={2}>
      <Typography mb={2}>Editar Post {user.id}</Typography>
      <form>
        <Box mb={2}>
          <TextField
            label="id"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="id"
            value={user.id}
          />
          <TextField
            label="titulo"
            variant="outlined"
            sx={{ mb: 2 }}
            placeholder="titulo"
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
          <Select
            labelId="gender-label"
            id="gender"
            value={gender}
            label="Gender"
            placeholder="Gender"
            onChange={(e) => {
              setGender(e.target.value);
            }}
          >
            <MenuItem value={'male'}>Male</MenuItem>
            <MenuItem value={'female'}>Female</MenuItem>
            <MenuItem value={'other'}>Other</MenuItem>
          </Select>
          <TextField
            label="email"
            variant="outlined"
            type="text"
            sx={{ mb: 2 }}
            placeholder="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            variant="outlined"
            type="date"
            sx={{ mb: 2 }}
            value={dateOfBirth}
            onChange={(e) => {
              setDateOfBirth(e.target.value);
            }}
          />
          <TextField
            label="phone"
            variant="outlined"
            type="number"
            sx={{ mb: 2 }}
            placeholder="phone"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
        </Box>
        <Button variant="contained" onClick={() => { handleUpdateUser() }}>actualizar</Button>
      </form>
    </Box>
  );
}
export default FormUpdateUser;