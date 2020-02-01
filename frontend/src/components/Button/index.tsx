import React from 'react'
import * as S from './styles'

interface Props {
  type: 'submit' | 'reset' | 'button'
  children: React.ReactNode
}

export default function Button ({ type, children }: Props) {
  return (
    <S.Button type={type}>{children}</S.Button>
  )
}