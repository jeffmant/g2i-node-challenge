export interface PaginateParams {
  order: string
  orderBy: 'ASC' | 'DESC'
  search: string
  from: number
  limit: number
}

export interface PaginatedResult<T> {
  total: number
  data: T[]
}

export interface IRepository<T> {
  paginate: (params) => Promise<PaginatedResult<T>>
  findOneByParam: (param: string | number) => Promise<T>
  create: (entity: T) => Promise<void>
  update: (param: string | number, entity: Partial<T>) => Promise<void>
  delete: (param: string | number) => Promise<void>
}
