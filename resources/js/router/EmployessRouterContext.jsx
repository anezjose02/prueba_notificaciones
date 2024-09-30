import React, {createContext, useContext, useMemo} from 'react';
const RouteContext = createContext();

export const RouteProvider = ({children}) => {
    const routeData = useMemo(() => ({
        "/employess/dashboard":
            {
                title: "Dashboard",
                parent: "#"
            },
        "/employess/users":
            {
                title: "Usuarios",
                parent: "#"
            },
        "/employess/tasks":
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

