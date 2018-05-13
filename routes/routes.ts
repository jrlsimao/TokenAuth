import {Request, Response, Application} from 'express';
import {AuthController} from '../controllers/auth-controller'
import { request } from 'https';

export class RoutesAuth {
    private localServer: Application;
    private controlador: AuthController;

    constructor(server: Application){
        this.localServer = server;
        this.controlador = new AuthController();
        this.setRoutes();
    }

    public getServidor():Express.Application{
        return this.localServer;
    }

    private setRoutes():void{
        if(this.localServer){
            this.localServer.get('/buscarToken/:tokenAssinado', this.controlador.verificaToken.bind(this.controlador));
            this.localServer.post('/criarToken', this.controlador.criaToken.bind(this.controlador));
            this.localServer.get('/', (req, res)=>res.send('Funciona'));
        }
    }
}