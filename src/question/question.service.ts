import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { QuestionModel } from './models/question.model';
import { Question } from './entities/question.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateQuestionInput } from './dto/createQuestion.Input.dto';
import { AnswerChoice } from '../answerChoice/entities/answerChoice.entity';
import { CreateAnswerChoiceInput } from '../answerChoice/dto/createAnswerChoice.Input.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<QuestionModel>,
    @InjectRepository(AnswerChoice)
    private readonly choiceRepository: Repository<AnswerChoice>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  questionnaires: QuestionModel[] = [];

  async getAllQuestions(): Promise<QuestionModel[]> {
    return await this.questionRepository.find();
  }

  async createQuestion(
    createQuestionInput: CreateQuestionInput,
  ): Promise<QuestionModel> {
    const { title, answerFormat, userId } = createQuestionInput;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const newQuestion = this.questionRepository.create({
      title,
      answerFormat,
      user,
    });

    return await this.questionRepository.save(newQuestion);
  }

  async createQuestionWithAnswerChoices(
    createQuestionInput: CreateQuestionInput,
    createAnswerChoicesInput: CreateAnswerChoiceInput[],
  ): Promise<QuestionModel> {
    const { title, answerFormat, userId } = createQuestionInput;
    const user = await this.userRepository.findOne({ where: { id: userId } });

    const newQuestion = this.questionRepository.create({
      title,
      answerFormat,
      user,
    });

    await this.questionRepository.save(newQuestion);

    const newChoices = createAnswerChoicesInput.map((choiceInput) => {
      return this.choiceRepository.create({
        choice: choiceInput.choice,
        question: newQuestion,
      });
    });

    await this.choiceRepository.save(newChoices);

    const savedQuestionnaire = await this.questionRepository.findOne({
      where: { id: newQuestion.id },
      relations: ['choices'], // choicesリレーションをロード
    });

    return savedQuestionnaire as QuestionModel;
  }
}
