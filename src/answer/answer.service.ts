import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Respondent } from 'src/respondent/entities/respondent.entity';
import { Repository } from 'typeorm';
import { CreateAnswerInput } from './dto/create.answer.input.dto';
import { CreateRespondentInput } from 'src/respondent/dto/create.respondent.input.dto';
import { AnswerModel } from './models/answer.model';
import { Answer } from './entities/answer.entity';
import { AnswerChoice } from 'src/answerChoice/entities/answerChoice.entity';
import { Question } from 'src/question/entities/question.entity';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<AnswerModel>,
    @InjectRepository(Respondent)
    private readonly respondentRepository: Repository<Respondent>,
  ) {}

  async createAnswerWithRespondent(
    createAnswerInput: CreateAnswerInput,
    createRespondentInput: CreateRespondentInput,
  ): Promise<AnswerModel> {
    const { name, email } = createRespondentInput;
    const { questionId, choiceId, description } = createAnswerInput;

    const respondent = await this.respondentRepository.findOne({
      where: { email },
    });

    if (!respondent) {
      const respondent = await this.respondentRepository.create({
        name,
        email,
      });
      await this.respondentRepository.save(respondent);
    }

    const existingAnswer = await this.answerRepository.findOne({
      where: {
        question: { id: questionId },
        respondent,
      },
    });

    if (existingAnswer) {
      throw new Error(
        'An answer for this question by this respondent already exists.',
      );
    }

    const newAnswer = await this.answerRepository.create({
      question: { id: questionId } as Question,
      choice: { id: choiceId } as AnswerChoice,
      description,
      respondent,
    });
    await this.answerRepository.save(newAnswer);

    const savedAnswer = await this.answerRepository.findOne({
      where: { id: newAnswer.id },
      relations: ['question', 'choice', 'respondent'],
    });

    return savedAnswer as AnswerModel;
  }
}
