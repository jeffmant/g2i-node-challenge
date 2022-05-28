import { Request, Response } from 'express'

export interface IController {
  paginate: (req: Request, res: Response) => Promise<Response>
  findOneByParam: (req: Request, res: Response) => Promise<Response>
  create: (req: Request, res: Response) => Promise<Response>
  update: (req: Request, res: Response) => Promise<Response>
  delete: (req: Request, res: Response) => Promise<Response>
}
