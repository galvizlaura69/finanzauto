import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function CardUser( {
  user,
  setOpenUpdate,
  setOpenDelete,
  setUserSelected,
} ) {
  const {
    firstName,
    id,
    lastName,
    picture,
    } = user;
  

  return (
    <Card variant="outlined" sx={{ minHeight: 200, minWidth:300 }}>
      <CardContent>
        <Typography variant="h6" color="blue" mb={2}> {`${firstName} ${lastName}`}  </Typography>
        <img src={picture} alt={id}  className="img-fluid"/>

      </CardContent>
      <CardActions>
      <Button  onClick={() => {setUserSelected(user); setOpenDelete(true);}}>
          eliminar
        </Button>
        <br></br>
        <Button  onClick={() => {setUserSelected(user); setOpenUpdate(true);}}>
          actualizar
        </Button>
      </CardActions>
    </Card>
  );
}
