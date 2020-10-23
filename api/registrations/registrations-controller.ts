import { Router, Request, Response } from "express";
import {
  getAllReg,
  getAllRegRoundWise,
  addNewApp,
  updateRound,
  getRound,
} from "./registrations-service";

async function handleGetRegAll(req: Request, res: Response) {
  try {
    const result = await getAllReg();
    res.status(200).send(result);
  } catch (err) {
    if (err.code) {
      res.status(err.code).json(err.message);
    } else
      res.status(500).json({
        message: "ERROR! Please contact +91-7519472787 [Harsh] for support",
      });
  }
}
async function handleAddReg(req: Request, res: Response) {
  try {
    const data = req.body;
    await addNewApp(data);
    res.status(200).send();
  } catch (err) {
    if (err.code) {
      res.status(err.code).json(err.message);
    } else
      res.status(500).json({
        message: "ERROR! Please contact +91-7519472787 [Harsh] for support",
      });
  }
}

async function handleGetRegRoundWise(req: Request, res: Response) {
  try {
    const { number } = req.params;
    if (!number) {
      res.status(400).json({
        message: "Round number is missing",
      });
    }
    const result = await getAllRegRoundWise(+number);
    res.status(200).send(result);
  } catch (err) {
    if (err.code) {
      res.status(err.code).json(err.message);
    } else
      res.status(500).json({
        message: "ERROR! Please contact +91-7519472787 [Harsh] for support",
      });
  }
}

async function handleUpdateRound(req: Request, res: Response) {
  try {
    const { round } = req.body;
    if (!round) {
      res.status(400).json({
        message: "Round number is missing",
      });
    }
    const result = await updateRound(round);
    res.status(200).send(result);
  } catch (err) {
    if (err.code) {
      res.status(err.code).json(err.message);
    } else
      res.status(500).json({
        message: "ERROR! Please contact +91-7519472787 [Harsh] for support",
      });
  }
}

async function handleGetCurrRound(req: Request, res: Response) {
  try {
    const result = await getRound();
    res.status(200).send(result);
  } catch (err) {
    if (err.code) {
      res.status(err.code).json(err.message);
    } else
      res.status(500).json({
        message: "ERROR! Please contact +91-7519472787 [Harsh] for support",
      });
  }
}

export default function registrationsController() {
  const router = Router();
  router.get("/", handleGetRegAll);
  router.post("/", handleAddReg);
  router.get("/round/:number", handleGetRegRoundWise);
  router.post("/updateround", handleUpdateRound);
  router.get("/cround", handleGetCurrRound);
  return router;
}
