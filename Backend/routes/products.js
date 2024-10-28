var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
const productSchema = require('../models/product');
const { auth } = require('../middleware/auth');

// Configure multer for file storage
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'uploads/'); // Folder to save the images
    },
    filename: function(req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
  });
  
  const upload = multer({ storage: storage });


// Get all product
router.get("/products", auth, async function(req, res, next) {
    try {
      const products = await productSchema.find({});
        
      // ตรวจสอบว่ามีผลิตภัณฑ์หรือไม่
      if (!products || products.length === 0) {
        return res.status(404).json([]);
      }
      
      // สร้าง URL สำหรับ image
      const baseUrl = `${req.protocol}://${req.get('host')}/uploads/`;
      const productsWithImageUrl = products.map(product => ({
          ...product.toObject(),
          image: baseUrl + product.image // เพิ่ม URL ที่เข้าถึงได้
        })
      );
      
      res.status(200).send(productsWithImageUrl); // ส่งกลับข้อมูลผลิตภัณฑ์
    } catch (error) {
      res.status(500).send([]);
    }
});

// Get product
router.get("/products/:id", auth, async function(req, res, next) {
    const { id } = req.params;

    try {
        const product = await productSchema.findById(id);
        
        if (!product) {
            return res.status(400).json(null);
        }
        res.status(200).send(product);
    } catch (error) {
      res.status(500).send(error.message);
    }
});

// Add product
router.post('/products', auth, upload.single('image'), async function(req, res, next) {
    const { name, description, price, stock } = req.body;
    const image = req.file ? req.file.filename : ''; // Save the filename of the uploaded image
  
    try {
      const product = await productSchema.create({
        name,
        description,
        price,
        stock,
        image,
      });
  
      res.status(201).send('Create success.');
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

// Edit product
router.put('/products/:id', auth, upload.single('image'), async function(req, res, next) {
    const { id } = req.params;
    const { name, description, price, stock } = req.body;
    const image = req.file ? req.file.filename : undefined; // Check if a new image is uploaded

    const updateData = { name, description, price, stock };
    if (image) updateData.image = image; // Only update image if a new one is uploaded

    try {
        const product = await productSchema.findByIdAndUpdate(id, updateData, { new: true });

        res.status(200).send('Update success.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete product
router.delete('/products/:id', auth, async function(req, res, next) {
  const { id } = req.params;

  try {
    const deletedProduct = await productSchema.findByIdAndDelete(id);
    
    if (!deletedProduct) {
      return res.status(404).send('Product not found');
    }

    res.status(200).send('Delete success.');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;