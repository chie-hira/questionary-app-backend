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
@Unique(['choice', 'question'])
export class AnswerChoice {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  choice: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.choices, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  question: Question;

  @OneToMany(() => Answer, (answer) => answer.choice)
  answers: Answer[];
}
