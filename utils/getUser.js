import { getCookie } from "cookies-next";
import prisma from '@/prisma';

export default async function getUser(req, res) {
  const token = getCookie("sessionToken", { req, res });

  try {
    let session = await prisma.session.findUnique({
        where: {
            id: token
        },
        include: {
            owner: true
        }
    })

    if (session) {
        delete session.owner.password
    }

    return session;
  } catch (error) {
    return null;
  }
}