import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const reqHeader = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    // Handle case when there's no session
    return null;
  }
  
  const accessToken = session.access_token; // Ensure the token is present in the session

  const header = {
    "Accept": "application/json",
    "Authorization": `Bearer ${accessToken}`,
  };

  return header;
};
