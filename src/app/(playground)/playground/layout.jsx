
import NavbarComponent from "@/app/components/NavbarComponent";
import PlaygroundSidebarComponent from "../components/PlaygroundSidebarComponent";


export default function layout({ children }) {
    return (
        <div>
            <div className="bg-white mx-40">
                <NavbarComponent/>
            </div>
            <hr />
            <PlaygroundSidebarComponent children={children}/>
        </div>
    );
}
