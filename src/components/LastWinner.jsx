import React from 'react'

function LastWinner ({ lastWinner }) {
  return (
    <aside
      className='absolute z-100 left-6 bottom-6 border-[1px] rounded-lg text-xl text-gray-200 p-4'
    >
      Last Winner:{' '} {lastWinner || 'none'}
    </aside>
  )
}

export default LastWinner
