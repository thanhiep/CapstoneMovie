import "./App.css";
import { Routes, HashRouter } from "react-router-dom";
import renderRoutes from "./routes";

function App() {
  return (
    <HashRouter>
      <Routes>
        {renderRoutes()}
      </Routes>
    </HashRouter>
  );
}

export default App;
