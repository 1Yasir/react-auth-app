import React, { createContext, useState } from 'react';

export const LoginContext = createContext();

function ContextProvider({ children }) {
    const [loginAuthentication, setLoginAuthentication] = useState(null);

    return (
        <LoginContext.Provider value={{ loginAuthentication, setLoginAuthentication }}>
            {children}
        </LoginContext.Provider>
    );
}

export default ContextProvider;
