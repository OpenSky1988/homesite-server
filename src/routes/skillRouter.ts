import express from 'express';
import {
    createSkill,
    deleteSkill,
    getSkillById,
    getSkills,
    updateSkill,
} from '../controllers/skillController';
import withAuth from '../middleware/index';

const skillRouter = express.Router();

skillRouter.post('/', withAuth, createSkill);
skillRouter.get('/list', withAuth, getSkills);
skillRouter.put('/:id', withAuth, updateSkill);
skillRouter.delete('/:id', withAuth, deleteSkill);
skillRouter.get('/:id', withAuth, getSkillById);

export default skillRouter;
