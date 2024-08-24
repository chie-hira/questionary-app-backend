import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { QuestionnaireModule } from './question/question.module';
import { ChoiceModule } from './answerChoice/answerChoice.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // process.env でアクセスできるようにする
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // エンティティのパス
      synchronize: true,
      /**
       * true: アプリケーションを再起動するたびにエンティティを同期
       * エンティティ名を修正したとき、古いエンティティ名のテーブルがそのまま残る
       * 主導でmigrationを作成する場合はfalseにする
       */
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    QuestionnaireModule,
    ChoiceModule,
    UserModule,
    AuthModule,
  ],
})
export class AppModule {}
