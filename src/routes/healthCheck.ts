import express from 'express';

const router = express.Router();

router.get('/', async (_req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  try {
    res.send(healthcheck).status(200);
  } catch (error) {
    res.status(503).send(error);
  }
});


export { router as healthcheck }
