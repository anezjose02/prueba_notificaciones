import {Navigate, Route, Routes } from 'react-router-dom';
import {RouteProvider} from "./AdminRouterContext";
import {AdminLayout} from "../admin/components/AdminLayout";
import {DashboardIndex} from "../admin/pages/dashboard/DashboardIndex";
import {UsersIndex} from "../admin/pages/users/UsersIndex";
import {TasksIndex} from "../admin/pages/tasks/TasksIndex";

export const AdminRouter = () => {
    return(
        <RouteProvider>
            <Routes>
                <Route element={<AdminLayout/>}>
                    <Route path='dashboard' element={<DashboardIndex/>}>
                    </Route>
                    <Route path='users' element={<UsersIndex/>}/>
                    <Route path='tasks' element={<TasksIndex/>}/>
                    <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
                </Route>
            </Routes>
        </RouteProvider>
    );
}
