import React from 'react'
import Table from 'rc-table';


function AllPass({ allPass,removeAllPass, close }) {
    const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: 150,
        },
        {
          title: 'Pass',
          dataIndex: 'pass',
          key: 'pass',
          width: 150,
        },
        {
          title: 'Date',
          dataIndex: 'date',
          key: 'date',
          width: 300,
        }
      ];
    return (
        <div
            id='show_all_pass'
            className='w-full max-w-lg mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-700'
        >
            <h1 className='text-white text-center mb-4'>Your All Passwords</h1>
            <div
                className='flex  overflow-hidden rounded-lg my-4 px-2'
            >
                <Table columns={columns} data={allPass} rowKey={record => record.title} />
            </div>
            <button
              onClick={()=>{removeAllPass()}}
              className=' bg-blue-700 text-white px-3 py-1 mr-2 shrink-0 round'
            >
              Delete All Passwords
            </button>
            <button
              onClick={()=>{close()}}
              className='bg-blue-700 text-white px-3 py-1 mr-2 shrink-0 round'
            >
              Close
            </button>
        </div>
    )
}

export default AllPass