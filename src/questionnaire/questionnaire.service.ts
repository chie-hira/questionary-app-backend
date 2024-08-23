import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionnaireModel } from './models/questionnaire.model';
import { Questionnaire } from './entities/questionnaire.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionnaireInput } from './dto/createQuestionnaire.Input.dto';
import { Choice } from 'src/choice/entities/choice.entity';
import { CreateChoiceInput } from 'src/choice/dto/createChoice.Input.dto';

@Injectable()
export class QuestionnaireService {
  constructor(
    @InjectRepository(Questionnaire)
    private readonly questionnaireRepository: Repository<QuestionnaireModel>,
    @InjectRepository(Choice)
    private readonly choiceRepository: Repository<Choice>,
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

  async createQuestionnaireWithChoices(
    createQuestionnaireInput: CreateQuestionnaireInput,
    createChoicesInput: CreateChoiceInput[],
  ): Promise<QuestionnaireModel> {
    const { title, answerFormat } = createQuestionnaireInput;
    // const user = await this.userRepository.findOne({ where: { id: userId } });

    const newQuestionnaire = this.questionnaireRepository.create({
      title,
      answerFormat,
      // user,
    });

    await this.questionnaireRepository.save(newQuestionnaire);

    const newChoices = createChoicesInput.map((choiceInput) => {
      return this.choiceRepository.create({
        choice: choiceInput.choice,
        questionnaire: newQuestionnaire,
      });
    });

    await this.choiceRepository.save(newChoices);

    const savedQuestionnaire = await this.questionnaireRepository.findOne({
      where: { id: newQuestionnaire.id },
      relations: ['choices'], // choicesリレーションをロード
    });

    return savedQuestionnaire as QuestionnaireModel;
  }
}
