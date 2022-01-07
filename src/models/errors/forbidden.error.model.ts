export default class ForbiddenError extends Error {

    constructor(
        public mensagem: string,
        public error?: any
     ) {
         super(mensagem);
     }
}