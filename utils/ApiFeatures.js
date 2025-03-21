export class ApiFeatures {
  constructor(mongooseQuery, searchQuery) {
    this.mongooseQuery = mongooseQuery;
    this.searchQuery = searchQuery;
  }

  pagination() {
    let pageNumber = this.searchQuery.page * 1 || 1;
    let nextPage = pageNumber < 1 ? 1 : pageNumber + 1;
    let pagePrev = pageNumber < 1 ? 1 : pageNumber - 1;

    if (this.searchQuery.page < 1) {
      pageNumber = 1;
    }
    const limit = 5;
    this.pageNumber = pageNumber;
    this.nextPage = nextPage;
    this.pagePrev = pagePrev;
    const skip = (pageNumber - 1) * limit;
    this.mongooseQuery.skip(skip).limit(limit);
    return this;
  }

  filter() {
    let query = structuredClone(this.searchQuery);
    query = JSON.stringify(query);
    query = query.replace(/(gt|gte|lt|lte)/g, (val) => {
      return `$${val}`;
    });
    query = JSON.parse(query);
    const excludedFields = ["page", "sort", "limit", "fields", "search"];

    for (const element in query) {
      if (excludedFields.includes(element)) {
        delete query[element];
      }
    }

    this.mongooseQuery.find(query);
    return this;
  }

  sort() {
    if (this.searchQuery.sort) {
      const sortBy = this.searchQuery.sort.split(",").join(" ");
      this.mongooseQuery.sort(sortBy);
    }
    return this;
  }

  selectFields() {
    if (this.searchQuery.fields) {
      const fields = this.searchQuery.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }

  search() {
    if (this.searchQuery.search) {
      this.mongooseQuery.find({
        $or: [
          {
            name: {
              $regex: this.searchQuery.search,
              $options: "i",
            },
          },
        ],
      });
    }
    return this;
  }
}
