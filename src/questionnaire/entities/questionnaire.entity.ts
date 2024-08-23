import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { AnswerFormat } from '../enums/questionnaire.enum';

@Entity('questionnaires')
export class Questionnaire {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ default: AnswerFormat.ONE_CHOICE })
  answerFormat: AnswerFormat;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
