import { Sequelize } from 'sequelize'

//configurar a conexao

class Database{
    constructor(){
        this.init()
    }
    init() {
        this.db = new Sequelize({
            dialect: 'postgres',
            database: 'exemplo_hit3',
            username: 'exemplo_hit3_user',
            password: 'Z0OGsU2VDD5NK1PMZhBLuTWSVrYhqz0M',
            host:'dpg-dbh7aqc9v7es73b84e1g-a.oregon-postgres.render.com',
            dialectOptions: {
                ssl: {
                    require: true,
                    rejectUnauthorized: false
                }
            }
        })
    }

}

export default new Database()