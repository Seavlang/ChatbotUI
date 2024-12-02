import { getAllSessionsAction } from '@/actions/sessionAction';
import React, { createContext, useContext, useEffect, useState } from 'react';

const SessionsContext = createContext();

export const SessionsProvider = ({ children }) => {
    const [allSessions, setAllSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchAllSessions = async () => {
        setIsLoading(true); // Set loading to true when refetching
        try {
            const response = await getAllSessionsAction();
            setAllSessions(response?.payload || []);
        } catch (error) {
            console.error("Failed to fetch sessions:", error);
        } finally {
            setIsLoading(false); // Ensure loading state is properly set
        }
    };

    // Fetch sessions initially
    useEffect(() => {
        fetchAllSessions();
    }, []);

    return (
        <SessionsContext.Provider value={{ allSessions, isLoading, fetchAllSessions }}>
            {children}
        </SessionsContext.Provider>
    );
};

export const useSessions = () => useContext(SessionsContext);
