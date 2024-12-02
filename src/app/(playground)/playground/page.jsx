'use client'
import React, { useEffect, useState } from 'react'
import DefaultFirstFileComponent from '../components/DefaultFirstFileComponent'
import { DefaultPlaceHolderComponent } from '@/app/components/DefaultPlaceHolderComponent'
import Loading from './loading'
import { getAllSessionsAction } from '@/actions/sessionAction'
import { getAllSessionService } from '@/services/session/session.service'

function Page() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <>
      {
        isLoading ? <div className='h-full w-full flex justify-center'><Loading></Loading></div>
          :
          <div className='h-full w-full'>
            <div className='h-4/5'>
              <DefaultFirstFileComponent setIsLoading={setIsLoading} />
            </div>
          </div>
      }
    </>

  )
}

export default Page;
