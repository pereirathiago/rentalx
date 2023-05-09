import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterUserDeleteUsername1683641235925 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "username")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users",
            new TableColumn({
                name: "username",
                type: "varchar"
            })
        )
    }

}
