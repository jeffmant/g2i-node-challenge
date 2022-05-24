export class Acronym {
  private readonly _title: string
  private readonly _definition: string

  constructor (title: string, definition: string) {
    this._title = title
    this._definition = definition

    this.validate()
  }

  private validate (): void {
    const requiredFields = ['title', 'definition']
    for (const field of requiredFields) {
      if (!this[field]) {
        throw new Error(`Must have ${field} as string`)
      }
    }
  }

  get title (): string {
    return this._title
  }

  get definition (): string {
    return this._definition
  }
}
