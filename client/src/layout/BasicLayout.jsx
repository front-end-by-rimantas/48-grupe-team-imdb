import { Outlet } from "react-router-dom";
import { Footer } from "../components/footer/Footer"; 
import { Header } from "../components/header/Header"; 

export function BasicLayout() {
    return (
        <div className="basic-layout">
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}