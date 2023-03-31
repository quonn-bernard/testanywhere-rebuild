import asyncHandler from "express-async-handler";
import Service from "../models/serviceModel.js";
import {
  ResourceCreationError,
  ResourceRetrievalError,
  InputValidationError,
} from "../utils/customErrors/generalErrors.js";

const createServiceService = asyncHandler(async (req) => {
  switch (true) {
    case !req.body.title:
      throw new InputValidationError(`Invalid input: title`);
    case !req.body.abbreviation:
      throw new InputValidationError(`Invalid input: abbreviation`);
    case !req.body.serviceDescription:
      throw new InputValidationError(`Invalid input: description`);
    case !req.body.serviceBulletpoints:
      throw new InputValidationError(`Invalid input: service bulletpoints`);
    case !req.body.faqs:
      throw new InputValidationError(`Invalid input: faqs`);
  }

  try {
    return await Service.create({
      title: req.title,
      abbreviation: req.abbreviation,
      slug: req.slug,
      serviceDescription: req.serviceDescription,
      serviceBulletpoints: req.serviceBulletpoints,
      faqs: req.faqs,
      searchTerms: req.searchTerms,
      categories: req.categories,
    });
  } catch (error) {
    throw new ResourceCreationError(
      `Error while creating ${req.title} service!`
    );
  }
});

const getAllServicesService = asyncHandler(async () => {
  try {
    return await Service.find();
  } catch (error) {
    throw new ResourceRetrievalError(
      `SOmething went wrong while retrieving services!`
    );
  }
});

const getServiceBySlugService = asyncHandler(async (slug) => {
  const service = await Service.find({ slug: slug });
  if (service.length < 1)
    throw new ResourceRetrievalError(`'${slug}' service does not exist!`);
  return service;
});

const getServicesBySearchTermService = asyncHandler(async (term) => {
  return await Service.find({
    "searchTerms.term": { $regex: term, $options: "i" },
  });
});

export {
  createServiceService,
  getAllServicesService,
  getServiceBySlugService,
  getServicesBySearchTermService,
};
