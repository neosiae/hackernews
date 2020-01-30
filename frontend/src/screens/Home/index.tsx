import React, { useState, useEffect } from 'react'
import fetch from 'unfetch'
import useJwtExpiration from '../../hooks/useJwtExpiration'
import Post from '../../components/Post'
import * as S from './styles'

export default function Home () {
  const [posts, setPosts] = useState<any[]>([])

  useJwtExpiration()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts`)
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
      {posts && posts.map(post => 
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
    </S.Container>
  )
}