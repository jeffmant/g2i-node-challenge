import { Request, Response } from 'express'
import AcronymRepository from '../../infra/repository/acronym.repository'
import { Acronym } from '../entity/acronym.entity'
import { IController } from '../protocols/controller.interface'
import { PaginateParams } from '../protocols/repository.interface'

class AcronymController implements IController {
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

  async create (req: Request, res: Response): Promise<Response> {
    try {
      const { title, definition } = req.body
      const acronymDataToCreate = new Acronym(title, definition)
      await AcronymRepository.create(acronymDataToCreate)

      return res.status(201).json({ message: 'Acronym created' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async update (req: Request, res: Response): Promise<Response> {
    try {
      const { title, definition } = req.body
      const { title: titleParam } = req.params
      await AcronymRepository.update(titleParam, { title, definition })

      return res.status(200).json({ message: 'Acronym updated' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }

  async delete (req: Request, res: Response): Promise<Response> {
    try {
      const { title } = req.params

      await AcronymRepository.delete(title)

      return res.status(200).json({ message: 'Acronym deleted' })
    } catch (error) {
      return res.status(500).json({ error: error.message })
    }
  }
}

export default new AcronymController()
