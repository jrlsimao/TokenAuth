import { Schema, Model, model} from "mongoose";
import { Token } from "../../interfaces/token";

export const usuarioAuthSchema : Schema = new Schema({
  id:{
      type:String,
      required: true
  },
  iat:{
      type:Number
  },
  ext:{
      type:Number
  },
  tokenAssinado:{
      type:String
  }
});

export const authenticationToken : Model<Token> = model<Token>("token", usuarioAuthSchema);