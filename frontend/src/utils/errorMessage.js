export const getErrorData = (error)=> {
    if(error.response && error.response.data){
        return error.response.data
    }
    return{
        success: false,
        code   :"NETWORK_ERROR",
        message:"Network error",
        errors :null,    
    };
};