import { Acronym } from '../../domain/entity/acronym.entity'
import { IRepository, PaginatedResult, PaginateParams } from '../../domain/repository/repository.interface'
import { AcronymModel } from '../database/sequelize/model/acronym.model'
import { Op } from 'sequelize'
export class AcronymRepository implements IRepository<Acronym> {
  async paginate (paginateParams: PaginateParams): Promise<PaginatedResult<Acronym>> {
    const params = {
      filter: paginateParams.filter ?? '',
      orderParam: paginateParams.orderParam ?? 'title',
      orderBy: paginateParams.orderBy ?? 'ASC',
      page: paginateParams.page ?? 1,
      pageSize: paginateParams.pageSize ?? 10
    }

    const foundAcronyms = await AcronymModel.findAndCountAll({
      where: {
        [Op.or]: [
          { definition: { [Op.like]: `%${params.filter}%` } },
          { title: { [Op.like]: `%${params.filter}%` } }
        ]
      },
      offset: params.page * params.pageSize,
      limit: params.pageSize,
      order: [[params.orderParam, params.orderBy]]
    })

    return {
      total: foundAcronyms.count,
      data: foundAcronyms.rows.map(foundAcronym => new Acronym(foundAcronym.title, foundAcronym.definition))
    }
  }

  async findOneByParam (title: string): Promise<Acronym> {
    const foundAcronym = await AcronymModel.findOne({ where: { title } })

    if (!foundAcronym) {
      throw new Error('Acronym not found')
    }

    return new Acronym(foundAcronym.title, foundAcronym.definition)
  }

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
    const foundAcronym = await AcronymModel.findOne({
      where: { title }
    })

    if (!foundAcronym) {
      throw new Error('Acronym not found')
    }

    const duplicatedAcronymDefinition = await AcronymModel.findOne({
      where: { definition: acronymData.definition }
    })

    if (duplicatedAcronymDefinition) {
      throw new Error('Acronym definition already exists')
    }

    await AcronymModel.update({
      title: acronymData?.title,
      definition: acronymData?.definition
    }, { where: { title } })
  }

  async delete (title: string): Promise<void> {
    const foundAcronym = await AcronymModel.findOne({
      where: { title }
    })

    if (!foundAcronym) {
      throw new Error('Acronym not found')
    }

    await AcronymModel.destroy({ where: { title } })
  }
}
