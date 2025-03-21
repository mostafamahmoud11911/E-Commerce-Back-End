import {model, Schema} from "mongoose";


const schema = new Schema({
    name: {
        type: String,
        required: [true, "Subcategory name is required"],
    },
    slug: {
        type: String,
        required: [true, "Subcategory slug is required"],
        lowercase: true
    },
    category: {
        type: Schema.ObjectId,
        ref: "Category"
    },
    createdBy: {
        type: Schema.ObjectId,
        ref: "User",
      },
},{
    timestamps: true,
    versionKey: false
});


const Subcategory = model('SubCategory', schema);

export default Subcategory;