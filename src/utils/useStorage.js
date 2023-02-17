export function useStorage() {
  function removeFromStorage() {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }
  function saveGameToStorage({ board, turn }) {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', turn)
  }
  function saveLastWinnerToStorage({ lastWinner }) {
    window.localStorage.setItem('lastWinner', lastWinner)
  }
  function getLastWinner() {
    return window.localStorage.getItem('lastWinner')
  }

  return {
    saveGameToStorage,
    removeFromStorage,
    saveLastWinnerToStorage,
    getLastWinner,
  }
}
