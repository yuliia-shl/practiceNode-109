import { ProductModel } from '../db/models/Product.js';

export const getAllProducts = async () => {
  return await ProductModel.find();
};
