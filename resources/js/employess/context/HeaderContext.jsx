import { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const useHeaderContext = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }) => {
    const [headerTitle, setHeaderTitle] = useState('');

    return (
        <HeaderContext.Provider value={{ headerTitle, setHeaderTitle }}>
            {children}
        </HeaderContext.Provider>
    );
};
