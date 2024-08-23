import { Questionnaire } from '../../questionnaire/entities/questionnaire.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

@Entity('choices')
@Unique(['choice', 'questionnaire'])
export class Choice {
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

  @ManyToOne(() => Questionnaire, (questionnaire) => questionnaire.choices, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  questionnaire: Questionnaire;
}
