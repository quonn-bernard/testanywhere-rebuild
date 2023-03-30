class InvalidObjectIDException extends Error {
    constructor(message){
        super(message);
        this.name = "InvalidObjectIDException"
    }
}

export{
    InvalidObjectIDException
}