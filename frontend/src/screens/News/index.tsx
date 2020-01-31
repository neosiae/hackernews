import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import fetch from 'unfetch'
import useJwtExpiration from '../../hooks/useJwtExpiration'
import Post from '../../components/Post'
import * as S from './styles'

export default function News () {
  const [posts, setPosts] = useState<any[]>([])

  useJwtExpiration()

  const { page } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts?page=${page}&limit=15`)
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
      {posts.length !== 0
        ? <S.More to={`/news/${Number(page) + 1}`}>More</S.More>
        : null
      }
    </S.Container>
  )
}