import { BrowserRouter, Routes, Route } from "react-router-dom";
import { BasicLayout } from "./layout/BasicLayout";
import { PageHome } from "./pages/home/PageHome";
import { PageNotFound } from "./pages/not-found/PageNotFound";
import { PageSignIn } from "./pages/sign-in-page/PageSignIn";
import { PageAbout } from "./pages/about-page/PageAbout";
import { PageTopTen } from "./pages/top-ten-page/PageTopTen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Component={BasicLayout}>
          <Route index path="/" element={<PageHome/>}/>
          <Route path="/search" element={<></>}/>
          <Route path="/sign-in" element={<PageSignIn/>}/>
          <Route path="/sign-in/login" element={<></>}/>
          <Route path="/sign-in/registration" element={<></>}/>
          <Route path="/about" element={<PageAbout/>}/>
          <Route path="/top-ten" element={<PageTopTen/>}/>
          <Route path="*" element={<PageNotFound/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
