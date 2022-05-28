export interface IController {
  paginate: (req: Request, res: Response) => Promise<Response>
}
