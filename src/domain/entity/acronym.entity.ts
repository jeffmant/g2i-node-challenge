export class Acronym {
  private readonly _title: string
  private readonly _definition: string

  constructor (title: string, definition: string) {
    this._title = title
    this._definition = definition

    if (!this._title) {
      throw new Error('Must have title as string')
    }

    if (!this._definition) {
      throw new Error('Must have definition as string')
    }
  }

  get title (): string {
    return this._title
  }

  get definition (): string {
    return this._definition
  }
}
