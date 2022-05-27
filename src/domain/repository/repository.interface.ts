export interface IRepository<T> {
  create: (entity: T) => Promise<void>
  update: (param: string | number, entity: Partial<T>) => Promise<void>
}
