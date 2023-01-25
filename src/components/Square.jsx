export default function Square({ children, index, isSelected, updateBoard = () => null }) {

  const handleClick = () => {
    updateBoard(index)
  }

  const classNames = isSelected ? 'bg-[#09f] hover:bg-[#09a] text-white' : ''

  return (
    <div
      onClick={handleClick}
      className={`flex items-center justify-center rounded-md w-28 h-28 bg-zinc-700 hover:bg-zinc-600 transition-colors ease-in text-center text-5xl text-gray-300 cursor-pointer ${classNames}`}
    >
      {children}
    </div>
  )
}