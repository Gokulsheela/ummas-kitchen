module.exports = (err,req,res,next)=> {
    console.log(err);

    res.status(err.statusCode || 500).json({
        success: false,
        code: err.code || "Server error",
        message: err.message || "Something went wrong",
        errors: err.errors || null

    });
};    // global error handler