import express from "express";
import connectToDB from "./config/db.js";
const app = express();
import errorHandler from "./middleware/errorHandler.js";
import path from "path";
import * as dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/userRoutes.js";
import categoryRouter from "./routes/categoryRoutes.js";
import { fileURLToPath } from 'url';

const PORT = process.env.PORT;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectToDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/categories', categoryRouter)
app.use("/users", userRouter);

// Serve frontend site
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/build')));

    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
  }

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
