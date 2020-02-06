import React from 'react'
import moment from 'moment'
import * as S from './styles'

interface Props {
  text: string
  username: string
  createdAt: string
}

export default function Comment ({ text, username, createdAt }: Props) {
  return (
    <S.Container>
      <S.MetaContainer>
        <span>{username}</span>
        <span>{''} {moment(createdAt).fromNow()}</span>
      </S.MetaContainer>
      <S.Text>
        {text}
      </S.Text>
    </S.Container>
  )
}