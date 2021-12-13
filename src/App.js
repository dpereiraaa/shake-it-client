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

import IsPrivate from "./components/IsPrivate/IsPrivate";
import IsAnon from "./components/IsAnon/IsAnon";
import SearchCocktails from "./components/SearchCocktails/SearchCocktails";

function App() {
  return (
    <div className="App">
      <Navbar />
      <SearchCocktails />

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

        <Route path="/details/:cocktailId" element={<CocktailDetailsPage />} />
        <Route path="/random-cocktail" element={<OneRandomCocktailPage />} />
        <Route path="/add-post" element={<AddPostPage />} />
        <Route path="/all-posts" element={<AllPostsPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}

export default App;
