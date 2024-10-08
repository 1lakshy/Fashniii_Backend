// const { category } = require("../../frontend/src/assets/category");

class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search() {
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }
  searchCategory() {
    const keyword = this.queryStr.keyword
      ? {
          category: {
            $regex: this.queryStr.keyword,
            $options: 'i',
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    // const queryCopy = this.query;     ese nahi likh sakte ha kyu ki this.query ek object ha and JS me object ka sirf refrence milta ha ese so
    const queryCopy = { ...this.queryStr };
    const removeFields = ['keyword', 'page', 'limit'];

    removeFields.forEach((key) => delete queryCopy[key]);

    var queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination(resultPerPage){
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resultPerPage*(currentPage-1);
    this.query = this.query.limit(resultPerPage).skip(skip);
    return this
  }
}

module.exports = ApiFeatures;
