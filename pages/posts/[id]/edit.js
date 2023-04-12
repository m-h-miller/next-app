import prisma from '@/prisma/';
import storage from "@/utils/storage";
import { Button } from 'react-bootstrap';
import useSWR from "swr";
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useNotification } from '@/hooks/useNotification'

const Post = ({ post = {} }) => {
  const { data: currentUser } = useSWR("user", storage);
  const isAuthor = post?.author?.id === currentUser?.id;

  const router = useRouter()
  const { addNotification } = useNotification();

  useEffect(() => {
    if (!isAuthor) {
      router.push('/')
    }
  }, [])

  const [published, setPublished] = useState(post.published)
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  const handleUpdate = async (e) => {
    e.preventDefault();

    const data = {
      id: post.id,
      title,
      published,
      content
    }

    const response = await fetch('/api/posts/update', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Session-Token': currentUser.sessionToken,
      },
      body: JSON.stringify(data),
    }).then(res => res.json())

    if (response?.success) {
      addNotification({ message: "Successfully updated", status: "success" })
      router.push(`/posts/${post.id}`)
    }
  }

  return ( 
    <>
      <div>
        <div style={{ padding: '2rem', background: '#333', color: 'white' }}>
          <Container>
            <input
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder={title}
            />
            <p style={{ display: 'flex', flexDirection: 'column' }}>
              <small>Created: {post.createdAt?.toLocaleString()}</small>
              <small>Updated: {post.updatedAt?.toLocaleString()}</small>
            </p>
            <p>
              <span>Published:
                <input
                  type="checkbox"
                  value={published}
                  onChange={e => {
                    console.log(e.target.value)
                    setPublished(!published)
                  }}
                />
              </span>
            </p>
          </Container>
        </div>
 
      </div>
      <div style={{ padding: '2rem' }}>
      <Container>
        <p>
          <textarea
            style={{ width: '100%' }}
            onChange={e => setContent(e.target.value)}
            value={content}
          />
        </p>
        <p>
          <Button
            variant="outline-secondary"
            onClick={handleUpdate}
          >Update</Button>
        </p>
      </Container>
      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { query: { id } } = context;

  const post = await prisma.post.findUnique({
    where: {
      id
    },
    include: {
      author: {
        select: {
          id: true,
          email: true,
        }
      }
    }
  })
  if (post) {
    delete post.author.password
  } else {
    return {
      notFound: true
    }
  }

  return {
    props: {
      post
    },
  }
}

export default Post;