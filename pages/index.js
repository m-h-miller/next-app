import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Link from 'next/link'
import Posts from '../components/Posts';
import prisma from '@/prisma/';
import { Container } from 'react-bootstrap';

const inter = Inter({ subsets: ['latin'] })

export default function Home({ posts }) {
  return (
    <>
      <div style={{ padding: '2rem', background: '#333', color: 'white' }}>
        <Container style={{ textAlign: 'center' }}>
          <h1 className={inter.className} style={{ textShadow: '0 1px 3px rgba(0,0,0,.3)' }}>Logo</h1>
          <h5>An example application</h5>
        </Container>
      </div>
      <Posts posts={posts} />
    </>
  )
}

export async function getServerSideProps() {
  const posts = await prisma.post.findMany({
    where: {
      published: true,
    },
    include: {
      author: {
        select: {
          email: true,
        }
      }
    },
    orderBy: [
      {
        createdAt: 'desc'
      }
    ],
    take: 10
  })

  return {
    props: {
      posts
    },
  }
}