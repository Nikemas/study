import { createContext, useContext } from 'react';
import { useSound } from '../hooks/useSound';

const SettingsContext = createContext(null);

export const SettingsProvider = ({ children }) => {
    const sound = useSound();

    return (
        <SettingsContext.Provider value={sound}>
            {children}
        </SettingsContext.Provider>
    );
};

export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error('useSettings must be used within SettingsProvider');
    }
    return context;
};
