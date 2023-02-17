import LastWinner from './components/LastWinner'
import ModalEndGame from './components/ModalEndGame'
import Square from './components/Square'
import confetti from 'canvas-confetti'

import { checkGameHasEnded, checkNewWinner } from './utils'
import { TURNS } from './constants'
import { useRef, useState } from 'react'
import { useStorage } from './utils/useStorage.js'

const INITIAL_STATE = Array(9).fill(null)

export default function App () {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    if (boardFromStorage) return JSON.parse(boardFromStorage)
    return INITIAL_STATE
  })
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn')
    return turnFromStorage ?? TURNS.X
  })
  const [winner, setWinner] = useState(null) // false = even
  const {
    saveGameToStorage,
    removeFromStorage,
    saveLastWinnerToStorage,
    getLastWinner
  } = useStorage()

  // Control game flow
  const resetGame = () => {
    setTurn(TURNS.X)
    setBoard(Array(9).fill(null))
    setWinner(null)
    removeFromStorage()
  }
  const updateBoard = (index) => {
    const newBoard = [...board]
    if (newBoard[index] || winner) return
    newBoard[index] = turn
    setBoard(newBoard)
    const nextTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(nextTurn)

    saveGameToStorage({ board: newBoard, turn: nextTurn })

    const newWinner = checkNewWinner(newBoard)
    if (newWinner) {
      setWinner(newWinner)
      lastWinnerRef.current = newWinner
      saveLastWinnerToStorage({ lastWinner: newWinner })
      removeFromStorage()
      confetti()
    } else if (checkGameHasEnded(newBoard)) {
      setWinner(false)
      removeFromStorage()
    }
  }

  // Get Last Winner Ref
  const lastWinnerRef = useRef(getLastWinner())
  return (
    <main
      className='relative flex flex-col items-center justify-center min-h-screen bg-slate-800 bg-gradient-to-b from-slate-800 to-slate-700'
    >
      <section className='grid grid-cols-3 gap-4 p-4 bg-stone-900 rounded-lg animate-in fade-in zoom-in-95'>
        {
          board?.map((square, index) => {
            return (
              <Square updateBoard={updateBoard} key={index} index={index}>
                {square}
              </Square>
            )
          })
        }
      </section>
      <section className='flex flex-col gap-2 mt-2 animate-in fade-in zoom-in-95'>
        <h4 className='mx-auto text-gray-300 text-2xl selection:bg-amber-600'>Turn</h4>
        <div className='flex gap-4'>
          <Square isSelected={turn === TURNS.X}>
            {TURNS.X}
          </Square>
          <Square isSelected={turn === TURNS.O}>
            {TURNS.O}
          </Square>
        </div>

      </section>
      {
        winner !== null && <ModalEndGame resetGame={resetGame} winner={winner} />
      }
      <LastWinner lastWinner={lastWinnerRef.current} />
    </main>
  )
}
