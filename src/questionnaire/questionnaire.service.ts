import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionnaireModel } from './models/questionnaire.model';
import { Questionnaire } from './entities/questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<QuestionnaireModel>,
  ) {}
  questionnaires: QuestionnaireModel[] = [];

  async getAllQuestionnaires(): Promise<QuestionnaireModel[]> {
    return await this.questionnaireRepository.find();
    // const questionnaire = new QuestionnaireModel();
    // questionnaire.id = 1;
    // questionnaire.title = 'What is your favorite programming language?';
    // questionnaire.answerFormat = AnswerFormat.ONE_CHOICE;
    // this.questionnaires.push(questionnaire);
    // return this.questionnaires;
  }
}
