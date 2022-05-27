export interface IRepository<T> {
  create: (entity: T) => Promise<void>
}
