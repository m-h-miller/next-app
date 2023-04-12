import prisma from '@/prisma/';
import storage from "@/utils/storage";
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import useSWR from "swr";
import { Container } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { NotificationManager } from 'react-notifications';
import OwnedByCurrentUser from '@/components/OwnedByCurrentUser';
import React from 'react';
import { PostWithAuthor } from '@/components/Posts';

const Post = ({ post }: { post: PostWithAuthorDetails }) => {
  const { data: currentUser } = useSWR("user", storage);

  const router = useRouter()

  const handleDelete = React.useCallback(async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const data = {
      id: post?.id
    }

    const response = await fetch('/api/posts/delete', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Session-Token': currentUser.sessionToken,
      },
      body: JSON.stringify(data),
    }).then(res => res.json())

    if (response?.success) {
      NotificationManager.success("Successfully deleted")
      router.push('/')
    }
  }, []);

  return ( 
    <>
      <div>
        <div style={{ padding: '2rem', background: '#333', color: 'white' }}>
          <Container>
            <h1>{post?.title}</h1>
            <p style={{ display: 'flex', flexDirection: 'column' }}>
              <small>Created: {post?.createdAt?.toLocaleString()}</small>
              <small>Updated: {post?.updatedAt?.toLocaleString()}</small>
            </p>
            <p>
              <span>Published: {post?.published?.toString()}</span>
            </p>
            <OwnedByCurrentUser ownerId={post?.authorId}>
              <Link href={`/posts/${post?.id}/edit`}>
                <Button variant="outline-secondary">
                  Edit
                </Button>
              </Link>
              {'   '}
              <Button variant="outline-danger" onClick={handleDelete}>
                Delete
              </Button>
            </OwnedByCurrentUser>
          </Container>

        </div>
 
      </div>
      <div style={{ padding: '2rem' }}>
      <Container>
        <p>
          {post?.content}
        </p>
      </Container>
      </div>
    </>
  )
}

type PostWithAuthorDetails = PostWithAuthor & {
  author: {
    password?: string,
  }
} | null;

export async function getServerSideProps(context: { query: { id: string; }; }) {
  const { query: { id } } = context;

  const post: PostWithAuthorDetails = await prisma.post.findUnique({
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