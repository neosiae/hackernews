import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Nav = styled.nav`
  height: 2.2rem;
  line-height: 2.2rem;
  background-color: #fff;
  border-bottom: 1px solid #dfe2e6;
`

export const Container = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding-left: 1rem;
  padding-right: 1rem;
  @media (min-width: 992px) {
    padding-left: 0;
    padding-right: 0;
  }
`

export const Logo = styled(Link)`
  font-weight: bold;
  text-decoration: none;
  color: #000;
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #000;
  margin-left: 1rem;
`

export const Button = styled.button`
  border: none;
  background-color: #fff;
  font-size: 1rem;
  cursor: pointer;
`