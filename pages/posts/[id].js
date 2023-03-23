import { useRouter } from 'next/router'
import prisma from '@/prisma/';

const Post = ({ post }) => {
  const router = useRouter()
  if (!post) {
    router.push('/')
  }
  return ( 
    <>
      {JSON.stringify(post, null, 4)}
    </>
  )
}

export async function getServerSideProps(context) {
  const { query: { id } } = context;

  const post = await prisma.post.findUnique({
    where: {
      id
    }
  })

  return {
    props: {
      post
    },
  }
}

export default Post;