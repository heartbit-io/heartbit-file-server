import express from 'express';
import FormatResponse from '../lib/FormatResponse';
import { HttpCode } from '../util/httpCode';

const router = express.Router();

router.get('/', async (_req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    return res
      .status(HttpCode.OK)
      .json(
        new FormatResponse(true, HttpCode.OK, 'Service available', healthcheck)
      );
  } catch (error) {
    res
      .status(HttpCode.SERVICE_UNAVAILABLE)
      .json(
        new FormatResponse(false, HttpCode.SERVICE_UNAVAILABLE, error, null)
      );
  }
});

export { router as healthcheck };
