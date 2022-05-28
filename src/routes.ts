/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express'

class AppRouter {
  public router: Router

  constructor () {
    this.router = Router()
  }
}

export default new AppRouter().router
