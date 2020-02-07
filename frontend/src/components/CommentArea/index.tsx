import React, { useState } from 'react'
import fetch from 'unfetch'
import isAuthenticated from '../../utils/isAuthenticated'
import Button from '../Button'
import * as S from './styles'

interface Props {
  id: string | undefined
}

export default function CommentArea ({ id }: Props) {
  const [text, setText] = useState<string>('')

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value)
  }

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>): Promise<void> => {
    try {
      await fetch(`${process.env.REACT_APP_API}/posts/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          text: text
        })
      })
      window.location.reload()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      {isAuthenticated()
        ? <S.Container>
            <S.TextArea
              name='text'
              onChange={handleChange}
              value={text}
            />
            <S.ButtonContainer>
              <Button onClick={handleClick}>Add Comment</Button>
            </S.ButtonContainer>
          </S.Container>
        : null
      }
    </>
  )
}