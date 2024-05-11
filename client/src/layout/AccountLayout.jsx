import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer"; 
import { Header } from "../components/header/Header";
import { PageSignIn } from "../pages/sign-in-page/PageSignIn";
import { GlobalContext } from "../context/GlobalContext"; 
import { useContext } from "react";

export function AccountLayout() {
    const { loginStatus } = useContext(GlobalContext);

    return (
        <div className="basic-layout">
            <Header />
            <main>
                {loginStatus ? <Outlet /> : <PageSignIn/>}
            </main>
            <Footer />
        </div>
    );
}