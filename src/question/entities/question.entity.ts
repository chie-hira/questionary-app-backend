import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { AnswerFormat } from '../enums/question.enum';
import { AnswerChoice } from '../../answerChoice/entities/answerChoice.entity';
import { User } from 'src/user/entities/user.entity';
import { Answer } from 'src/answer/entities/answer.entity';

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

  @OneToMany(() => AnswerChoice, (choice) => choice.question)
  choices: AnswerChoice[];

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];

  @ManyToOne(() => User, (user) => user.questions, {
    onDelete: 'CASCADE',
  })
  user: User;
}
