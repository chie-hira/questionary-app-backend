import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

// .env ファイルから環境変数を読み込む
dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  logging: true, // コンソール画面に実行したSQLを表示
  synchronize: false, // true だと migration が自動実行
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: ['src/database/migrations/*.ts'], // マイグレーションファイルのパス
});
