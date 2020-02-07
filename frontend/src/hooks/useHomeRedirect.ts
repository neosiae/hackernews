import { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import isAuthenticated from '../utils/isAuthenticated'

export default function useHomeRedirect (): void {
  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated()) {
      history.push('/')
    }
  })
}