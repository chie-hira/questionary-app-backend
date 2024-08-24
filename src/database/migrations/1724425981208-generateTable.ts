import { MigrationInterface, QueryRunner } from "typeorm";

export class GenerateTable1724425981208 implements MigrationInterface {
    name = 'GenerateTable1724425981208'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`answer_choices\` (\`id\` int NOT NULL AUTO_INCREMENT, \`choice\` varchar(255) NOT NULL, \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, \`questionId\` int NOT NULL, UNIQUE INDEX \`IDX_79aa5f2d695d01350b034df862\` (\`choice\`, \`questionId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`questions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`answerFormat\` varchar(255) NOT NULL DEFAULT 'ONE_CHOICE', \`createdAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP, \`updatedAt\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`answer_choices\` ADD CONSTRAINT \`FK_3fe8fc84d7d8fad1fd7be4550f3\` FOREIGN KEY (\`questionId\`) REFERENCES \`questions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`answer_choices\` DROP FOREIGN KEY \`FK_3fe8fc84d7d8fad1fd7be4550f3\``);
        await queryRunner.query(`DROP TABLE \`questions\``);
        await queryRunner.query(`DROP INDEX \`IDX_79aa5f2d695d01350b034df862\` ON \`answer_choices\``);
        await queryRunner.query(`DROP TABLE \`answer_choices\``);
    }

}
