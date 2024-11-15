import React from 'react'
import DefaultFirstFileComponent from '../components/DefaultFirstFileComponent'
import { DefaultPlaceHolderComponent } from '@/app/components/DefaultPlaceHolderComponent'

function Page() {
  return (
    <div className='mb-10 h-full'>
      <div className='h-4/5'>
        <DefaultFirstFileComponent />
      </div>
      <div className="mb-10">
        <DefaultPlaceHolderComponent />
      </div>
    </div>
  )
}

export default Page