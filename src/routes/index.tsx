import { Route } from "react-router-dom";
import HomeTemplate from "../pages/HomeTemplate";
import AdminTemplate from "../pages/AdminTemplate";
import AuthenPage from "../pages/AuthenPage";
import HomePage from "../pages/HomeTemplate/HomePage";

import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";

import DetailMovie from "../pages/HomeTemplate/DetailMovie";
import LoginPage from "../pages/AuthenPage/login";
import SignupPage from "../pages/AuthenPage/signup";
import TicketPage from "../pages/HomeTemplate/TicketPage";

type TRoute = {
  path: string;
  element: any;
  nested?: TRoute[];
};

const routes: Array<TRoute> = [
  {
    path: "",
    element: HomeTemplate,
    nested: [
      { path: "", element: HomePage },
      { path: "list-movie", element: ListMoviePage },
      { path: "movie-detail/:id", element: DetailMovie },
      { path: "/ticket/:id", element: TicketPage },
    ],
  },
  {
    path: "admin",
    element: AdminTemplate,
    nested: [
      { path: "dashboard", element: DashboardPage },
      { path: "add-user", element: AddUserPage },
    ],
  },

  {
    path: "auth",
    element: AuthenPage,
    nested: [
      { path: "login", element: LoginPage },
      { path: "signup", element: SignupPage },
    ],
  },
];

const renderRoutes = () => {
  return routes.map((route) => {
    if (route.nested) {
      return (
        <Route key={route.path} path={route.path} element={<route.element />}>
          {route.nested.map((item) => (
            <Route
              key={item.path}
              path={item.path}
              element={<item.element />}
            />
          ))}
        </Route>
      );
    } else {
      return (
        <Route key={route.path} path={route.path} element={<route.element />} />
      );
    }
  });
};

export default renderRoutes;
