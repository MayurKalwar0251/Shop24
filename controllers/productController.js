import slugify from "slugify";
import { productModel } from "../models/productModel.js";
import { v2 } from "cloudinary";
v2.config({
  cloud_name: "dfiw6zwz0",
  api_key: "144523521517367",
  api_secret: "h1vXSiyhro1GbLNXA4cru6SHOFY",
});

export const createProduct = async (req, res) => {
  try {
    const files = req.files.photo;
    const { name, description, price, category, shipping, stock } = req.body;
    const existingProduct = await productModel.findOne({ name, category });

    if (existingProduct) {
      return res.status(200).json({
        success: false,
        message: "Product already exists",
      });
    }
    var imageURL;
    await v2.uploader.upload(files.tempFilePath, async (err, result) => {
      console.log(result);
      imageURL = result.url;

      const product = await productModel.create({
        name: name.toUpperCase(),
        description,
        slug: slugify(name),
        price,
        category,
        imageUrl: imageURL,
        user: req.user._id,
        stock,
        shipping,
      });

      res.status(200).json({
        success: true,
        message: "Product created successfully",
        product,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const totalProductCount = async (req, res) => {
  try {
    const total = await productModel.find({}).estimatedDocumentCount();

    res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    let query = productModel.find({});

    let page = req.query.page ? req.query.page : 1;

    // Fetch products
    const product = await query
      .limit(6)
      .populate("category")
      .skip((page - 1) * process.env.PRODUCT_PER_PAGE)
      .sort({ createdAt: -1 });

    const totalProductCount = product.length;

    res.status(200).json({
      success: true,
      totalProductCount,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const getProductByPage = async (req, res) => {
  try {
    const productPerPage = process.env.PRODUCT_PER_PAGE;
    const page = req.query.page ? req.query.page : 1;

    let query = productModel.find({});

    // Convert comma-separated string of category IDs into an array
    const categoryIds = req.query.category ? req.query.category.split(",") : [];

    // Apply filters
    if (categoryIds.length > 0) {
      query = query.where("category").in(categoryIds);
    }

    if (req.query.minPrice) {
      query = query.where("price").gte(req.query.minPrice);
    } else {
      query = query.where("price").gte(0);
    }

    if (req.query.maxPrice) {
      query = query.where("price").lte(req.query.maxPrice);
    } else {
      query = query.where("price").lte(10000);
    }
    // Fetch products for the specified page
    const products = await query
      .populate("category")
      .sort({ createdAt: -1 })
      .skip((page - 1) * productPerPage)
      .limit(productPerPage);

    const totalProductCount = await productModel.countDocuments(query);

    res.status(200).json({
      success: true,
      totalProductCount,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

// export const getAllProducts = async (req, res) => {
//   try {
//     const product = await productModel
//       .find({})
//       .limit(6)
//       .populate("category")
//       .sort({ createdAt: -1 });

//     const totalProductCount = product.length;

//     res.status(200).json({
//       success: true,
//       totalProductCount,
//       product,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

// export const getProductByPage = async (req, res) => {
//   try {
//     const productPerPage = 6;
//     const page = req.params.page ? req.params.page : 1;
//     const products = await productModel
//       .find({})
//       .populate("category")
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * productPerPage)
//       .limit(productPerPage);

//     const totalProductCount = products.length;

//     res.status(200).json({
//       success: true,
//       totalProductCount,
//       products,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong",
//     });
//   }
// };

export const getSingleProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const product = await productModel.findById(pid).populate("category");
    if (!product) {
      return res.status(200).json({
        success: false,
        message: "Product Not Found",
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { pid } = req.params;
    const { name, description, price, category, quantity, shipping } = req.body;

    let existingProduct = await productModel.findById(pid);

    if (!existingProduct) {
      return res.status(200).json({
        success: false,
        message: "Product doesn't exists",
      });
    }

    const product = await productModel.findByIdAndUpdate(
      pid,
      {
        name: name.toLowerCase(),
        slug: slugify(name),
        description,
        price,
        category,
        stock: quantity,
        shipping,
        user: req.user._id,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Product Updated",
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const updateProductImage = async (req, res) => {
  try {
    const { pid } = req.params;

    const existingProduct = await productModel.findById(pid);
    if (!existingProduct) {
      return res.status(200).json({
        success: false,
        message: "Product doesn't exists",
      });
    }

    const file = req.files.photo;
    v2.uploader.upload(file.tempFilePath, (err, result) => {
      existingProduct.imageUrl = result.url;
      existingProduct.save();

      res.status(200).json({
        success: true,
        message: "Image updated successfully",
        product: existingProduct,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      existingProduct,
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.params;

    const product = await productModel.findById(pid);

    if (!product) {
      return res.status(200).json({
        success: false,
        message: "Product doesn't exists",
      });
    }

    await productModel.findByIdAndDelete(pid);

    res.status(200).json({
      success: true,
      message: "Product deleted Successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    const productPerPage = 6;

    const args = {};

    if (checked.length > 0) {
      args.category = checked;
    }
    if (radio.length) {
      args.price = {
        $gte: radio[0],
        $lte: radio[1],
      };
    }

    const products = await productModel
      .find(args)
      .sort({ createdAt: -1 })
      .skip((1 - 1) * productPerPage)
      .limit(productPerPage);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};

export const searchedProducts = async (req, res) => {
  const { keyword } = req.params;
  const products = await productModel.find({
    $or: [
      {
        name: { $regex: keyword, $options: "i" },
      },
    ],
  });

  res.status(200).json({
    success: true,
    totalProducts: products.length,
    products,
  });
};
