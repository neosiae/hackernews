import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const Nav = styled.nav`
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: #ff6600;
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
  margin-right: 1rem;
  color: #fff;
`

export const NavLink = styled(Link)`
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  margin-left: 1rem;
  font-weight: 300;
  &:hover {
    color: #fff;
  }
`

export const Button = styled.button`
  border: none;
  color: rgba(255, 255, 255, 0.8);
  background-color: #ff6600;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  font-weight: 300;
  &:hover {
    color: #fff;
  }
`