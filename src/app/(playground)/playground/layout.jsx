'use client'
import { useState } from "react";
import PlaygroundSidebarComponent from "../components/PlaygroundSidebarComponent";
import NavbarComponent from "@/app/components/NavbarComponent";


export default function layout({ children }) {
    return (
        <>
            <div className="bg-white mx-40">
                <NavbarComponent />
            </div>
            <hr />
            <div className="">
                <PlaygroundSidebarComponent children={children} />
            </div>
        </>
    );
}
