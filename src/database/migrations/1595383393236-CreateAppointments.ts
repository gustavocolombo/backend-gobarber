import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1595383393236 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name : 'appointments',
          columns : [
            {
              name : 'id',
              type : 'varchar',
              isPrimary : true,
              generationStrategy : 'uuid',
              default: 'uuid_generate_v4()',
            },
            
            {
              name : 'provider',
              type: 'varchar',
              isNullable: false,
            },

            {
              name : 'date',
              type : 'timestamp ',
              isNullable: false
            } 
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments');
    }

}
