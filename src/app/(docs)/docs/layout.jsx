
import React from 'react';
import SidebarComponent from '../components/SidebarComponent';
import NavbarComponent from '@/app/components/NavbarComponent';
import ResponsiveNavbar from '@/components/ui/responsive-navbar';


export default function layout({ children }) {
  return (
    <div>
      <div className="bg-white mx-40">
        {/* <NavbarComponent /> */}
        <ResponsiveNavbar/>
      </div>
      <hr />
      <div className="grid grid-cols-10 min-h-screen">
      <div className="col-span-1 md:col-span-2 lg:border-r">
        <SidebarComponent />
      </div>

        <div className="col-span-9 md:col-span-8 lg:col-span-7 flex justify-center">
          {children}
        </div>
      </div>

    </div>
  );
}
