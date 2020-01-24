import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-left: 2rem;
  margin-right: 2rem;
`

export const Form = styled.form`
  width: 100%;
  @media (min-width: 768px) {
    width: 300px;
  }
`