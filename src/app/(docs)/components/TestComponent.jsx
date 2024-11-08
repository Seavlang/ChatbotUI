import React from 'react'

function TestComponent() {
    return (
        <div className=''>
            <div className='text-sm font-medium'>
                Inputs
            </div>
            <input
                type="text"
                value=""
                onChange={(e) => setInput(e.target.value)}
                placeholder="Send a message"
                className="flex-1 focus:outline-none border-2 my-5 w-full py-3 px-5 rounded-xl text-sm font-normal focus:ring-none "
            />
            <div className='text-sm font-medium'>
                Output
            </div>
            <div className='w-full my-5 h-auto max-h-80 overflow-y-auto text-sm font-normal rounded-xl border py-3 px-5'>
                asdfd
            </div>
        </div>
    )
}

export default TestComponent