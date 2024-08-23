import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionnaireModel } from './models/questionnaire.model';
import { Questionnaire } from './entities/questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionnaireInput } from './dto/createQuestionnaire.Input.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<QuestionnaireModel>,
  ) {}
  questionnaires: QuestionnaireModel[] = [];

  async getAllQuestionnaires(): Promise<QuestionnaireModel[]> {
    return await this.questionnaireRepository.find();
  }

  async createQuestionnaire(
    createQuestionnaireInput: CreateQuestionnaireInput,
  ): Promise<QuestionnaireModel> {
    const { title, answerFormat } = createQuestionnaireInput;
    // const user = await this.userRepository.findOne({ where: { id: userId } });

    const newQuestionnaire = this.questionnaireRepository.create({
      title,
      answerFormat,
      // user,
    });

    return await this.questionnaireRepository.save(newQuestionnaire);
  }
}
