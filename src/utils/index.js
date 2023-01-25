import { INDEX_WINNER_COMBINATIONS } from '../constants'


export const checkNewWinner = (game) => {
  for (let combination of INDEX_WINNER_COMBINATIONS) {

    const [valueA, valueB, valueC] = combination

    const isWinner = game[valueA] === game[valueB]
      && game[valueB] === game[valueC]
      && game[valueA] !== null

    if (isWinner) {
      return game[valueA] // return winner value X or O
    }
  }
  return null
}

export const checkGameHasEnded = (game) => {
  return game.every(item => item !== null)
}