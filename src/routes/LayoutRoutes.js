import Login from "../components/Login";
import DashBoardLayout from "../components/DashBoardLayout";

const LayoutRoutes = [
  { path: "/login", element: Login },
  { path: "/*", element: DashBoardLayout },
];

export default LayoutRoutes;
