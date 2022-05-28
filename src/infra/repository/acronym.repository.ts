import { Acronym } from '../../domain/entity/acronym.entity'
import { IRepository, PaginatedResult, PaginateParams } from '../../domain/protocols/repository.interface'
import { AcronymModel } from '../database/sequelize/models/acronym.model'
import { Op } from 'sequelize'
import { Sequelize } from 'sequelize-typescript'
class AcronymRepository implements IRepository<Acronym> {
  async paginate (paginateParams: PaginateParams): Promise<PaginatedResult<Acronym>> {
    const params = {
      filter: paginateParams.filter ?? '',
      orderParam: paginateParams.orderParam ?? 'title',
      orderBy: paginateParams.orderBy ?? 'ASC',
      offset: paginateParams.offset ?? 0,
      pageSize: paginateParams.pageSize ?? 10
    }

    const foundAcronyms = await AcronymModel.findAndCountAll({
      where: Sequelize.where(
        Sequelize.fn('lower', Sequelize.col('definition')),
        {
          [Op.like]: `%${params.filter?.toLowerCase()}%`
        }
      ),
      offset: params.offset * params.pageSize,
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

export default new AcronymRepository()
