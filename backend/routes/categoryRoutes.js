import express from "express";
const categoryRouter = express.Router();
import {
    getAllCategories,
    addCategories,
    getServicesByCategory
} from "../controllers/categoryController.js"
import protect from "../middleware/authMiddleWare.js";

categoryRouter.post("/", addCategories )
categoryRouter.get("/", getAllCategories )
categoryRouter.get("/:slug", getServicesByCategory)

export default categoryRouter