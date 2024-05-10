import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicLayout } from "./layout/BasicLayout";
import { PageHome } from "./pages/home/PageHome";
import { PageNotFound } from "./pages/not-found/PageNotFound";
import { PageSignIn } from "./pages/sign-in-page/PageSignIn";
import { PageAbout } from "./pages/about-page/PageAbout";
import { PageTopTen } from "./pages/top-ten-page/PageTopTen";
import { PageRegistration } from "./pages/registration-page/PageRegistration";
import { PageMovieList } from "./pages/movie-page/PageMovieList";
import { ContextWrapper } from "./context/GlobalContext";
import { PageHelp } from "./pages/help/PageHelp";
import { PageTerms } from "./pages/terms/PageTerms";
import { SortedMovieList } from "./components/movie-list/SortedMovieList";
import { PageJobs } from "./pages/jobs/PageJobs";
import { PagePrivacyPolicy } from "./pages/privacy-policy/PagePrivacyPolicy";
import { NotFoundLayout } from "./layout/NotFoundLayout";
import { PageFavoriteMovies } from "./pages/favorite-movies-page/PageFavoriteMovies";
import { MovieTop10 } from "./components/movie-list/MovieTop10";
import { PageAccount } from "./pages/account/PageAccount";
import { PageMovieCreate } from "./pages/account/movie-create-card/PageMovieCreate";
import { PageMovieEdit } from "./pages/account/movie-create-card/PageMovieEdit";
import { MovieItemInner } from "./components/movie-list/movie-item-inner/MovieItemInner";
import { AccountLayout }  from "./layout/AccountLayout"

function App() {
  return (
    <ContextWrapper>
      <BrowserRouter>
        <Routes>
          <Route Component={BasicLayout}>
            <Route index path="/" element={<PageHome />} />
            <Route path="/movies/get/:href" element={<MovieItemInner />} />
            <Route path="/movies/get" element={<PageMovieList />} />
            <Route path="/movies/sorted" element={<SortedMovieList />} />
            <Route path="/movies/top10" element={<MovieTop10 />} />
            <Route path="/search" element={<></>} />
            <Route path="/login" element={<PageSignIn />} />
            <Route path="/registration"element={<PageRegistration />}/>
            <Route path="/about" element={<PageAbout />} />
            <Route path="/top-ten" element={<PageTopTen />} />
            <Route path="/help" element={<PageHelp />} />
            <Route path="/privacy-policy" element={<PagePrivacyPolicy />} />
            <Route path="/terms" element={<PageTerms />} />
            <Route path="/jobs" element={<PageJobs />} />
          </Route>

          <Route Component={AccountLayout}>
            <Route path="/account" element={<PageAccount />} />
            <Route path="/account/favorite-movies" element={<PageFavoriteMovies />}/>
            <Route path="/account/movie-create" element={<PageMovieCreate />} />
            <Route path="/account/movie-edit/:href" element={<PageMovieEdit />} />
          </Route>

          <Route Component={NotFoundLayout}>
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextWrapper>
  );
}

export default App;
