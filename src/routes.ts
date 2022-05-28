/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'
import AcronymController from './domain/controllers/acronym.controller'

class AppRouter {
  public router: Router

  constructor () {
    this.router = Router()
    this.acronymRoutes()
  }

  acronymRoutes (): void {
    this.router.get('/acronyms', AcronymController.paginate)
    this.router.post('/acronyms', AcronymController.create)
  }
}

export default new AppRouter().router
