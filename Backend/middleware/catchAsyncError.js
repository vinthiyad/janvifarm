module.exports = func => (req,res,next) =>
     Promise.resolve(func(req,res,next)).catch(next)
// actually it is return as there is  no {} it return default