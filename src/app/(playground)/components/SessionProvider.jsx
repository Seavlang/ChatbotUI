import { getAllSessionsAction } from '@/actions/sessionAction';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SessionsContext = createContext();

export const SessionsProvider = ({ children }) => {
    const [allSessions, setAllSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllSessions = async () => {
            try {
                const response = await getAllSessionsAction();
                setAllSessions(response?.payload || []);
            } catch (error) {
                console.error("Failed to fetch sessions:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAllSessions();
    }, []);

    return (
        <SessionsContext.Provider value={{ allSessions, isLoading }}>
            {children}
        </SessionsContext.Provider>
    );
};

export const useSessions = () => useContext(SessionsContext);
