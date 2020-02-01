import React from 'react'
import { useHistory } from 'react-router-dom'
import removeToken from '../../utils/removeToken'
import isAuthenticated from '../../utils/isAuthenticated'
import * as S from './styles'

export default function Nav () {
  const history = useHistory()

  const handleClick = (): void => {
    removeToken()
    history.push('/')
  }

  return (
    <S.Nav>
      <S.Container>
        <div>
          <S.Logo to='/'>Hacker News</S.Logo>
          <S.NavLink to='/newest/1'>New</S.NavLink>
          {isAuthenticated()
            ? <S.NavLink to='/submit'>Submit</S.NavLink>
            : null
          }
        </div>
        <div>
          {isAuthenticated() 
            ? <S.Button onClick={handleClick}>Logout</S.Button>
            : <div>
                <S.NavLink to='/signin'>Sign in</S.NavLink>
                <S.NavLink to='/signup'>Sign up</S.NavLink>
              </div>
          }
        </div>
      </S.Container>
    </S.Nav>
  )
}