import React, {createContext, useContext, useMemo} from 'react';
const RouteContext = createContext();

export const RouteProvider = ({children}) => {
    const routeData = useMemo(() => ({
        "/admin/dashboard":
            {
                title: "Dashboard",
                parent: "#"
            },
        "/admin/users":
            {
                title: "Usuarios",
                parent: "#"
            },
        "/admin/tasks":
            {
                title: "Tareas",
                parent: "#"
            },

    }), []);

    return (
        <RouteContext.Provider value={routeData}>
            {children}
        </RouteContext.Provider>
    );
};

export const useRoute = () => {
    return useContext(RouteContext);
};

