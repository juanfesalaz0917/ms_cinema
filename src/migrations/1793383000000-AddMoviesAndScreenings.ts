import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class AddMoviesAndScreenings1793383000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '180',
          },
          {
            name: 'duration',
            type: 'int',
          },
          {
            name: 'date',
            type: 'date',
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'screenings',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'scheduled_at',
            type: 'datetime',
          },
          {
            name: 'theater_id',
            type: 'int',
          },
          {
            name: 'movie_id',
            type: 'int',
          },
        ],
        foreignKeys: [
          new TableForeignKey({
            name: 'FK_screenings_theater_id',
            columnNames: ['theater_id'],
            referencedTableName: 'theaters',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          }),
          new TableForeignKey({
            name: 'FK_screenings_movie_id',
            columnNames: ['movie_id'],
            referencedTableName: 'movies',
            referencedColumnNames: ['id'],
            onDelete: 'NO ACTION',
          }),
        ],
      }),
    );
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('screenings');
    await queryRunner.dropTable('movies');
  }
}
