import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
  @media (min-width: 992px) {
    padding-left: 0;
    padding-right: 0;
  }
`

export const More = styled(Link)`
  text-decoration: none;
  padding-bottom: 1rem;
  color: #000;
  display: inline-block;
  margin-top: 2rem;
`