export class AdvancedResults {
    constructor(query, queryString , defaultResultCount) {
        this.query = query
        this.queryString = queryString
        this.defaultResultCount = defaultResultCount
 
    }

    search() {
        const keyword = this.queryString.keyword ? {
            name: {
                $regex: this.queryString.keyword,
                $options: "i",
            }
        } : {};

        // console.log(keyword);

        this.query = this.query.find({ ...keyword });
        return this;
    }

    filter() {
        const queryCopy = { ...this.queryString }

        // fields to remove for category
        const removeFields = ["keyword", "page", "limit"];

        // console.log(queryCopy);
        removeFields.forEach(key => delete queryCopy[key]);
        // console.log(queryCopy);

        // price filter
        let queryString = JSON.stringify(queryCopy);
        queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`);

        // console.log(JSON.parse(queryString));

        this.query = this.query.find(JSON.parse(queryString));
        return this;
    }


    sort(){
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.query = this.query.sort(sortBy);
        }else{
            this.query = this.query.sort('-createdAt');
        }

        return this;
    }


    pagination() {
        const currentPage = Number(this.queryString.page) || 1;

     

        const skipProducts = this.defaultResultCount * (currentPage - 1);

        this.query = this.query.limit(this.defaultResultCount).skip(skipProducts);



        return this;
    }
};


export const getPaginateData = (totalResultLength , paginateCount , currentPage) =>{

    let pagination = {}

    const pages = Math.ceil( totalResultLength / paginateCount)

    pagination.pages = pages
    pagination.currentPage =Number(currentPage) || 1

    return pagination
}