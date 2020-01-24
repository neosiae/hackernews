import React from 'react'
import * as S from './styles'

export default function Nav () {
  return (
    <S.Nav>
      <S.Container>
        <div>
          <S.Logo to='/'>Hacker News</S.Logo>
        </div>
        <div>
          <S.NavLink to='/signin'>Sign in</S.NavLink>
          <S.NavLink to='/signup'>Sign up</S.NavLink>
        </div>
      </S.Container>
    </S.Nav>
  )
}