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

  const { id } = req.body;

  const post = await prisma.post.findUnique({
    where: {
      id
    }
  })

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Not found"
    })
  } else {
    const result = await prisma.post.delete({
      where: {
        id
      }
    })
  }

  res.status(200).json({
    message: "Successfully deleted",
    success: true,
    data: post
  })
}
