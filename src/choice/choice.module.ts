import { Module } from '@nestjs/common';
import { ChoiceResolver } from './choice.resolver';
import { ChoiceService } from './choice.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Choice } from './entities/choice.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Choice])],
  providers: [ChoiceResolver, ChoiceService],
})
export class ChoiceModule {}
