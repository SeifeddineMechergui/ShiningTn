const categoryModel = require('../../models/categoryModel');
const { responseReturn } = require('../../utiles/response');
const cloudinary = require('cloudinary').v2;
const formidable = require('formidable');

class categoryController {

    add_category = async (req, res) => {
        const form = formidable();
        form.parse(req, async (err, fields, files) => {
            if (err) {
                return responseReturn(res, 404, { error: 'Something went wrong' });
            }

            let { name, subCat } = fields;  // Get subCat from fields
            let { image } = files;
            name = name.trim();
            subCat = subCat ? subCat.trim() : '';  // Trim subCat if provided
            const slug = name.split(' ').join('-');

            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            });

            try {
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'categorys' });

                if (result) {
                    const category = await categoryModel.create({
                        name,
                        slug,
                        image: result.url,
                        subCat  // Include subCat when creating the category
                    });
                    responseReturn(res, 201, { category, message: 'Category added successfully' });
                } else {
                    responseReturn(res, 404, { error: 'Image upload failed' });
                }
            } catch (error) {
                console.error(error);
                responseReturn(res, 500, { error: 'Internal server error' });
            }
        });
    }

    get_category = async (req, res) => {
        const { page, searchValue, parPage } = req.query;
        try {
            let skipPage = '';
            if (parPage && page) {
                skipPage = parseInt(parPage) * (parseInt(page) - 1);
            }

            let query = {};
            if (searchValue) {
                query = { $text: { $search: searchValue } };
            }

            const categorys = await categoryModel.find(query).skip(skipPage).limit(parPage).sort({ createdAt: -1 });
            const totalCategory = await categoryModel.find(query).countDocuments();
            responseReturn(res, 200, { totalCategory, categorys });
        } catch (error) {
            console.error(error.message);
            responseReturn(res, 500, { error: 'Internal server error' });
        }
    }
}

module.exports = new categoryController();
