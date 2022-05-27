import { Acronym } from '../../domain/entity/acronym.entity'
import { IRepository } from '../../domain/repository/repository.interface'
import { AcronymModel } from '../database/sequelize/model/acronym.model'

export class AcronymRepository implements IRepository<Acronym> {
  async create (entity: Acronym): Promise<void> {
    await AcronymModel.create({
      title: entity.title,
      definition: entity.definition
    })
  }
}
