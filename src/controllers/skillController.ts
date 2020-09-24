import { Request, Response } from 'express';
import stringifyObject from '../helpers/stringifyObject';
import { ISkill, SkillType } from '../models/skillModel';

type SkillSchemaType = ISkill & { save(): any; };

const createSkill = (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an skill.',
        });
    }

    const skill = new skillModel(body);

    if (!skill) {
        return res.status(400).json({
            success: false,
            error: 'Wrong skill data.',
        });
    }
    
    skill
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: skill._id,
                message: 'Skill created!',
            });
        })
        .catch((error: Error) => {
            return res.status(400).json({
                error,
                message: `Skill not created!\nError: ${JSON.stringify(error, null, '  ')}`,
            });
        });

    // return res.status(400).json({
    //     success: false,
    //     message: 'Skill not created!',
    // });
    return -1;
};

const udateSkill = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    
    skillModel.findOne({ _id: req.params.id }, (error: Error, skill: SkillSchemaType) => {
        if (error) {
            return res.status(400).json({
                error,
                message: 'Skill not found',
            })
        }

        skill.description = body.description;
        skill.id = body.id;
        skill.img = body.img;
        skill.name = body.name;
        
        skill
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: skill._id,
                    message: 'Skill updated!',
                });
            })
            .catch((error: Error) => {
                return res.status(400).json({
                    error,
                    message: `Skill not updated!\nError: ${JSON.stringify(error, null, '  ')}`,
                });
            });

            // return res.status(400).json({
            //     success: false,
            //     message: 'Skill not updated!',
            // });
            return -1;
        });
    
    // return res.status(400).json({
    //     success: false,
    //     message: 'Skill not updated!',
    // });
    return -1;
};

const deleteSkill = async (req: Request, res: Response) => {
    await skillModel.findOneAndDelete({ _id: req.params.id }, (error: Error, skill: SkillType) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!skill) {
            return res.status(400).json({ success: false, error: 'Skill not found.' });
        }

        return res.status(200).json({ success: true, data: skill });
    }).catch((error: Error) => console.log(`Unable to delete skill. Error: ${JSON.stringify(error, null, '  ')}`));
};

const getSkillById = async (req: Request, res: Response) => {
    await skillModel.findOne({ _id: req.params.id }, (error: Error, skill: ISkill) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!skill) {
            return res.status(400).json({ success: false, error: 'Skill not found.' });
        }

        return res.status(200).json({ success: true, data: skill });
    }).catch((error: Error) => console.log(`Unable to fetch skill. Error: ${JSON.stringify(error, null, '  ')}`));
};

const getSkills = async (req: Request, res: Response) => {
    await skillModel.find({}, (error: Error, skills: ISkill) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!skills) {
            return res.status(400).json({ success: false, error: 'Skills not found.' });
        }

        return res.status(200).json({ success: true, data: skills });
    }).catch((error: Error) => console.log(`Unable to fetch skills. Error: ${JSON.stringify(error, null, '  ')}`));
};

export {
    createSkill,
    udateSkill,
    deleteSkill,
    getSkillById,
    getSkills
};
