import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import fetch from 'unfetch'
import Post from '../../components/Post'
import Comment from '../../components/Comment'
import CommentArea from '../../components/CommentArea'
import * as S from './styles'

interface PostTypes {
  id: number
  title: string
  url: string
  points: number
  commentsNumber: number
  author: {
    username: string
  }
  createdAt: string
}

interface Comment {
  id: number
  text: string
  author: {
    username: string
  }
  createdAt: string
}

export default function SinglePost () {
  const [post, setPost] = useState<PostTypes>()
  const [comments, setComments] = useState<Comment[]>([])

  const { id } = useParams()

  useEffect(() => {
    const fetchPost = async (): Promise<void> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/${id}`)
        const json = await response.json()
        setPost(json)
      } catch (err) {
        console.error(err)
      }
    }

    fetchPost()
  }, [id])

  useEffect(() => {
    const fetchComments = async(): Promise<void> => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/posts/${id}/comments`)
        const json = await response.json()
        setComments(json)
      } catch (err) {
        console.error(err)
      }
    }

    fetchComments()
  }, [id])
 
  return (
    <S.Container>
      {post && 
        <Post
          id={post.id}
          title={post.title}
          url={post.url}
          points={post.points}
          commentsNumber={post.commentsNumber}
          username={post.author.username}
          createdAt={post.createdAt}
        />
      }
      <CommentArea id={id} />
      {comments.map(comment =>
        <Comment
          key={comment.id}
          text={comment.text}
          username={comment.author.username}
          createdAt={comment.createdAt}
        />
      )}
    </S.Container>
  )
}