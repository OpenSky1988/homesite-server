import express from 'express';
import  {
    createProject,
    deleteProject,
    getProjectById,
    getProjects,
    updateProject,
} from '../controllers/projectController';
import withAuth from '../middleware/index';

const projectRouter = express.Router();

projectRouter.post('/', withAuth, createProject);
projectRouter.get('/list', getProjects);
projectRouter.put('/:id', withAuth, updateProject);
projectRouter.delete('/:id', withAuth, deleteProject);
projectRouter.get('/:id', getProjectById);

export default projectRouter;
