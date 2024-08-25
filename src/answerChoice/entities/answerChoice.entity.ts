import { Answer } from 'src/answer/entities/answer.entity';
import { Question } from '../../question/entities/question.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('answer_choices')
@Unique(['answerChoice', 'question'])
export class AnswerChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  answerChoice: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.answerChoices, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.answerChoice)
  answers: Answer[];
}
