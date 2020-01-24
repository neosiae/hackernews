import React from 'react'
import * as S from './styles'

type Props = {
  name: string
  type: string
  placeholder: string
  value: string
  error: string | null
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

function Input ({ name, type, placeholder, value, error, onChange }: Props) {
  return (
    <div>
      <S.Input 
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <S.Error>{error}</S.Error>
    </div>
  )
}

export default Input