import { createContext, useState, useContext } from 'react';

const HeaderContext = createContext();

export const useHeaderContext = () => useContext(HeaderContext);

export const HeaderProvider = ({ children }) => {
    const [headerTitle, setHeaderTitle] = useState('');
    const [headerBackgroundImage, setHeaderBackgroundImage] = useState('');

    return (
        <HeaderContext.Provider value={{ headerTitle, setHeaderTitle, headerBackgroundImage, setHeaderBackgroundImage }}>
            {children}
        </HeaderContext.Provider>
    );
};
