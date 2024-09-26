import Image from "next/image";
import NavbarComponent from "./components/NavbarComponent";
import {Button} from "@nextui-org/react";

export default function Home() {
  return (
    <div> 
      <div className="bg-white mx-60">
        <NavbarComponent/>
      </div>
      <hr/>
      <div className="text-center  font-medium text-[65px] mt-12">
        <h1>The Open Source</h1>
        <h1 className="text-primary">Document Retrival Generation</h1>
      </div>
      <div className="text-center text-[22px] text-gray-400 mt-6">
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting <br/> industry. Lorem Ipsum has been the industry's standard dummy <br/> text ever since the 1500s, when an unknow</p>
      </div>
      <div className="text-center mt-10">
      <button class="bg-primary hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl">
        Get Started
      </button>
      </div>
    </div>
   
  );
}


