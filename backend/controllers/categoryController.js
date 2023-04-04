import asyncHandler from "express-async-handler";
import {
  getAllCategoriesService,
  createCategoryService
} from "../services/categoryService.js";

const getAllCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await getAllCategoriesService();
    res.status(200).json(categories);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const addCategories = asyncHandler(async (req, res) => {
  if (!req.body.name || !req.body.slug)
    res
      .status(400)
      .json({ message: `Add category request is missing required fields!` });

  try {
    const category = await createCategoryService(req.body);
    res.status(200).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { getAllCategories, addCategories };
