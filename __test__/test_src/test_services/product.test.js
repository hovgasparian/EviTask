

  



const ProductService = require('../../../app/src/services/productService');

// Mock implementation for the Product model
const mockProductModel = {
  findAll: jest.fn().mockResolvedValue([
    { id: 1, name: 'Product 1', price: 10, description: 'Description 1', image: 'image-url-1' },
    { id: 2, name: 'Product 2', price: 20, description: 'Description 2', image: 'image-url-2' },
  ]),
  create: jest.fn().mockImplementation(data => Promise.resolve({ id: 3, ...data })),
  update: jest.fn().mockImplementation((data, options) => Promise.resolve({ id: options.where.id, ...data })),
  findOne: jest.fn().mockImplementation(options => {
    const product = { id: options.where.id, name: 'Updated Product', price: 30, description: 'Updated Description', image: 'updated-image-url' };
    return Promise.resolve(product);
  }),
  destroy: jest.fn().mockResolvedValue(1),
};

// Mock implementation for the ProductImages model
const mockProductImagesModel = {
  create: jest.fn().mockImplementation(data => Promise.resolve({ id: 1, ...data })),
};

// Mock models object
const mockModels = () => ({
  products: mockProductModel,
  productImages: mockProductImagesModel,
});

describe('ProductService', () => {
  let productService;

  beforeEach(() => {
    const models = mockModels(); 
    productService = new ProductService(models);
  });

  describe('getAll', () => {
    it('should return all products with their images', async () => {
      const products = await productService.getAll();

      expect(products).toEqual([
        { id: 1, name: 'Product 1', price: 10, description: 'Description 1', image: 'image-url-1' },
        { id: 2, name: 'Product 2', price: 20, description: 'Description 2', image: 'image-url-2' },
      ]);
    });
  });

  // describe('createProduct', () => {
  //   it('should create a new product with image', async () => {
  //     const newProduct = {
  //       name: 'Product 1',
  //       price: 10,
  //       description: 'Description 1',
  //       image: 'image-url-1'
  //     };
  //     const createdProduct = await productService.createProduct(newProduct);

  //     expect(createdProduct.name).toEqual(newProduct.name);
  //     expect(createdProduct.price).toEqual(newProduct.price);
  //     expect(createdProduct.description).toEqual(newProduct.description);
  //     expect(createdProduct.image).toEqual(newProduct.image);
  //   });
  // });
  

  // describe('update', () => {
  //   it('should update an existing product', async () => {
  //     const updatedProductData = {
  //       name: 'Updated Product',
  //       price: 20,
  //       description: 'Updated description',
  //       image: 'updated-image-url'
  //     };
  //     const updatedProduct = await productService.update(1, updatedProductData);

  //     expect(updatedProduct.name).toBe(updatedProductData.name);
  //     expect(updatedProduct.price).toBe(updatedProductData.price);
  //     expect(updatedProduct.description).toBe(updatedProductData.description);
  //     expect(updatedProduct.image).toBe(updatedProductData.image);
  //   });
  // });

  describe('remove', () => {
    it('should remove a product by id', async () => {
      const productId = 1;
      const result = await productService.remove(productId);
      // Your assertion goes here
      expect(result).toBe(1); // Assuming 1 indicates successful removal
    });
  });
});
