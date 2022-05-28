import { Request, Response } from 'express'

export interface IController {
  paginate: (req: Request, res: Response) => Promise<Response>
  create: (req: Request, res: Response) => Promise<Response>
}
