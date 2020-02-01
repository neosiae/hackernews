import React, { useState, useEffect } from 'react'
import fetch from 'unfetch'
import useJwtExpiration from '../../hooks/useJwtExpiration'
import Post from '../../components/Post'
import * as S from './styles'

interface Post {
  id: number
  title: string
  url: string
  points: number
  author: {
    username: string
  }
  createdAt: string
}

export default function Home () {
  const [posts, setPosts] = useState<Post[]>([])

  useJwtExpiration()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts?page=1&limit=15`)
        const json = await response.json()
        setPosts(json)
      } catch (err) {
        console.error(err)
      }
    }
    
    fetchData()
  }, [])

  return (
    <S.Container>
      {posts.map(post => 
        <Post
          key={post.id}
          id={post.id}
          title={post.title}
          url={post.url}
          points={post.points}
          username={post.author.username}
          createdAt={post.createdAt}
        />
      )}
      <S.More to='/news/2'>More</S.More>
    </S.Container>
  )
}