// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from '@/prisma/';

export default async function handler(req, res) {
  const sessionToken = req.headers['session-token']

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

  const { id, title, content, published } = req.body;

  const post = await prisma.post.findUnique({
    where: {
      id
    },
    include: {
      author: {
        select: {
          id: true,
        }
      }
    }
  })

  console.log({ post })

  if (
    !post ||
    post.author.id !== session.userId
  ) {
    return res.status(401).json({
      success: false,
      message: "Failed to authenticate",
    })
  }

  const result = await prisma.post.update({
    where: {
      id
    },
    data: {
      title,
      content,
      published
    }
  })

  console.log({ result })

  res.status(200).json({
    message: "Successfully updated",
    success: true,
  })
}
