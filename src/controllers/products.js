import createHttpError from 'http-errors';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from '../services/products.js';
import { parseSortParams } from '../utils/parseSortParams.js';

export const getAllProductsControler = async (req, res) => {
  console.log(req.query);
  const { sortOrder, sortBy } = parseSortParams(req.query);

  const response = await getAllProducts({
    sortOrder,
    sortBy,
    userId: req.user._id,
  });
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: response,
  });
};

export const getProductByIdController = async (req, res, _next) => {
  const { productId } = req.params;
  const response = await getProductById({
    _id: productId,
    userId: req.user._id,
  });
  if (!response) {
    throw createHttpError(404, 'Product not found');
  }

  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: response,
  });
};

export const addProductController = async (req, res) => {
  const product = await addProduct({ ...req.body, userId: req.user._id });
  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: product,
  });
};

export const updateProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await updateProduct(
    { _id: productId, userId: req.user._id },
    req.body,
  );

  if (product === null) {
    throw createHttpError(404, 'Product not found');
  }

  res.json({
    status: 200,
    message: 'Successfully updated a product',
    data: product,
  });
};

export const deleteProductController = async (req, res) => {
  const { productId } = req.params;
  const product = await deleteProduct({ _id: productId, userId: req.user._id });
  if (!product) {
    throw createHttpError(404, 'Product not Found');
  }
  res.status(204).send();
};
