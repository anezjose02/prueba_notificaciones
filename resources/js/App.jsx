import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HeaderProvider } from "./context/HeaderContext";
import {Router} from "./router/Router";
import {AdminRouter} from "./router/AdminRouter";
import {EmployessRouter} from "./router/EmployessRouter";

export const App = () => {
    return (
        <>
            <BrowserRouter>
                <HeaderProvider>
                    <Routes>
                        <Route
                            path="/admin/*"
                            element={
                                <>
                                    <AdminRouter />
                                </>
                            }
                        />
                        <Route
                            path="/employess/*"
                            element={
                                <>
                                    <EmployessRouter />
                                </>
                            }
                        />
                        <Route
                            path="/*"
                            element={
                                <>
                                    <Router />
                                </>
                            }
                        />
                    </Routes>
                </HeaderProvider>
            </BrowserRouter>
        </>
    );
}

