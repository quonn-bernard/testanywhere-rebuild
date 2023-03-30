import express from "express";
const userRouter = express.Router();
import {
  registerUser,
  loginUser,
  deleteUser,
  handlePWResetRequest,
  updateUserPassword,
} from "../controllers/userController.js";
//
//

userRouter.get("/", (req, res) => {
  res.status(200).json({ message: "users hit" });
});
userRouter.post("/user-registration", registerUser);
userRouter.post("/", loginUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/password-reset-request", handlePWResetRequest);
userRouter.put("/password-update/:requestId", updateUserPassword);

export default userRouter;
