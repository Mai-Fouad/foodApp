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
import RecipeAddItem from "./RecipesModule/Components/RecipeAddItem/RecipeAddItem";
import RecipeEditItem from "./RecipesModule/Components/RecipeEditItem/RecipeEditItem";
import Register from "./AuthModule/Components/Register/Register";
import VerifyUser from "./AuthModule/Components/VerifyUser/VerifyUser";
import Favorites from "./FavoriteModule/Components/Favorites";

function App() {
  const [loginData, setLoginData] = useState(null);
  console.log(loginData, "login");
  const saveLoginData = () => {
    const encodedToken = localStorage.getItem("loginToken");
    const decodedToken = jwtDecode(encodedToken);
    console.log(decodedToken);
    setLoginData(decodedToken);
  };

  useEffect(() => {
    if (localStorage.getItem("loginToken")) {
      saveLoginData();
    }
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "register", element: <Register /> },
        { path: "verify-user", element: <VerifyUser /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoot loginData={loginData}>
          <MasterLayout loginData={loginData} />
        </ProtectedRoot>
      ),
      children: [
        {
          index: true,
          element: <Home loginData={loginData} />,
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
          element: <Recipes loginData={loginData} />,
        },
        {
          path: "recipe-add-item",
          element: <RecipeAddItem />,
        },
        {
          path: "recipe-edit-form",
          element: <RecipeEditItem />,
        },
        {
          path: "categories",
          element: <Categories />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
      ],
    },
  ]);
  return <RouterProvider router={routes} />;
}

export default App;
