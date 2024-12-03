const mongoose = require('mongoose');
const Joi = require('joi');

// Mongoose Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 100,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  phone: {
    type: Number,  // Phone number as a number
    required: true,
    unique: true,
  },
  message: {
    type: String,
    maxlength: 500,
  },
}, { timestamps: true });

// Joi Validation Function
function validateUser(data) {
  const schema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.number().required(),  // Phone number as a number
    message: Joi.string().max(500).optional(),
  });

  return schema.validate(data);
}

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel, validateUser };
