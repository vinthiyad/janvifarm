class APIFeatures {
    constructor(query, qrystr){
        this.query = query;
        this.qrystr = qrystr;
       
    }  
      
    search(){
       
        let keyword = this.qrystr.keyword ? {
            name: {
                $regex :this.qrystr.keyword,
                $options : "i"   
            }
        }:{} ;
        this.query.find({...keyword});
       return this;
    }

    filter(){
        const querystrcopy = {...this.qrystr};
        console.log(querystrcopy);
        //remove fieldsfrom querystr
        const removefields = ['keyword','limit','page'];
        removefields.forEach(field => delete querystrcopy[field]);
        let querystr = JSON.stringify(querystrcopy);  // keep a copy for the filter
        console.log("af--",querystr);
        // adding $ symbol before the lt, lt2, gt, gte so that mango will do the search
        querystr = querystr.replace(/\b(gt|gte|lt|lte)/g, match => `$${match}`);
        console.log("afbb--",querystr);
        this.query.find(JSON.parse(querystr));  
        return this;

    }

    paginate(resperpage){
        const currentpage = Number(this.qrystr.page) || 1;
       const skip = resperpage * (currentpage -1);
        console.log('skip ----',skip)
        this.query.limit(resperpage).skip(skip); 
        return this;  
    }

}
module.exports = APIFeatures;