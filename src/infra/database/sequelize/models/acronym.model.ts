import { Column, Model, DataType, Table } from 'sequelize-typescript'

@Table({
  tableName: 'acronyms',
  timestamps: false
})
export class AcronymModel extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  declare id: number

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare title: string

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  declare definition: string
}
