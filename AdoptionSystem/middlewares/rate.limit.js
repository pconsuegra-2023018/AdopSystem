//Middleware de Limitaciób d solicitudes

import rateLimit from "express-rate-limit";

export const limiter = rateLimit(
    {
        windowMs: 10 * 60 *1000, //Ranto de tiempo en milisegundos
        max: 100, //Cantidad de peticiones permitidas en rango de tiempo
        message:{
            message: 'Your blocked, wait 10 minutes'
        }
    }
)