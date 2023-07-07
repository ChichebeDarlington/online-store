import slugify from "slugify";
import Category from "../model/categoryModel.js";

export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      return res.status(500).json({
        success: false,
        msg: "Category name is required",
      });
    }
    const categoryExist = await Category.findOne({ name });
    if (categoryExist) {
      return res.status(500).json({
        success: true,
        msg: "Category name already in use",
      });
    }
    const category = new Category({ name, slug: slugify(name) });
    await category.save();
    return res.status(201).json({
      success: true,
      msg: "Category created",
      category,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      msg: "Error in category creation",
    });
  }
};

export const updateCategory = async (req, res) => {
  const { name } = req.body;
  const { _id } = req.params;

  try {
    const category = await Category.findByIdAndUpdate(
      _id,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, msg: "Category updated", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Error while updating category" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const category = await Category.find({});
    return res
      .status(200)
      .json({ success: true, msg: "Fetched category", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, error: "Error while fetching category" });
  }
};

export const getSingleCategory = async (req, res) => {
  const { slug } = req.params;
  try {
    const category = await Category.findOne({ slug });
    return res
      .status(200)
      .json({ success: true, msg: "Fetched single category", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Error while fetching single category" });
  }
};

export const deleteCategory = async (req, res) => {
  const { _id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(_id);
    return res
      .status(200)
      .json({ success: true, msg: "Category deleted", category });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Error while deleting single category" });
  }
};
