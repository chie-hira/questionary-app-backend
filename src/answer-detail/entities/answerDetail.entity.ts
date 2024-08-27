import { AnswerChoice } from 'src/answer-choice/entities/answerChoice.entity';
import { AnswerResult } from 'src/answer-result/entities/answerResult.entity';
import { Question } from 'src/question/entities/question.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answer_details')
export class AnswerDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => AnswerResult, (answerResult) => answerResult.answerDetails, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  answerResult: AnswerResult;

  @ManyToOne(() => Question, (question) => question.answerDetails, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  question: Question;

  @ManyToOne(() => AnswerChoice, (answerChoice) => answerChoice.answerDetails, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  answerChoice: AnswerChoice;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
