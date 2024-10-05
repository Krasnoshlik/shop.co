import React from 'react'

export default function BlackButton({text}: {text: string}) {
  return (
    <button className=' rounded-3xl bg-black flex items-center justify-center text-white w-full py-3 font-medium lg:hover:bg-white lg:hover:text-black ease-in-out duration-500'>{text}</button>
  )
}
