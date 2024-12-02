'use client'
import React, { useState } from 'react'
import DefaultFirstFileComponent from '../components/DefaultFirstFileComponent'
import Loading from './loading'

function Page() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      <div className='h-full w-full'>
        <div className='h-4/5'>
          <DefaultFirstFileComponent setIsLoading={setIsLoading} />
        </div>
      </div>

    </>

  )
}

export default Page;
