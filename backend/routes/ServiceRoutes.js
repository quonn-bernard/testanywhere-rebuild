import express from "express";
const serviceRouter = express.Router();
import {
  addServices,
  getAllServices,
  getServiceBySlug,
  getServicesBySearchTerm,
} from "../controllers/serviceController.js";
import protect from "../middleware/authMiddleWare.js";

serviceRouter.post("/", addServices);
serviceRouter.get("/", getAllServices);
serviceRouter.get("/:slug", getServiceBySlug);
serviceRouter.get("/search/:searchTerm", getServicesBySearchTerm);

export default serviceRouter;
