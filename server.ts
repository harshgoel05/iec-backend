import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { config } from "dotenv";
import rateLimit from "express-rate-limit";
import { initDbClient } from "./api/utils/database";
import registrationsController from "./api/registrations/registrations-controller";
async function createServer() {
  /************************************************
                    Initialize server
  *************************************************/
  config();
  await initDbClient();
  const app = express();
  app.use(cors());

  app.use(bodyParser.json());

  app.use(
    rateLimit({
      max: Number(process.env.RATE_LIMIT_MAX || 600),
      handler: (req, res) => {
        res.status(429).json({
          messsage: "Too many requests! We've blocked for IP for a while",
        });
      },
    })
  );

  /************************************************
                    Mount Routes
  *************************************************/

  app.use("/api/v1/", registrationsController());

  /************************************************
                    Start server
  *************************************************/
  app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port", process.env.PORT || 3000);
  });
}

createServer();
