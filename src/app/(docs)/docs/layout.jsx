import NavbarComponent from '@/app/(playground)/components/NavbarComponent';
import React from 'react';
import SidebarComponent from '../components/SidebarComponent';


export default function layout({ children }) {
  return (
    <div>
        <div className="bg-white mx-40">
          <NavbarComponent />
        </div>
        <hr />
        <div className="grid grid-cols-10 min-h-screen">
          <div className="col-span-2 border-r-2">
            <SidebarComponent />
          </div>
          <div className="col-span-8 ">
            {children}
          </div>
        </div>

    </div>
  );
}
