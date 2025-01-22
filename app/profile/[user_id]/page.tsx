import React from 'react'

const page = (params: any) => {
  return (
    <>
      <div>
        <h1 className='text-5xl text-KebabGold text-center'>
         Profile Page {params.user_id}
        </h1>
      </div>
    </>
  )
}

export default page
