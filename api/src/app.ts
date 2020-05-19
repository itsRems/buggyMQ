import express, { Application } from 'express';
import { initEventManager } from "./eventManager";

import router from './router';

function initApplication(): Application {
  const app = express();
  app.use('/', router);
  return app;
}

const port = 3500;

const start: Function = async () => {
  // Initialize the EventManager
  try {
    const manager = await initEventManager();
    const app = initApplication();
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit();
  }
}

start();