import { Table, Column, Model, DataType} from 'sequelize-typescript';

@Table
export class Heroes extends Model<Heroes> {
  @Column({ type: DataType.STRING, allowNull: false })
  nome: string;

  @Column({ type:DataType.STRING, allowNull: false })
  tipo_poder: string;

  @Column({ type: DataType.STRING, allowNull: false })
  primeira_aparicao: string;

  @Column({ type: DataType.STRING, allowNull: false})
  data_lancamento:Date;

  @Column({ type: DataType.STRING, allowNull: false })
  criador: string;

  @Column({ type:DataType.STRING, allowNull: true})
  fraquesa: string;

  @Column({ type: DataType.INTEGER, allowNull: false})
  editoraId: number;

  @Column({ type: DataType.INTEGER, allowNull: false})
  equipeId: number;

  @Column({ type:DataType.INTEGER, allowNull: false })
  moralidadeId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  origensId: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  sexoId: number;
}