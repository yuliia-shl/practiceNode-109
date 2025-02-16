import { SORT_ORDER } from '../constants/index.js';
import { ProductModel } from '../db/models/Product.js';

export const getAllProducts = async ({
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  userId,
}) => {
  return await ProductModel.find({ userId }).sort({ [sortBy]: sortOrder });
};
export const getProductById = async (filter) => {
  return await ProductModel.findOne(filter);
};

export const addProduct = async (payload) => {
  return await ProductModel.create(payload);
};

export const updateProduct = async (filter, body) => {
  return await ProductModel.findOneAndUpdate(filter, body, {
    new: true,
  });
};

export const deleteProduct = async (filter) => {
  const product = await ProductModel.findOneAndDelete(filter);
  return product;
};
