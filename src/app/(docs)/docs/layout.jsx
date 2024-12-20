
import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import NavbarComponent from '@/app/components/NavbarComponent';


export default function layout({ children }) {
  return (
    <div>
      <div className="bg-white mx-40">
        <NavbarComponent />
      </div>
      <hr />
      <div className="grid grid-cols-10 min-h-screen">
        <div className="col-span-2 border-r">
          <SidebarComponent />
        </div>
        <div className="col-span-7 flex justify-center ">
          {children}
        </div>
      </div>

    </div>
  );
}
