import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex,
} from 'typeorm';

export class CreateProjectorsTable1793378000000 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    if (!(await queryRunner.hasTable('projectors'))) {
      await queryRunner.createTable(
        new Table({
          name: 'projectors',
          columns: [
            {
              name: 'id',
              type: 'int',
              isPrimary: true,
              isGenerated: true,
              generationStrategy: 'increment',
            },
            {
              name: 'brand',
              type: 'varchar',
              length: '120',
            },
            {
              name: 'high',
              type: 'int',
            },
            {
              name: 'width',
              type: 'int',
            },
            {
              name: 'theater_id',
              type: 'int',
              isNullable: true,
            },
          ],
          foreignKeys: [
            new TableForeignKey({
              name: 'FK_projectors_theater_id',
              columnNames: ['theater_id'],
              referencedTableName: 'theaters',
              referencedColumnNames: ['id'],
              onDelete: 'NO ACTION',
            }),
          ],
        }),
      );
    }

    const projectorsTable = await queryRunner.getTable('projectors');
    if (!projectorsTable) {
      throw new Error('Projectors table was not created');
    }

    if (
      !projectorsTable.indices.some(
        (index) => index.name === 'UQ_projectors_theater_id',
      )
    ) {
      await queryRunner.createIndex(
        'projectors',
        new TableIndex({
          name: 'UQ_projectors_theater_id',
          columnNames: ['theater_id'],
          isUnique: true,
        }),
      );
    }
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projectors');
  }
}
