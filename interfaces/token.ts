import {Document} from 'mongoose';

export interface Token extends Document{
    id: string,
    iat?: number,
    ext?: number,
    tokenAssinado: string
}