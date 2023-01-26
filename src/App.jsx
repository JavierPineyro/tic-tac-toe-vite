import { useState } from 'react'

import Square from './components/Square'
import ModalEndGame from './components/ModalEndGame'

import { TURNS } from './constants'
import { checkGameHasEnded, checkNewWinner } from './utils'

export default function App () {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [winner, setWinner] = useState(null) // false = even
  const [turn, setTurn] = useState(TURNS.X)

  const resetGame = () => {
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
    setWinner(null)
  }

  const updateBoard = (index) => {
    const newBoard = [...board]
    if (newBoard[index] || winner) return
    newBoard[index] = turn
    setBoard(newBoard)
    const nextTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(nextTurn)

    const newWinner = checkNewWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
    } else if (checkGameHasEnded(newBoard)) {
      setWinner(false)
    }
  }

  return (
    <main className='flex flex-col items-center justify-center min-h-screen bg-slate-800'>
      <section className='grid grid-cols-3 gap-4 p-4 bg-stone-900 rounded-lg animate-in fade-in zoom-in-95'>
        {board.map((square, index) => {
          return (
            <Square updateBoard={updateBoard} key={index} index={index}>
              {square}
            </Square>
          )
        })}
      </section>
      <section className='flex gap-4 mt-4 animate-in fade-in zoom-in-95'>
        <Square isSelected={turn === TURNS.X}>
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      {
        winner !== null && <ModalEndGame resetGame={resetGame} winner={winner} />
      }
    </main>
  )
}
