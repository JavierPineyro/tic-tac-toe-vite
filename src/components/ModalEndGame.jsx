export default function ModalEndGame ({ winner, resetGame }) {
  const handleClick = () => {
    resetGame()
  }
  const textModal = winner ? `Winner ${winner}` : 'Empate'

  return (
    <div className='flex flex-col absolute items-center justify-center text-white'>
      <div className='relative w-screen h-screen bg-zinc-700 opacity-80 top-0 left-0' />
      <div className='absolute flex justify-center'>
        <section
          className='flex flex-col gap-4 bg-gray-900 opacity-100 py-4 px-8       rounded-lg animate-in fade-in zoom-in'
        >
          <header>
            <h3 className='selection:bg-amber-600 text-6xl'>{textModal}</h3>
          </header>
          <footer className='mx-auto'>
            <button
              onClick={handleClick}
              className='text-3xl px-6 py-2 rounded-lg transition-colors bg-amber-600 hover:bg-amber-500 line text-gray-300 hover:text-gray-200 select-none '
            >
              reset
            </button>
          </footer>
        </section>
      </div>
    </div>
  )
}
