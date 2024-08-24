import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AnswerFormat } from '../enums/question.enum';
import { AnswerChoice } from '../../answerChoice/entities/answerChoice.entity';

@Entity('questions')
export class Question {
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

  @OneToMany(() => AnswerChoice, (choice) => choice.question)
  choices: AnswerChoice[];
}
