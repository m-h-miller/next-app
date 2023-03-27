import prisma from '@/prisma/';
import Link from 'next/link';

export default function Profile({ posts }) {
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
    <>
      <div>
        <p>Settings</p>
        <form onSubmit={handleSubmit}>
          <input type="text" id="email" name="email" placeholder="Email" />
          <input type="text" id="name" name="name" placeholder="Name" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div>
        <p>My Posts</p>
        {
          posts.map(i => (
            <li key={i.id}>
              <Link href={`/posts/${i.id}`}>{i.title}</Link>
            </li>
          ))
        }
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query: { userId } } = context;

  const posts = await prisma.post.findMany({
    where: {
      authorId: userId
    },
    take: 10
  })

  return {
    props: {
      posts
    },
  }
}