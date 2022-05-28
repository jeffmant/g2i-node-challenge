import { NextFunction, Request, Response } from 'express'

export = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers?.authorization?.split(' ')[1]
    if (token !== process.env.ACCESS_TOKEN) {
      throw new Error('Unauthorized')
    } else {
      next()
    }
  } catch (error) {
    res.status(401).json({ error: error.message })
  }
}
