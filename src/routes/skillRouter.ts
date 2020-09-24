import express from 'express';
import * as skillController from '../controllers/skillController';

const skillRouter = express.Router();

skillRouter.post('/', skillController.createSkill);
skillRouter.get('/list', skillController.getSkills);
skillRouter.put('/:id', skillController.udateSkill);
skillRouter.delete('/:id', skillController.deleteSkill);
skillRouter.get('/:id', skillController.getSkillById);

export default skillRouter;
