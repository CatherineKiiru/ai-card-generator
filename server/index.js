import express from "express";
import cors from "cors";
import openaiRoutes from "./routes/OpenaiRoutes.js";

const app = express();

const port = process.env.PORT || 5000;

// app.use(cors());
app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/openai", openaiRoutes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

//fix cors issue
