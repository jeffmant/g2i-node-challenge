import { Acronym } from '../../domain/entity/acronym.entity'
import { IRepository } from '../../domain/repository/repository.interface'
import { AcronymModel } from '../database/sequelize/model/acronym.model'

export class AcronymRepository implements IRepository<Acronym> {
  async create (acronymData: Acronym): Promise<void> {
    await AcronymModel.create({
      title: acronymData.title,
      definition: acronymData.definition
    })
  }

  async update (title: string, acronymData: Partial<Acronym>): Promise<void> {
    await AcronymModel.update({
      title: acronymData?.title,
      definition: acronymData?.definition
    }, { where: { title } })
  }
}
