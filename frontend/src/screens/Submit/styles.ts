import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`

export const Form = styled.form`
  width: 100%;
  @media (min-width: 768px) {
    width: 300px;
  }
`