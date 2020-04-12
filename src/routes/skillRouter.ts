export {};
const express = require('express');
const skillController = require('../controllers/skillController');

const skillRouter = express.Router();

skillRouter.post('/', skillController.createSkill);
skillRouter.get('/list', skillController.getSkills);
skillRouter.put('/:id', skillController.udateSkill);
skillRouter.delete('/:id', skillController.deleteSkill);
skillRouter.get('/:id', skillController.getSkillById);

module.exports = skillRouter;
