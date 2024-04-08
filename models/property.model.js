import { Schema, model, models, } from "mongoose";

const propertySchema = new Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        trim: true,
        required: true,
      },
      type: {
        type: String,
        trim: true,
        required: true,
      },
      description: {
        type: String,
        trim: true,
      },
      location: {
        street: {
          type: String,
          trim: true,
        },
        city: {
          type: String,
          trim: true,
        },
        state: {
          type: String,
          trim: true,
        },
        zipcode: {
          type: String,
          trim: true,
        },
      },
      beds: {
        type: Number,
        required: true,
        trim: true,
      },
      baths: {
        type: Number,
        trim: true,
        required: true,
      },
      square_feet: {
        type: Number,
        trim: true,
        required: true,
      },
      amenities: [
        {
          type: String,
          trim: true,
        },
      ],
      rates: {
        nightly: {
          type: Number,
          trim: true,
        },
        weekly: {
          type: Number,
          trim: true,
        },
        monthly: {
          type: Number,
          trim: true,
        },
      },
      seller_info: {
        name: {
          type: String,
          trim: true,
        },
        email: {
          type: String,
          trim: true,
        },
        phone: {
          type: String,
          trim: true,
        },
      },
      images: [
        {
          type: String,
          trim: true,
        },
      ],
      is_featured: {
        type: Boolean,
        trim: true,
        default: false,
      },
}, { timestamps: true });


const Property = models.Property || model("Property", propertySchema);

export default Property;