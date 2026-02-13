import { useEffect } from "react";
import "./App.css";
import { AppRouter } from "./router";

function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  return <AppRouter />;
}

export default App;
