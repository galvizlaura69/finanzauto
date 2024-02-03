import React from "react";
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import { app } from "../../config/fb";
import { Button } from "@mui/material";

function Menu() {
    const cerrarSesion = () => {
        app.auth().signOut();
      };

    return (
        <Box p={4}  sx={{ display: 'flex',textAlign: 'right' }} >
            <Link className="menu" to="/">Home </Link>
            <Button variant="contained" onClick={cerrarSesion}>Cerrar Sesión</Button>       
        </Box>
        
    )
}
export default Menu;


