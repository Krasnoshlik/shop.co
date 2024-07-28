import React from 'react'

export default function BlackButton({text}: {text: string}) {
  return (
    <button className=' rounded-3xl bg-black text-white w-full py-3 font-medium'>{text}</button>
  )
}
