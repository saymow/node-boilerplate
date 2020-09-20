import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class InsertAuthorFieldOnPosts1600641686988
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'Posts',
      new TableColumn({
        name: 'author_id',
        type: 'uuid',
      })
    );

    await queryRunner.createForeignKey(
      'Posts',
      new TableForeignKey({
        name: 'post_author',
        columnNames: ['author_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'Users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('Posts', 'post_author');

    await queryRunner.dropColumn('Posts', 'author_id');
  }
}
