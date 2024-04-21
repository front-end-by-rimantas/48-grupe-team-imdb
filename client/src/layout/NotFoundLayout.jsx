import { Outlet } from "react-router-dom";

export function NotFoundLayout() {
    return (
        <div className="not-found-layout">
            <main>
                <Outlet />
            </main>
        </div>
    );
}