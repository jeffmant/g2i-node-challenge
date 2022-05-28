/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import AcronymController from './domain/controllers/acronym.controller'
import AuthMiddleware from './domain/middlewares/auth.middleware'

class AppRouter {
  public router: Router

  constructor () {
    this.router = Router()
    this.acronymRoutes()
  }

  acronymRoutes (): void {
    this.router.get('/acronyms', AuthMiddleware, AcronymController.paginate)
    this.router.get('/acronyms/:title', AuthMiddleware, AcronymController.findOneByParam)
    this.router.post('/acronyms', AuthMiddleware, AcronymController.create)
    this.router.put('/acronyms/:title', AuthMiddleware, AcronymController.update)
    this.router.delete('/acronyms/:title', AuthMiddleware, AcronymController.delete)
  }
}

export default new AppRouter().router
