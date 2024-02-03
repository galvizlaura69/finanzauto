import React from "react";
import Box from '@mui/material/Box';
import { app } from "../../config/fb";
import { Button } from "@mui/material";

const Menu = () => {
    const cerrarSesion = () => {
        app.auth().signOut();
      };

    return (
        <Box sx={{ display:"flex",flexDirection:"row-reverse", padding:1 }} >
            <Button variant="contained" onClick={cerrarSesion}>Cerrar Sesión</Button>       
        </Box>
        
    )
}
export default Menu;


