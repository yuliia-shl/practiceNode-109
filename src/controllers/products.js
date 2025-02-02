import createHttpError from 'http-errors';
import {
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from '../services/products.js';

export const getAllProductsControler = async (req, res) => {
  const response = await getAllProducts();
  res.json({
    status: 200,
    message: 'Successfully found products!',
    data: response,
  });
};

export const getProductByIdController = async (req, res, _next) => {
  const { productId } = req.params;
  const response = await getProductById(productId);
  if (!response) {
    res.status(404).json({
      status: 404,
      message: 'Product not found',
    });
    return;
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully found products!',
    data: response,
  });
};

export const addProductController = async (req, res) => {
  const product = await addProduct(req.body);
  res.status(201).json({
    status: 201,
    message: `Successfully created a product!`,
    data: product,
  });
};

export const updateProductController = async (req, res, next) => {
  const { productId } = req.params;
  const product = await updateProduct(productId, req.body);

  if (product === null) {
    next(createHttpError(404, 'Product not found'));
    return;
  }

  res.json({
    status: 200,
    message: 'Successfully updated a product',
    data: product,
  });
};
