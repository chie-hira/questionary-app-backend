import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/createUser.input.dto';
import { UserModel } from './models/user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<UserModel> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(CreateUserInput: CreateUserInput): Promise<UserModel> {
    const { name, email, password } = CreateUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return await this.userRepository.save(newUser);
  }
}
