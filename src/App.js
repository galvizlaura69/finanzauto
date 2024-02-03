import React, { useEffect } from "react";
import { app } from "./config/fb";
import Routes from "./routes/Routes";
import Login from "./pages/Login";
import './styles.css';
const App = () => {
  const [usuario, setUsuario] = React.useState(null);
  
  useEffect(() => {
    app.auth().onAuthStateChanged((usuarioFirebase) => {
      setUsuario(usuarioFirebase);
    });
  }, []);

  return <>
  {usuario ? <Routes user={usuario} /> : <Login setUsuario={setUsuario} />}
  </>;
}

export default App;
