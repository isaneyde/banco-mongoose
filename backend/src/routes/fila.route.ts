import { Router } from "express";
import { addToFila, getFilaStatus} from "../controllers/fila.controllers";
import { authentionToken} from "../milddleware/auth.Middleware";
import { isAdmin } from "../milddleware/role.middlware";

export const filaRouter = Router();

filaRouter.post("/", authentionToken, addToFila);
filaRouter.get("/:userId", authentionToken, getFilaStatus);


export default filaRouter;
