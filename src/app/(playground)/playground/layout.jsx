'use client'
import { useState } from "react";
import NavbarComponent from "../components/NavbarComponent";
import PlaygroundSidebarComponent from "../components/PlaygroundSidebarComponent";


export default function layout({ children }) {
    const [open, setOpen] = useState(null);
    const handleSetOpen = () => {
        setOpen(!open);
    }
    return (
        <div>
            <div className="bg-white mx-40">
                <NavbarComponent />
            </div>

            <hr />
            <div className="">
                <PlaygroundSidebarComponent children={children} />
            </div>
        </div>
    );
}
