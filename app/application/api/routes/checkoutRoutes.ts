import * as express from "express";
import CheckoutController from "../../../controllers/CheckoutController";
import { IDataBase } from "../../../interfaces/IDataBase";

export default function checkoutRoutes(dbconnection: IDataBase) {
    let router = express.Router();
    const checkoutController = new CheckoutController(dbconnection);
    router.post('/checkout', checkoutController.store);
    router.put('/checkout/hook/:pedido_id', checkoutController.hook);
    router.get('/checkout/:pedido_id/status', checkoutController.findByIdPedido);
    return router;
}
