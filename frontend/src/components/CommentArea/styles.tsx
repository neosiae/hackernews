import styled from 'styled-components'

export const Container = styled.div`
  padding: 1rem;
  background-color: #fff;
  border-bottom: 1px solid #eee;
`

export const TextArea = styled.textarea`
  width: 100%;
  height: 150px;
  outline: none;
  border: 1px solid #eee;
  &:focus {
    border-color: #ff6600;
  }
  @media (min-width: 768px) {
    width: 50%;
  }
`

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 0.7rem;
  @media (min-width: 768px) {
    width: 25%;
  }
`