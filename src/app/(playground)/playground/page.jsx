import React from 'react';
import NavbarComponent from '../components/NavbarComponent';
import FileComponent from '@/app/components/FileComponent';
import { PlaceHolderComponent } from '@/app/components/PlaceHolderComponent';

export default function page() {
  return (
    <div>
      <div className="bg-white mx-40">
        <NavbarComponent/>
      </div>
      <hr/>
      <div className='grid grid-cols-10 min-h-screen'>
        <div className='col-span-2 border-r-2'>sdf</div>
        <div className='col-span-8 mt-60'>
          <FileComponent/>
        </div>
      </div>
      <PlaceHolderComponent/>
    </div>
  );
}
