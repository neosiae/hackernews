import { useEffect } from 'react'
import jwtDecode from 'jwt-decode'

interface jwt {
  userId: number
  iat: number
  exp: number
}

export default function useJwtExpiration () {
  useEffect(() => {
    const token = localStorage.getItem('token')
    
    if (token) {
      const decodedToken: jwt = jwtDecode(token)
      const exp = decodedToken.exp
      
      if (exp < Math.round(Date.now() / 1000)) {
        localStorage.removeItem('token')
      }
    }
  })
}