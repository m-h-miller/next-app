import prisma from '@/prisma/';
import Link from 'next/link';
import getUser from '@/utils/getUser';
import { Container } from 'react-bootstrap';
import OwnedByCurrentUser from '@/components/OwnedByCurrentUser';

export default function Profile({ posts, userId }) {
  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      email: e.target.email.value,
      name: e.target.name.value,
    }

    const response = await fetch('/api/settings', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        body: JSON.stringify(data)
      }
    }).then(res => res.json())
  }

  return (
    <Container>
      <div>
        <OwnedByCurrentUser ownerId={userId}>
          <p>Settings</p>
          <form onSubmit={handleSubmit}>
            <input type="text" id="email" name="email" placeholder="Email" />
            <input type="text" id="name" name="name" placeholder="Name" />
            <button type="submit">Submit</button>
          </form>
        </OwnedByCurrentUser>
      </div>
      <div>
        <p>Posts</p>
        {
          posts.map(i => (
            <li key={i.id}>
              <Link href={`/posts/${i.id}`}>{i.title}</Link>
            </li>
          ))
        }
      </div>
    </Container>
  );
}

export async function getServerSideProps(context) {
  const { query: { userId } } = context;
  const session = await getUser(context.req, context.res)
  
  let isOwner = false
  if (session.userId === userId) {
    isOwner = true
  } 

  const posts = await prisma.post.findMany({
    where: {
      authorId: userId,
      published: isOwner ? undefined : true
    },
    take: 10
  })

  return {
    props: {
      posts,
      userId
    },
  }
}