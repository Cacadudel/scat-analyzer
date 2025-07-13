import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import scatRoutes from "./routes/scatRoutes.js"

const app=express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/scat", scatRoutes);
// basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Book service listening on port ${port}`));