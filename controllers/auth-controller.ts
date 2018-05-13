import {Request, Response} from 'express';
import {Token} from '../interfaces/token';
import {authenticationToken} from '../Database/Schemas/usuario-auth-schema';
import * as jwt from 'jsonwebtoken';

export class AuthController{

    public palavraSecreta: string;

    constructor(){
        //Load da palavraSecreta
        this.palavraSecreta = '#EstaPa1AvraÉS3cr3ta2018!';

    }
    public criaToken(req:Request, resp:Response){
        if(req.body){
            let newToken = new authenticationToken();
            const requestBody = <Token>req.body;
            console.log(requestBody);
            newToken.id = requestBody.id;
            newToken.tokenAssinado = jwt.sign({"id": newToken.id}, this.palavraSecreta, { expiresIn: '1m' });
            newToken.save().then((token)=>{
                if(token){
                    resp.status(200).send(token);
                }
                else{
                    resp.status(200).send('Problemas na criacao do Token')
                }
            }).catch((err)=>{
                console.log(err);
                resp.status(200).send('Problemas na criacao do Token');
            });
            
        }
        else{
            resp.status(200).send('Corpo Vazio!');
        }
    }

    public verificaToken(req:Request, resp:Response){
        console.log(req.headers.tokenassinado);
        const infoRequest = req.headers.tokenassinado;
        authenticationToken.findOne({"tokenAssinado": infoRequest}).then((result)=>{
            console.log(result);
            if(result){
                const verifyResult = jwt.verify(result.tokenAssinado, this.palavraSecreta, (error, infoDecoded)=>{
                    if(error){
                        resp.status(500).send(error);
                    }
                    
                    if(infoDecoded){
                            resp.status(200).send({result: 'Valido'});
                    }else{
                        resp.status(200).send({result: 'Expirou'});
                    }
                });        
            }
            else{
                    resp.status(500).send('Token nao encontrado');
            }
        }).catch((error)=>{
            console.log(error);
            resp.status(500).send('Id não encontrado!');
        });
        
    }

}