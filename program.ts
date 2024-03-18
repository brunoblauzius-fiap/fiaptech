import Server  from "./server";
import {MysqlDataBase} from "./app/external/MysqlDataBase";

let  port = process.env.PORT || 3000;
const _db = new MysqlDataBase();
const _server = new Server(_db);
_server.app.listen(port, () => {
    console.log('Server exec: PORTA -> ' + port);
});
