const formidable = require('formidable')
const cloudinary = require('cloudinary').v2
const productModel = require('../../models/productModel');
const { responseReturn } = require('../../utiles/response');
class productController {
    add_product = async (req, res) => {
        const { id } = req;
        const form = formidable({ multiples: true })

        form.parse(req, async (err, field, files) => {
            let { name, category, description, stock, price, discount, shopName, brand } = field;
            const { images } = files;
            name = name.trim()
            const slug = name.split(' ').join('-')

            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })

            try {
                let allImageUrl = [];

                for (let i = 0; i < images.length; i++) {
                    const result = await cloudinary.uploader.upload(images[i].filepath, { folder: 'products' })
                    allImageUrl = [...allImageUrl, result.url]
                }

                await productModel.create({
                    sellerId: id,
                    name,
                    slug,
                    shopName,
                    category: category.trim(),
                    description: description.trim(),
                    stock: parseInt(stock),
                    price: parseInt(price),
                    discount: parseInt(discount),
                    images: allImageUrl,
                    brand: brand.trim()

                })
                responseReturn(res, 201, { message: "product add success" })
            } catch (error) {
                responseReturn(res, 500, { error: error.message })
            }

        })
    }
    products_get = async (req, res) => {
        let { page, searchValue, parPage } = req.query;
        let { id, role } = req; // Assumes `id` and `role` are provided in the request
    
        page = parseInt(page);
        parPage = parseInt(parPage);
        const skipPage = parPage * (page - 1);
    
        try {
            let query = {};
    
            // If the user is a seller, filter products by their seller ID
            if (role === 'seller') {
                query.sellerId = id;
            }
    
            if (searchValue) {
                query.$text = { $search: searchValue }; // Add text search if searchValue is provided
            }
    
            let products = await productModel.find(query).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
            let totalProduct = await productModel.countDocuments(query);
    
            responseReturn(res, 200, { totalProduct, products });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'An error occurred while fetching products.' });
        }
    };
    
    product_get = async (req, res) => {
        let { productId } = req.params;
        let { id, role } = req; // Assumes `id` and `role` are provided in the request
    
        try {
            let product = await productModel.findById(productId);
    
            if (!product) {
                return responseReturn(res, 404, { error: 'Product not found.' });
            }
    
            // If the user is a seller, check if the product belongs to them
            if (role === 'seller' && product.sellerId.toString() !== id) {
                return responseReturn(res, 403, { error: 'You do not have permission to access this product.' });
            }
    
            responseReturn(res, 200, { product });
        } catch (error) {
            console.log(error.message);
            responseReturn(res, 500, { error: 'An error occurred while fetching the product.' });
        }
    };
    
    product_update = async (req, res) => {
        let { name, description, discount, price, brand, productId, stock } = req.body;
        name = name.trim()
        const slug = name.split(' ').join('-')
        try {
            await productModel.findByIdAndUpdate(productId, {
                name, description, discount, price, brand, productId, stock, slug
            })
            const product = await productModel.findById(productId)
            responseReturn(res, 200, { product, message: 'product update success' })
        } catch (error) {
            responseReturn(res, 500, { error: error.message })
        }
    }
    product_image_update = async (req, res) => {
        const form = formidable({ multiples: true })

        form.parse(req, async (err, field, files) => {
            const { productId, oldImage } = field;
            const { newImage } = files

            if (err) {
                responseReturn(res, 404, { error: err.message })
            } else {
                try {
                    cloudinary.config({
                        cloud_name: process.env.cloud_name,
                        api_key: process.env.api_key,
                        api_secret: process.env.api_secret,
                        secure: true
                    })
                    const result = await cloudinary.uploader.upload(newImage.filepath, { folder: 'products' })

                    if (result) {
                        let { images } = await productModel.findById(productId)
                        const index = images.findIndex(img => img === oldImage)
                        images[index] = result.url;

                        await productModel.findByIdAndUpdate(productId, {
                            images
                        })

                        const product = await productModel.findById(productId)
                        responseReturn(res, 200, { product, message: 'product image update success' })
                    } else {
                        responseReturn(res, 404, { error: 'image upload failed' })
                    }
                } catch (error) {
                    responseReturn(res, 404, { error: error.message })
                }
            }
        })
    }
}

module.exports = new productController()