class ExpressError extends Error{
    constructor (statusCode,code="SERVER_ERROR",message,errors=null){
        super(message);
        this.statusCode = statusCode;
        this.code = code;
        this.errors = errors;

        Error.captureStackTrace(this, this.constructor);
    }

}
module.exports=ExpressError;