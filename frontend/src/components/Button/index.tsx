import React from 'react'
import * as S from './styles'

interface Props {
  type?: 'submit' | 'reset' | 'button'
  children: React.ReactNode
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button ({ onClick, type, children }: Props) {
  return (
    <S.Button onClick={onClick} type={type}>{children}</S.Button>
  )
}