// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma/';

export default async function handler(req, res) {
  const sessionToken = req.headers['session-token']
  const userId = req.headers['user-id']

  const session = await prisma.session.findUnique({
    where: {
      id: sessionToken,
    }
  })

  if (!session) {
    return res.status(401).json({
      success: false,
      message: "Failed to authenticate",
    })
  }


  const { title, content, published } = req.body;

  const post = await prisma.post.create({
    data: {
      authorId: userId,
      title,
      content,
      published,
    }
  })

  console.log({ post })


  res.status(200).json({ message: "Successfully posted" })
}
