import asyncHandler from "express-async-handler";
import Category from "../models/categoryModel.js";
import Service from "../models/serviceModel.js";
import { ResourceRetrievalError, ResourceCreationError } from "../utils/customErrors/generalErrors.js";

const getAllCategoriesService = asyncHandler(async () => {
  try {
    return await Category.find();
  } catch (error) {
    throw new ResourceRetrievalError(`Error while retrieving list of categories!`);
  }
});

const createCategoryService = asyncHandler(async ({name, slug}) => {
  try {
    return await Category.create({
      name: name,
      slug: slug,
    });
  } catch (error) {
    throw new ResourceCreationError(`Error while creating new category: Invalid category name or slug!`);
  }
});

export {
  getAllCategoriesService,
  createCategoryService
};
