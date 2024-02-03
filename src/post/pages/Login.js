import React, {useState} from "react";
import { app } from "../../config/fb";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import swal from "sweetalert";


const Login = (props) => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUserFirebase = () => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        console.log("usuario creado:", usuarioFirebase);
        props.setUsuario(usuarioFirebase);
      }).catch(e => console.log(e));
  };

  const loginUserFirebase = () => {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        console.log("sesión iniciada con:", usuarioFirebase.user);
        props.setUsuario(usuarioFirebase);
      }).catch(e => {
        console.log(e);
        swal({
          title: "Oops",
          text: "usuario o contraseña equivocado",
          icon: "error"
        })
      });
  };

  return (
    <div>
      {isRegistrando?(
        <div>      
          <h1>Registrarme</h1>
          <form>
              <Box mb={2}>
                  <TextField label="Correo" variant="outlined" type="email" onChange={(e)=>{setEmail(e.target.value)}} />
                  <TextField label="Contraseña" variant="outlined" type="password"  onChange={(e)=>{setPassword(e.target.value)}} />
              </Box>    
              <Button variant="contained" onClick={()=>{createUserFirebase()}}>
                Registrarme 
              </Button>    
              <Button onClick={()=>{setIsRegistrando(false)}}>
                Ya tengo cuenta, iniciar sesión.  
              </Button> 
            </form>
        </div>
        ):(
        <div>      
          <h1>Iniciar Sesión</h1>
          <form>
            <Box mb={2}>
              <TextField label="Correo" variant="outlined" type="email" onChange={(e)=>{setEmail(e.target.value)}} />
              <TextField label="Contraseña" variant="outlined" type="password"  onChange={(e)=>{setPassword(e.target.value)}} />
            </Box>  
            <Button variant="contained" onClick={()=>{loginUserFirebase()}}>
              Iniciar sesión 
            </Button>  
            <Button onClick={()=>{setIsRegistrando(true)}}>
                No tengo cuenta, quiero registrarme.
            </Button>    
          </form>
        </div>
        )}
    </div>
  );
};

export default Login;
