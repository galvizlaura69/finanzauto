import React, { useState } from "react";
import { app } from "../config/fb";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import swal from "sweetalert";

const Login = (props) => {
  const [isRegistrando, setIsRegistrando] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const createUserFirebase = () => {
    app
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        props.setUsuario(usuarioFirebase);
      })
      .catch((e) => console.log(e));
  };

  const loginUserFirebase = () => {
    app
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((usuarioFirebase) => {
        props.setUsuario(usuarioFirebase);
      })
      .catch((e) => {
        swal({
          title: "Oops",
          text: "usuario o contraseña equivocado",
          icon: "error",
        });
      });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      loginUserFirebase();
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <div style={{ border: "1px solid #ccc", padding: "20px" }}>
        {isRegistrando ? (
          <div>
            <h1>Registrarme</h1>
            <form>
              <Box mb={2}>
                <TextField
                  label="Correo"
                  variant="outlined"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Box>
              <Button variant="contained" onClick={() => createUserFirebase()}>
                Registrarme
              </Button>
              <Button onClick={() => setIsRegistrando(false)}>
                Ya tengo cuenta, iniciar sesión.
              </Button>
            </form>
          </div>
        ) : (
          <div>
            <h1>Iniciar Sesión</h1>
            <form>
              <Box mb={2}>
                <TextField
                  label="Correo"
                  variant="outlined"
                  type="email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  label="Contraseña"
                  variant="outlined"
                  type="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  onKeyDown={handleKeyDown}
                />
              </Box>
              <Button variant="contained" onClick={() => loginUserFirebase()}>
                Iniciar sesión
              </Button>
              <Button onClick={() => setIsRegistrando(true)}>
                No tengo cuenta, quiero registrarme.
              </Button>
            </form>
          </div>
        )}
      </div>
    </Box>
  );
};

export default Login;