import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const reqHeader = async () => {
  // const session = await getServerSession(authOptions);
  
  // console.log("session header: ", session.user.access_token);
  const header = {
    "Accept": "application/json",
    "Authorization": `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpZXZsYW5ndmV5QGdtYWlsLmNvbSIsImV4cCI6MTc1Njc4Mjk4OH0.2vGBS7zK0XxCttRhUpGytwP-PbG0cxQ4mebTtCaKzUI`, // Replace with a secure token storage method if needed
  }
  return header;
};
