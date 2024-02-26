import * as mariadb from 'mariadb';
class MysqlConnection
{

    
    connection: mariadb.Connection = null;

    constructor(){
        this.connect();
    }

    async connect(){
        console.log( process.env.MARIADB_HOST);
        this.connection = await mariadb.createConnection({            
            host: process.env.MARIADB_HOST,
            user: process.env.MARIADB_USER,
            password: process.env.MARIADB_PASS,
            database: process.env.MARIADB_DATABASE,
            port : parseInt(process.env.MARIADB_PORT),
        });

        await this.connection.query(`CREATE TABLE IF NOT EXISTS cliente (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(200) not null,
            email VARCHAR(245) not null unique,
            cpf_cnpj VARCHAR(20) not null unique,
            created datetime null,
            modified datetime null
        )  ENGINE=INNODB;`);

        await this.connection.query(`CREATE TABLE IF NOT EXISTS categoria (
            id INT PRIMARY KEY AUTO_INCREMENT,
            name VARCHAR(200) not null unique,
            created datetime null,
            modified datetime null
        )  ENGINE=INNODB;`);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS produto (
                id INT PRIMARY KEY AUTO_INCREMENT,
                category_id INT not null,
                title VARCHAR(200) not null unique,
                description text null,
                value decimal(19,2) not null default 0,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS pedidos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                customer_id INT not null,
                status VARCHAR(200) not null default 'created',
                total_value decimal(19,2) not null default 0,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS pedido_produtos (
                id INT PRIMARY KEY AUTO_INCREMENT,
                order_id INT not null,
                product_id INT not null,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);

        await this.connection.query(`
            CREATE TABLE IF NOT EXISTS checkout (
                id INT PRIMARY KEY AUTO_INCREMENT,
                uuid VARCHAR(254) not null unique,
                status int(11) not null default 1,
                payment_method_id int(11) not null default 1,
                pedido_id int(11) not null,
                card_number varchar(50) null,
                card_cvv varchar(10) null,
                card_expiration_date varchar(10) null,
                payer_name varchar(245) null,
                payer_email varchar(245) null,
                payer_document varchar(16) null,
                total_value decimal(19,2) not null default 0,
                payload text null,
                external_reference varchar(254) null,
                created datetime null,
                modified datetime null
            )  ENGINE=INNODB;
        `);  
    }

    public conn () {
        return this.connection;
    }
}

export default MysqlConnection