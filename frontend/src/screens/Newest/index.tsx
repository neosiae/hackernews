import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
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

export default function Newest () {
  const [posts, setPosts] = useState<Post[]>([])

  useJwtExpiration()

  const { page } = useParams()

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts?page=${page || 1}&limit=15&order=newest`)
        const json = await response.json()
        setPosts(json)
      } catch (err) {
        console.error(err)
      }
    }
    
    fetchData()
  }, [page])

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
      {posts.length >= 15
        ? <S.More to={`/newest/${Number(page || 1) + 1}`}>More</S.More>
        : null
      }
    </S.Container>
  )
}