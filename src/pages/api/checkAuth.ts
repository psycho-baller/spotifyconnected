import { NextApiRequest, NextApiResponse } from 'next'
import { getToken } from 'next-auth/jwt'
import { getServerSession } from 'next-auth/next'
import { authOptions } from './auth/[...nextauth]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getServerSession(req, res, authOptions)

  if (session) {
    return res.send({
      content: 'This is protected content. You can access this content because you are signed in.',
    })
  }

  res.send({
    error: 'You must be sign in to view the protected content on this page.',
  })
}
