export class DatabaseError extends Error {
    
    constructor(
       public mensagem: string,
       public error?: any
    ) {
        super(mensagem);
    }
}