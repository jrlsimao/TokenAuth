import Mongoose from 'mongoose';

export class dbLink{
    private ConnectionDB: Promise<typeof Mongoose>;
    private ConnectionString = ''; //No futuro ler do ficheiro de confs
    private port = 27017; //ler do ficheiro de confs no futuro
    private databaseName = 'token';//ler do ficheiro de confs no futuro

    constructor(){
        this.ConnectionString = `mongodb://localhost:${this.port}/${this.databaseName}`;
        this.ConnectionDB = Mongoose.connect(this.ConnectionString);
    }

    public getConnectionDB(): Promise<typeof Mongoose>{
        return this.ConnectionDB;
    }
}