import { Injectable } from '@nestjs/common';
import { QuestionnaireModel } from './models/questionnaire.model';
import { AnswerFormat } from './enums/questionnaire.enum';

@Injectable()
export class QuestionnaireService {
  questionnaires: QuestionnaireModel[] = [];

  getAllQuestionnaires(): QuestionnaireModel[] {
    const questionnaire = new QuestionnaireModel();
    questionnaire.id = 1;
    questionnaire.title = 'What is your favorite programming language?';
    questionnaire.answerFormat = AnswerFormat.ONE_CHOICE;
    this.questionnaires.push(questionnaire);
    return this.questionnaires;
  }
}
