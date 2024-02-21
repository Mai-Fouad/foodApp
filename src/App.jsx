import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthLayout from "./SharedModule/Components/AuthLayout/AuthLayout";
import MasterLayout from "./SharedModule/Components/MasterLayout/MasterLayout";
import Login from "./AuthModule/Components/Login/Login";
import ForgetPass from "./AuthModule/Components/ForgotPass/ForgotPass";
import NotFound from "./SharedModule/Components/NotFound/NotFound";
import Home from "./HomeModule/Components/Home/Home";
import Users from "../src/UsersModule/Components/UsersList/UsersList";
import Recipes from "../src/RecipesModule/Components/RecipesList/RecipesList";
import Categories from "./CategoriesModule/Components/Categories";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import ProtectedRoot from "./SharedModule/Components/ProtectedRoot/ProtectedRoot";
import ResetPass from "./AuthModule/Components/ResetPass/ResetPass";

function App() {
  const [adminData, setAdminData] = useState(null);

  const saveAdminData = () => {
    const encodedToken = localStorage.getItem("adminToken");
    const decodedToken = jwtDecode(encodedToken);
    setAdminData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("adminToken")) {
      saveAdminData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveAdminData={saveAdminData} /> },
        { path: "login", element: <Login saveAdminData={saveAdminData} /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoot adminData={adminData}>
          <MasterLayout adminData={adminData} />
        </ProtectedRoot>
      ),
      children: [
        {
          index: true,
          element: <Home adminData={adminData} />,
        },
        {
          path: "home",
          element: <Home />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "recipes",
          element: <Recipes />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
