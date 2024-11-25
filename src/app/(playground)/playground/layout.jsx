"use client";
import { useEffect, useState } from "react";
import PlaygroundSidebarComponent from "../components/PlaygroundSidebarComponent";
import NavbarComponent from "@/app/components/NavbarComponent";

export default function layout({ children, params }) {

  const [resolvedParams, setResolvedParams] = useState(null);
  // const { sessionID } = params;
  useEffect(() => {
    // Resolve the params Promise
    const fetchParams = async () => {
      const result = await params;
      console.log("sessionSidebar",result);
      setResolvedParams(result);
    };

    fetchParams();
  }, [params]);
  
  console.log("sessionIDSidebar: " + resolvedParams?.projectId);
  return (
    <div>
      <div className="bg-white mx-40">
        <NavbarComponent />
      </div>

      <hr />
      <div className="">
        <PlaygroundSidebarComponent sessionID={resolvedParams?.projectId}>
          {children}
        </PlaygroundSidebarComponent>
      </div>
    </div>
  );
}
