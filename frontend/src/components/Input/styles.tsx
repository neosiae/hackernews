import styled from 'styled-components'

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  margin-top: 8px;
  font-size: 1rem;
`

export const Input = styled.input`
  font-family: inherit;
  width: 100%;
  border: none;
  height: 2.2rem;
  border: 1px solid #ced4da;
  font-size: 1rem;
  padding-left: 0.75rem;
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: #2980b9;
  }
`

export const Error = styled.div`
  margin-bottom: 1rem;
  margin-top: 8px;
  color: #c0392b;
  font-size: 1rem;
`