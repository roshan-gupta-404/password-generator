import React from 'react'

function NoPass({close}) {
  return (
    <div
            id='show_all_pass'
            className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'
        >
            <h1 className='text-white text-center mb-4'>Your All Passwords</h1>
            <div
                className='flex  overflow-hidden rounded-lg my-4 px-2'
            >
            No Passwords To Show
            </div>
            <button
              onClick={()=>{close()}}
              className='bg-blue-700 text-white px-3 py-1 shrink-0 round'
            >
              Close
            </button>
        </div>
  )
}

export default NoPass