import express from "express";
const serviceRouter = express.Router();
import {
  addServices,
  getAllServices,
  getServiceBySlug,
  getServicesBySearchTerm,
  getServicesByCategory
} from "../controllers/serviceController.js";
// import protect from "../middleware/authMiddleWare.js";

serviceRouter.post("/", addServices);
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:slug", getServiceBySlug);
serviceRouter.get("/search/:searchTerm", getServicesBySearchTerm);
serviceRouter.get("/categories/:category", getServicesByCategory)

export default serviceRouter;
