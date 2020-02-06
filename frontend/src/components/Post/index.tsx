import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import fetch from 'unfetch'
import moment from 'moment'
import isAuthenticated from '../../utils/isAuthenticated'
import * as S from './styles'

interface Props {
  id: number
  title: string
  url: string
  points: number
  commentsNumber: number
  username: string
  createdAt: string
}

interface Upvote {
  upvoted: boolean
}

export default function Post ({ id, title, url, points, commentsNumber, username, createdAt }: Props) {
  const [upvote, setUpvote] = useState<Upvote>({ upvoted: false })

  const history = useHistory()

  useEffect(() => {
    if (isAuthenticated()) {
      const fetchVote = async (): Promise<void> => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API}/posts/${id}/votes`, {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          const json = await response.json()
          setUpvote(json)
        } catch (err) {
          console.error(err)
        }
      }
  
      fetchVote()
    }
  }, [id])

  const handleClick = async (): Promise<void> => {
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

    setUpvote({ upvoted: true })
  } 

  return (
    <S.Container>
      <S.Upvote upvoted={upvote.upvoted} onClick={handleClick}>&#9652;</S.Upvote>
      <div>
        <S.Link href={url}>
          <S.Title>{title}</S.Title>
        </S.Link>
        <S.MetaContainer>
          <span>{points} {points === 0 || points > 1 ? 'points' : 'point'}</span>
          <span>{''} by {username}</span>
          <span>{''} {moment(createdAt).fromNow()}</span>
          <span>{''} | {''} {commentsNumber} {commentsNumber === 0 || commentsNumber > 1 ? 'comments' : 'comment'}</span>
        </S.MetaContainer>
      </div>
    </S.Container>
  )
}