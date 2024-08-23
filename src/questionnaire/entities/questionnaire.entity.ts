import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AnswerFormat } from '../enums/questionnaire.enum';
import { Choice } from '../../choice/entities/choice.entity';

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

  @OneToMany(() => Choice, (choice) => choice.questionnaire)
  choices: Choice[];
}
