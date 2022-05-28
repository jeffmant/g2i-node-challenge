import { Request, Response } from 'express'
import AcronymRepository from '../../infra/repository/acronym.repository'
import { PaginateParams } from '../protocols/repository.interface'

class AcronymController {
  async paginate (req: Request, res: Response): Promise<Response> {
    const { filter = '', orderParam = 'title', orderBy = 'ASC', offset = 0, pageSize = 10 } = req.query
    const params = {
      filter,
      orderParam,
      orderBy,
      offset,
      pageSize
    }
    try {
      const paginatedAcronyms = await AcronymRepository.paginate(params as PaginateParams)

      return res.status(200).json(paginatedAcronyms)
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export default new AcronymController()
