import React from 'react'

export const SubmitButton = ({value}) => {
  return (
    <div>
        <input className="w-full bg-white rounded p-2 text-secondary font-semibold text-xl text-center" value={value}/>
    </div>
  )
}
