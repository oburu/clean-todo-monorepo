import express from 'express';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import YAML from 'yamljs';
import dotenv from 'dotenv';
import path from 'path';
import { errorHandler } from './utils/errorHandler';
import { routes } from './routes';

function startApp() {
  dotenv.config({ path: path.resolve(__dirname, '../.env') });

  const app = express();
  const { PORT, API_PREFIX, API_DOCS_SUFFIX } = process.env;

  // Midlewares
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Load swagger
  const swaggerDocument = YAML.load(path.join(__dirname, 'open-api.yaml'));
  app.use(`${API_PREFIX}${API_DOCS_SUFFIX}`, swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // Routes
  app.use(API_PREFIX, routes());

  // Common Error handlers (remember, error handler at the end)
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`🌐[server]: at http://localhost:${PORT}${API_PREFIX}/todo`);
    console.log(`🚀[swagger]: at http://localhost:${PORT}${API_PREFIX}${API_DOCS_SUFFIX}`);
  });
}

startApp();
