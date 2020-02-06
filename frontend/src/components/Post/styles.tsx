import styled, { css } from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: #fff;
  padding: 1rem;
  border-bottom: 1px solid #eee;
`

type UpvoteProps = {
  upvoted: boolean
}

export const Upvote = styled.span<UpvoteProps>`
  margin-right: 0.5rem;
  cursor: pointer;
  color: #aaa;
  &:hover {
    color: #000;
  }
  ${props => props.upvoted && css`
    color: #000;
  `}
`

export const Title = styled.h1`
  font-size: 1rem;
  margin-top: 0;
  margin-bottom: 0;
`

export const Link = styled.a`
  text-decoration: none;
  color: #000;
`

export const MetaContainer = styled.div`
  font-size: 0.8rem;
`