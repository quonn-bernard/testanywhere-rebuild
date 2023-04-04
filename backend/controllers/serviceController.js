import asyncHandler from "express-async-handler";
import {
  createServiceService,
  getAllServicesService,
  getServiceBySlugService,
  getServicesBySearchTermService,
  getServicesByCategoryService,
} from "../services/serviceService.js";

const addServices = asyncHandler(async (req, res) => {
  try {
    const service = await createServiceService(req.body);
    res.status(200).json(service);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getAllServices = asyncHandler(async (req, res) => {
  try {
    const services = await getAllServicesService();
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getServiceBySlug = asyncHandler(async (req, res) => {
  const slug = req.params.slug;
  try {
    const service = await getServiceBySlugService(slug);
    res.status(200).json(service);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

const getServicesBySearchTerm = asyncHandler(async (req, res) => {
  const searchTerm = req.params.searchTerm;
  try {
    const services = await getServicesBySearchTermService(searchTerm);
    res.status(200).json(services);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

const getServicesByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category;
  try {
    const services = await getServicesByCategoryService(category);
    res.status(200).json(services);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export {
  addServices,
  getAllServices,
  getServiceBySlug,
  getServicesBySearchTerm,
  getServicesByCategory,
};
