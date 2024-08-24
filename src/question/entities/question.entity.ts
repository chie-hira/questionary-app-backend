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

  @ManyToOne(() => User, (user) => user.questions)
  user: User;
}
