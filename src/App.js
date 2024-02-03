import React, { useEffect } from "react";
import { app } from "./config/fb";
import Routes from "./routes/Routes";
import Login from "./post/pages/Login";
import './styles.css';
function App() {
  const [usuario, setUsuario] = React.useState(null);
  
  useEffect(() => {
    app.auth().onAuthStateChanged((usuarioFirebase) => {
      console.log("ya tienes sesión iniciada con:", usuarioFirebase?.email);
      setUsuario(usuarioFirebase);
    });
  }, []);

  return <>
  {usuario ? <Routes user={usuario} /> : <Login setUsuario={setUsuario} />}
  </>;
}

export default App;
