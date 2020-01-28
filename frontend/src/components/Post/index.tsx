import React from 'react'
import * as S from './styles'
import moment from 'moment'

type Props = {
  id: number
  title: string
  url: string
  points: number
  username: string
  createdAt: string
}

export default function Post ({ id, title, url, points, username, createdAt }: Props) {
  return (
    <S.Container>
      <S.Upvote>&#9652;</S.Upvote>
      <div>
        <S.Link href={url}>
          <S.Title>{title}</S.Title>
        </S.Link>
        <S.MetaContainer>
          <span>{points} {points === 0 || points > 1 ? 'points' : 'point'}</span>
          {''} by <span>{username}</span>
          {''} <span>{moment(createdAt).fromNow()}</span>
        </S.MetaContainer>
      </div>
    </S.Container>
  )
}