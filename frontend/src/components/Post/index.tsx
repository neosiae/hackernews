import React from 'react'
import { useHistory } from 'react-router-dom'
import fetch from 'unfetch'
import moment from 'moment'
import isAuthenticated from '../../utils/isAuthenticated'
import * as S from './styles'

type Props = {
  id: number
  title: string
  url: string
  points: number
  username: string
  createdAt: string
}

export default function Post ({ id, title, url, points, username, createdAt }: Props) {
  const history = useHistory()

  const handleClick = async () => {
    if (!isAuthenticated()) {
      history.push('/signin')
      return
    }

    try {
      await fetch(`${process.env.REACT_APP_API}/posts/${id}/upvote`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
    } catch (err) {
      console.error(err)
    }
  } 

  return (
    <S.Container>
      <S.Upvote onClick={handleClick}>&#9652;</S.Upvote>
      <div>
        <S.Link href={url}>
          <S.Title>{title}</S.Title>
        </S.Link>
        <S.MetaContainer>
          <span>{points} {points === 0 || points > 1 ? 'points' : 'point'}</span>
          <span>{''} by {username}</span>
          <span>{''} {moment(createdAt).fromNow()}</span>
        </S.MetaContainer>
      </div>
    </S.Container>
  )
}