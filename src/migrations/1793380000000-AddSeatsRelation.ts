import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddSeatsRelation1793380000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'seats',
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
            length: '20',
          },
          {
            name: 'reclining',
            type: 'boolean',
          },
          {
            name: 'theater_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK_seats_theater_id',
            columnNames: ['theater_id'],
            referencedTableName: 'theaters',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
          }),
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('seats');
  }
}
