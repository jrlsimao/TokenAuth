import mongoose from 'mongoose';
import Express from 'express';
const bodyParser = require('body-parser')
import {RoutesAuth} from './routes/routes';

const servidor = Express();
servidor.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/token', ()=>{
    console.log('Esta ligado')
});

servidor.listen(3002, function(){
    console.log('Listening on port 3002');
    let rotas = new RoutesAuth(servidor).getServidor();
})