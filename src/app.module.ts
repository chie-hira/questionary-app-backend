import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { QuestionnaireModule } from './questionnaire/questionnaire.module';

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
      synchronize: false,
      /**
       * true: アプリケーションを再起動するたびにエンティティを同期
       * エンティティ名を修正したとき、古いエンティティ名のテーブルがそのまま残るため
       * falseにしてmigrateを使う
       */
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      playground: true,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    QuestionnaireModule,
  ],
})
export class AppModule {}
