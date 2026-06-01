export const handleApiError = (error)=> {
   if  (!error.response){
        return {
            message: "NETWORK ERROR",
            code: "NETWORK_ERROR"
        };
    }
    const {status, data} = error.response;
    
    return {
        message: data?.message || "Something went wrong",
        code: data?.code || "UNKNOWN_ERROR",
        status,
    }
}