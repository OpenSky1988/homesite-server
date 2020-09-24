import express from 'express';
import * as projectController from '../controllers/projectController';

const projectRouter = express.Router();

projectRouter.post('/', projectController.createProject);
projectRouter.get('/list', projectController.getProjects);
projectRouter.put('/:id', projectController.udateProject);
projectRouter.delete('/:id', projectController.deleteProject);
projectRouter.get('/:id', projectController.getProjectById);

export default projectRouter;
