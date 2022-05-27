import { Acronym } from '../../domain/entity/acronym.entity'
import { IRepository } from '../../domain/repository/repository.interface'
import { AcronymModel } from '../database/sequelize/model/acronym.model'
import { Op } from 'sequelize'
export class AcronymRepository implements IRepository<Acronym> {
  async create (acronymData: Acronym): Promise<void> {
    const foundAcronym = await AcronymModel.findOne({
      where: {
        [Op.or]: [
          { title: acronymData.title },
          { definition: acronymData.definition }
        ]
      }
    })

    if (foundAcronym) {
      throw new Error('Acronym already exists')
    }

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
