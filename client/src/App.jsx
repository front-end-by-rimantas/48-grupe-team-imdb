import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicLayout } from "./layout/BasicLayout";
import { PageHome } from "./pages/home/PageHome";
import { PageNotFound } from "./pages/not-found/PageNotFound";
import { PageSignIn } from "./pages/sign-in-page/PageSignIn";
import { PageAbout } from "./pages/about-page/PageAbout";
import { PageTopTen } from "./pages/top-ten-page/PageTopTen";
import { PageRegistration } from "./pages/registration-page/PageRegistration";
import { MovieItemInner } from "./components/movie-list/MovieItemInner";
import { PageMovieList } from "./pages/movie-page/PageMovieList";
import { ContextWrapper } from "./context/GlobalContext";
import { PageHelp } from "./pages/help/PageHelp";
import { PageTerms } from "./pages/terms/PageTerms";
import { SortedMovieList } from "./components/movie-list/SortedMovieList";
import { PagePrivacyPolicy } from "./pages/privacy-policy/PagePrivacyPolicy";
import { NotFoundLayout } from "./layout/NotFoundLayout";
import { PageFavoriteMovies } from "./pages/favorite-movies-page/PageFavoriteMovies";



function App() {
  return (
  <ContextWrapper>
    <BrowserRouter>
      <Routes>
        <Route Component={BasicLayout}>
          <Route index path="/" element={<PageHome/>}/>
          <Route path="/movies/get/:href" element={<MovieItemInner/>}/>
          <Route path="/movies/get" element={<PageMovieList/>}/>
          <Route path="/movies/sorted" element={<SortedMovieList/>}/>
          <Route path="/search" element={<></>}/>
          <Route path="/sign-in" element={<PageSignIn/>}/>
          <Route path="/sign-in/login" element={<></>}/>
          <Route path="/sign-in/registration" element={<PageRegistration/>}/>
          <Route path="/about" element={<PageAbout/>}/>
          <Route path="/top-ten" element={<PageTopTen/>}/>
          <Route path="/help" element={<PageHelp/>}/>
          <Route path="/privacy-policy" element={<PagePrivacyPolicy />} />
          <Route path="/terms" element={<PageTerms/>}/>
          <Route path="/favorite-movies" element={<PageFavoriteMovies/>}/>
        </Route>

        <Route Component={NotFoundLayout}>
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </ContextWrapper>
  );
}

export default App;
