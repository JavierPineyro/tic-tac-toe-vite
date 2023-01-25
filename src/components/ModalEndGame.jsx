export default function ModalEndGame({ winner, resetGame }) {

  const handleClick = () => {
    resetGame()
  }
  const textModal = winner ? `Winner ${winner}` : 'Empate'

  return (
    <div className='flex flex-col absolute items-center justify-center text-white'>
      <div className='relative w-screen h-screen bg-zinc-700 opacity-80 top-0 left-0'>
      </div>
      <div className='absolute flex justify-center'>
        <section
          className='flex flex-col gap-4 bg-gray-900 opacity-100 py-4 px-8       rounded-lg'
        >
          <header>
            <h3 className='selection:bg-amber-600 text-6xl' >{textModal}</h3>
          </header>
          <footer className='flex items-center justify-center w-full'>
            <button onClick={handleClick} className='text-3xl px-4 py-1 rounded-lg hover:bg-zinc-600 transition-colors bg-zinc-700 select-none'>Reset</button>
          </footer>
        </section>
      </div>
    </div>
  )
}