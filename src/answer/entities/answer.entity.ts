import { AnswerChoice } from 'src/answerChoice/entities/answerChoice.entity';
import { Question } from 'src/question/entities/question.entity';
import { Respondent } from 'src/respondent/entities/respondent.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('answers')
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
    nullable: false,
    lazy: true,
  })
  question: Question;

  @ManyToOne(() => AnswerChoice, (choice) => choice.answers, {
    onDelete: 'CASCADE',
    nullable: true,
  })
  choice: AnswerChoice;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => Respondent, (respondent) => respondent.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  respondent: Respondent;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;
}
