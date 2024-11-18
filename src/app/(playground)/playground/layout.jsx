'use client'
import { useState } from "react";
import PlaygroundSidebarComponent from "../components/PlaygroundSidebarComponent";
import NavbarComponent from "@/app/components/NavbarComponent";


export default function layout({ children }) {
    const [open, setOpen] = useState(null);
    const handleSetOpen = () => {
        setOpen(!open);
    }
    return (
        <div>
            <div className="bg-white mx-40">
                <NavbarComponent/>
            </div>

            <hr />
            <div className="">
                <PlaygroundSidebarComponent children={children} />
            </div>
        </div>
    );
}
