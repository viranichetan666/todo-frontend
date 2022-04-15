import "./App.css";
import { Routes, Route } from "react-router-dom";
import LayoutRoutes from "./routes/LayoutRoutes";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import CustomRouter from "./utils/CustomRouter";
import { history, persistor, store } from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <CustomRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes>
            {LayoutRoutes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                element={<route.element />}
              />
            ))}
          </Routes>
        </PersistGate>
      </CustomRouter>
    </Provider>
  );
};

export default App;
