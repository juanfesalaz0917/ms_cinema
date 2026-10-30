import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTheatersTable1793023500000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'theaters',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'location',
            type: 'varchar',
            length: '120',
          },
          {
            name: 'capacity',
            type: 'int',
          },
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('theaters');
  }
}
