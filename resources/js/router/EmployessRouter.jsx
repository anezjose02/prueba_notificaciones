import {Navigate, Route, Routes } from 'react-router-dom';
import {RouteProvider} from "./EmployessRouterContext";
import {AdminLayout} from "../employess/components/AdminLayout";
import {DashboardIndex} from "../employess/pages/dashboard/DashboardIndex";
import {TasksIndex} from "../employess/pages/tasks/TasksIndex";
import {UsersIndex} from "../employess/pages/users/UsersIndex";


export const EmployessRouter = () => {
    return(
        <RouteProvider>
            <Routes>
                <Route element={<AdminLayout/>}>
                    <Route path='dashboard' element={<DashboardIndex/>}>
                    </Route>
                    <Route path='users' element={<UsersIndex/>}/>
                    <Route path='tasks' element={<TasksIndex/>}/>
                    <Route path="*" element={<Navigate to="/login/employess" replace />} />
                </Route>
            </Routes>
        </RouteProvider>
    );
}
