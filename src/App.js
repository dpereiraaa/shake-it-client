import "./App.css";
import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import SignupPage from "./pages/SignupPage/SignupPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import CocktailDetailsPage from "./pages/CocktailDetailsPage/CocktailsDetailsPage";
import OneRandomCocktailPage from "./pages/OneRandomCocktailPage/OneRandomCocktail";
import AddPostPage from "./pages/AddPostPage/AddPostPage";
import AllPostsPage from "./pages/AllPostsPage/AllPostsPage";
import ByCocktailsPage from "./pages/ByCocktailsPage/ByCocktailsPage";
import ByIngridientsPage from "./pages/ByIngridientsPage/ByIngridientsPage";

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";

function App() {
  return (
    <div className="App bg-red-50">
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/profile"
          element={
            <IsPrivate>
              {" "}
              <ProfilePage />{" "}
            </IsPrivate>
          }
        />

        <Route
          path="/signup"
          element={
            <IsAnon>
              {" "}
              <SignupPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/login"
          element={
            <IsAnon>
              {" "}
              <LoginPage />{" "}
            </IsAnon>
          }
        />
        <Route
          path="/byCocktails"
          element={
            <IsPrivate>
              <ByCocktailsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/byIngridients"
          element={
            <IsPrivate>
              <ByIngridientsPage />
            </IsPrivate>
          }
        />

        <Route
          path="/details/:cocktailId"
          element={
            <IsPrivate>
              <CocktailDetailsPage />
            </IsPrivate>
          }
        />
        <Route
          path="/random-cocktail"
          element={
            <IsPrivate>
              <OneRandomCocktailPage />
            </IsPrivate>
          }
        />
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="/all-posts" element={<AllPostsPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
