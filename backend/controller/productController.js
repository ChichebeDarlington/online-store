import Product from "../model/productModel.js";
import fs from "fs";
import slugify from "slugify";
import braintree from "braintree";
import Order from "../model/orderModel.js";
import dotenv from "dotenv";

dotenv.config();

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.MERCHANT_ID,
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
});

export const createProduct = async (req, res) => {
  const { name, slug, description, price, category, quantity, shipping } =
    req.fields;
  const { photo } = req.files;

  if ((!name, !description, !price, !category, !quantity)) {
    return res.status(400).json({ error: "Neccessary fields are required" });
  }
  // if (photo && photo.size > 100000) {
  //   return res
  //     .status(400)
  //     .json({ error: "Photo is required should be less than 1mb" });
  // }
  try {
    const products = new Product({
      ...req.fields,
      ...req.files,
      slug: slugify(name),
    });
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    return res
      .status(201)
      .json({ success: true, msg: "Product created", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while creating product",
    });
  }
};

export const getAllProduct = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(10)
      .sort({ createdAt: -1 });
    return res.status(201).json({
      success: true,
      totalProduct: products.length,
      msg: "Fetched all products created",
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while fetching product",
    });
  }
};

export const getSingleProduct = async (req, res) => {
  const { slug } = req.params;
  try {
    const product = await Product.findOne({ slug })
      .select("-photo")
      .populate("category");
    return res.status(201).json({
      product,
      success: true,
      msg: "Fetched single product",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while fetching single product",
    });
  }
};

// single product by id
export const getSingleProductById = async (req, res) => {
  const { _id } = req.params;
  try {
    const product = await Product.findById(_id)
      .select("-photo")
      .populate("category");
    return res.status(201).json({
      product,
      success: true,
      msg: "Fetched single product",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while fetching single product",
    });
  }
};

export const productPhoto = async (req, res) => {
  try {
    const product = await Product.findById(req.params.pid).select("photo");
    if (product.photo.data) {
      res.set("Content-type", product.photo.contentType);
      return res.status(200).json(product.photo.data);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while fetching single photo",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { pid } = req.params;
  try {
    const product = await Product.findByIdAndDelete(pid);
    return res.status(200).json({ success: true, msg: "Product deleted" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while deleting product",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { name, slug, description, price, category, quantity, shipping } =
    req.fields;
  const { photo } = req.files;
  if ((!name, !description, !price, !category, !quantity)) {
    return res.status(400).json({ error: "Neccessary fields are required" });
  }
  // if (!photo && photo.size > 100000) {
  //   return res
  //     .status(400)
  //     .json({ error: "Photo is required should be less than 1mb" });
  // }
  try {
    const products = await Product.findByIdAndUpdate(
      req.params.pid,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );
    if (photo) {
      products.photo.data = fs.readFileSync(photo.path);
      products.photo.contentType = photo.type;
    }

    await products.save();
    return res
      .status(201)
      .json({ success: true, msg: "Product updated successfully", products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while creating product",
    });
  }
};

export const filterProduct = async (req, res) => {
  try {
    const { checked, radio } = req.body;
    let args = {};
    if (checked) args.category = checked;
    if (radio) args.price = { $gte: radio[0], $lte: radio[1] };
    const product = await Product.find(args);
    res.status(200).json({
      success: true,
      msg: "filtered",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while filtering product",
    });
  }
};

export const countProduct = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();

    return res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while counting product",
    });
  }
};

export const listProduct = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;
    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while listing product",
    });
  }
};

export const searchProduct = async (req, res) => {
  try {
    const { keywords } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keywords, $options: "i" } },
        { description: { $regex: keywords, $options: "i" } },
      ],
    }).select("photo");
    return res.status(200).json({ results });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while listing product",
    });
  }
};

export const relatedProduct = async (req, res) => {
  try {
    const { pid, cid } = req.params;
    const products = await Product.find({
      category: cid,
      _id: { $ne: pid },
    })
      .select("-photo")
      .limit(3)
      .populate("category");
    return res.status(200).json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Fail while listing product",
    });
  }
};

export const brainTreeToken = async (req, res) => {
  try {
    gateway.clientToken.generate({}, function (error, response) {
      if (error) {
        return res.status(500).json(error);
      } else {
        return res.status(200).json({ response });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const brainTreePayment = async (req, res) => {
  try {
    const { cart, nonce } = req.body;
    let total = 0;
    cart.map((i) => (total += i.price));
    let newTransaction = gateway.transaction.sale(
      {
        amount: total,
        paymentMethodNonce: nonce,
        options: {
          submitForSettlement: true,
        },
      },
      async function (error, result) {
        if (error) {
          return res.status(500).json(error);
        }
        if (result) {
          const order = new Order({
            product: cart,
            payment: result,
            buyer: req.user._id,
          });
          await order.save();
          return res.status(201).json({ ok: true, order });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};
