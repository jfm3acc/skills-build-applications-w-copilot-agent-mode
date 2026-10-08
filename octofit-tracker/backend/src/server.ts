import express from 'express';
import type { ErrorRequestHandler, RequestHandler } from 'express';
import cors from 'cors';
import db from './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';
const frontendOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(codespaceName ? [`https://${codespaceName}-5173.app.github.dev`] : []),
];

app.use(cors({ origin: frontendOrigins }));
app.use(express.json());

function list(records: () => Promise<unknown>): RequestHandler {
  return async (_request, response, next) => {
    try {
      response.json(await records());
    } catch (error) {
      next(error);
    }
  };
}

app.get('/api/health', (_request, response) => {
  const connected = db.readyState === 1;
  response.status(connected ? 200 : 503).json({
    status: connected ? 'ok' : 'unavailable',
    database: connected ? 'connected' : 'disconnected',
  });
});

app.get('/api/users/', list(async () => User.find().lean()));
app.get('/api/teams/', list(async () => Team.find().lean()));
app.get('/api/activities/', list(async () => Activity.find().lean()));
app.get('/api/leaderboard/', list(async () => Leaderboard.find().lean()));
app.get('/api/workouts/', list(async () => Workout.find().lean()));

const handleError: ErrorRequestHandler = (_error, _request, response, _next) => {
  response.status(500).json({ error: 'Internal server error' });
};

app.use(handleError);

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
});