import { Routes, Route, BrowserRouter } from "react-router-dom";
import LayoutRoutes from "./routes/LayoutRoutes";
import "./App.css";
import CustomRouter from "./utils/CustomRouter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {LayoutRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={<route.element />} />
          ))}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
