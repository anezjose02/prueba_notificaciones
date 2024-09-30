import {Navigate, Route, Routes} from 'react-router-dom';
import {RouterContext} from "./RouterContext";
import {Login} from "../auth/Login";
import {LoginEmployess} from "../auth_employess/LoginEmployess";

export const Router = () => {
    return (
        <RouterContext>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login/employess" element={<LoginEmployess />} />
                <Route path="/employess" element={<Navigate to="/login/employess" replace />} />
            </Routes>
        </RouterContext>
    );
}
