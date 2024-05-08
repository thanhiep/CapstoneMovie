import { Route } from "react-router-dom";
import HomeTemplate from "../pages/HomeTemplate";
import AdminTemplate from "../pages/AdminTemplate";
import AuthenPage from "../pages/AuthenPage";
import HomePage from "../pages/HomeTemplate/HomePage";
import AboutPage from "../pages/HomeTemplate/AboutPage";
import ListMoviePage from "../pages/HomeTemplate/ListMoviePage";
import DashboardPage from "../pages/AdminTemplate/DashboardPage";
import AddUserPage from "../pages/AdminTemplate/AddUserPage";
import HooksPage from "../pages/HomeTemplate/HooksPage";
import DetailMovie from "../pages/HomeTemplate/DetailMovie";

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
      { path: "about", element: AboutPage },
      { path: "list-movie", element: ListMoviePage },
      { path: "hooks", element: HooksPage },
      { path: "movie-detail/:id", element: DetailMovie },
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
