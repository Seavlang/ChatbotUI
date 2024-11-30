import { deleteSessionAction, getAllSessionsAction } from "@/actions/sessionAction";
import { createContext, useState, useContext } from "react";

// Create Context
const SessionContext = createContext();

export const SessionsProvider = ({ children }) => {
    const [allSessions, setAllSessions] = useState([]);

    const updateSessions = async () => {
        try {
            const response = await getAllSessionsAction(); // Fetch all sessions
            setAllSessions(response?.payload || []);
        } catch (error) {
            console.error("Error updating sessions:", error);
        }
    };

    const addSession = (newSession) => {
        setAllSessions((prev) => [...prev, newSession]);
    };
    const deleteSession = async (sessionId) => {
        try {
            const response = await deleteSessionAction(sessionId);
            if (response?.success) {
                // Update the local state
                setAllSessions((prev) => prev.filter((session) => session.id !== sessionId));
            } else {
                console.error("Failed to delete session:", response?.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error deleting session:", error);
        }
    };

    console.log("session provider: ", allSessions)
    return (
        <SessionContext.Provider value={{ allSessions, setAllSessions, updateSessions, addSession, deleteSession }}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom Hook for using the context
export const useSessions = () => useContext(SessionContext);
