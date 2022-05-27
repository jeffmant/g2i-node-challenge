export interface IRepository<T> {
  findOneByParam: (param: string | number) => Promise<T>
  create: (entity: T) => Promise<void>
  update: (param: string | number, entity: Partial<T>) => Promise<void>
  delete: (param: string | number) => Promise<void>
}
