import { Request, Response, NextFunction } from 'express'
import { verify, decode } from 'jsonwebtoken'

import AppError from '../errors/AppError'

import authconfig from '../config/auth'

interface TokenPayload {
  iat: number
  exp: number
  sub: string
}

export default function ensureAuthenticated(
  request: Request,
  reposnse: Response,
  next: NextFunction
): void {

  const authHeader = request.headers.authorization

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401)
  }

  const [, token] = authHeader.split(' ')
  try {
    const decoded = verify(token, authconfig.jwt.secret)

    const { sub } = decoded as TokenPayload

    request.user = {
      id: sub
    }

    return next()

  } catch (error) {
    throw new AppError('Invalid JWT token', 401)
  }
}