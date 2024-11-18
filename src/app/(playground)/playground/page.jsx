'use client'
import React, { useState } from 'react'
import DefaultFirstFileComponent from '../components/DefaultFirstFileComponent'
import { DefaultPlaceHolderComponent } from '@/app/components/DefaultPlaceHolderComponent'
import Loading from './loading'

function Page() {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <>
      {
        isLoading ? <Loading></Loading>
          :
          <div className='mb-10 h-full '>
            <div className='h-4/5'>
              <DefaultFirstFileComponent setIsLoading={setIsLoading} />
            </div>
            {/* <div className="mb-10">
              <DefaultPlaceHolderComponent setIsLoading={setIsLoading}/>
            </div> */}
          </div>
      }

    </>

  )
}

export default Page;
