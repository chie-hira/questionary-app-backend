import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AnswerFormat } from '../enums/question.enum';
import { AnswerChoice } from '../../answer-choice/entities/answerChoice.entity';
import { User } from 'src/user/entities/user.entity';
import { AnswerResult } from 'src/answer-result/entities/answerResult.entity';

@Entity('questions')
export class Question {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  question: string;

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

  @OneToMany(() => AnswerChoice, (answerChoice) => answerChoice.question)
  answerChoices: AnswerChoice[];

  @OneToMany(() => AnswerResult, (answerResult) => answerResult.question)
  answerResults: AnswerResult[];

  @ManyToOne(() => User, (user) => user.questions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
