import { AnswerDetail } from '../../answer-detail/entities/answerDetail.entity';
import { Question } from '../../question/entities/question.entity';
import { Respondent } from '../../respondent/entities/respondent.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('answer_results')
@Unique(['question', 'respondent'])
export class AnswerResult {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answerResults, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  question: Question;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Respondent, (respondent) => respondent.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  respondent: Respondent;

  @OneToMany(() => AnswerDetail, (answerDetail) => answerDetail.answerResult, {
    cascade: true,
  })
  answerDetails: AnswerDetail[];

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
