import { deleteSessionAction, getAllSessionsAction } from "@/actions/sessionAction";
import { getCurrentUserAction } from "@/actions/userAction";
import { user } from "@nextui-org/theme";
import { usePathname } from "next/navigation";
import { createContext, useState, useContext, useEffect } from "react";

// Create Context
const SessionContext = createContext();

export const SessionsProvider = ({ children }) => {

    const [allSessions, setAllSessions] = useState([]);
    const [isSessionError, setSessionError] = useState(false);
    const [userId, setUserId] = useState();
    const fetchUser = async () => {
        const result = await getCurrentUserAction();
        console.log("result: ",result)
        setUserId(result?.payload?.id);
    }

    useEffect(() => {
        if (!userId) {
            console.log("fetching user...");
            fetchUser()
        }

        // updateSessions()
    }, [])

    const updateSessions = async () => {
        try {
            const response = await getAllSessionsAction(); // Fetch all sessions
            setAllSessions(response?.payload || []);
            setSessionError(false); // Reset error state if successful update
        } catch (error) {
            console.error("Error updating sessions:", error);
            setSessionError(true);
        }
    };

    const addSession = (newSession) => {
        setAllSessions((prev) => [...prev, newSession]);
    };
    const deleteSession = async (sessionId) => {
        try {
            const response = await deleteSessionAction(sessionId);
            console.log("after delete session", response)
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
        <SessionContext.Provider value={{ allSessions, setAllSessions, updateSessions, addSession, deleteSession, userId }}>
            {children}
        </SessionContext.Provider>
    );
};

// Custom Hook for using the context
export const useSessions = () => useContext(SessionContext);
