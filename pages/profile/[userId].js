import prisma from '@/prisma/';

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
        // 'User-Id': 
        body: JSON.stringify(data)
      }
    }).then(res => res.json())

    console.log({ response })


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
        {JSON.stringify({ posts })}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { query: { userId } } = context;

  const posts = await prisma.post.findMany({
    where: {
      authorId: userId
    }
  })

  return {
    props: {
      posts
    },
  }
}