import { Request, Response } from 'express';
import stringifyObject from '../helpers/stringifyObject';
import {IProject, ProjectType } from '../models/projectModel';
import projectModel from '../models/projectModel';

type ProjectSchemaType = IProject & { save(): any; };

const createProject = (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide an project.',
        });
    }

    const project = new projectModel(body);

    if (!project) {
        return res.status(400).json({
            success: false,
            error: 'Wrong project data.',
        });
    }
    
    project
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: project._id,
                message: 'Project created!',
            });
        })
        .catch((error: Error) => {
            return res.status(400).json({
                error,
                message: `Project not created!\nError: ${stringifyObject(error)}`,
            });
        });

    // return res.status(400).json({
    //     success: false,
    //     message: 'Project not created!',
    // });
    return -1;
};

const updateProject = async (req: Request, res: Response) => {
    const body = req.body;

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        });
    }
    
    projectModel.findOne({ _id: req.params.id }, (error: Error, project: ProjectSchemaType) => {
        if (error) {
            return res.status(400).json({
                error,
                message: 'Project not found',
            })
        }

        project.id = body.id;
        project.img = body.img;
        project.longDescription = body.longDescription;
        project.name = body.name;
        project.shortDescription = body.shortDescription;
        project.skills = body.skills;
        
        project
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: project._id,
                    message: 'Project updated!',
                });
            })
            .catch((error: Error) => {
                return res.status(400).json({
                    error,
                    message: `Project not updated!\nError: ${stringifyObject(error)}`,
                });
            });

            // return res.status(400).json({
            //     success: false,
            //     message: 'Project not updated!',
            // });
            return -1;
        });
    
    // return res.status(400).json({
    //     success: false,
    //     message: 'Project not updated!',
    // });
    return -1;
};

const deleteProject = async (req: Request, res: Response) => {
    await projectModel.findOneAndDelete({ _id: req.params.id }, (error: Error, project: ProjectType) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!project) {
            return res.status(400).json({ success: false, error: 'Project not found.' });
        }

        return res.status(200).json({ success: true, payload: project });
    }).catch((error: Error) => console.log(`Unable to delete project. Error: ${stringifyObject(error)}`));
};

const getProjectById = async (req: Request, res: Response) => {
    await projectModel.findOne({ _id: req.params.id }, (error: Error, project: IProject) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!project) {
            return res.status(400).json({ success: false, error: 'Project not found.' });
        }

        return res.status(200).json({ success: true, payload: project });
    }).catch((error: Error) => console.log(`Unable to fetch project. Error: ${stringifyObject(error)}`));
};

const getProjects = async (_req: Request, res: Response) => {
    await projectModel.find({}, (error: Error, projects: IProject) => {
        if (error) {
            return res.status(400).json({ success: false, error: error });
        }

        if (!projects) {
            return res.status(400).json({ success: false, error: 'Projects not found.' });
        }

        return res.status(200).json({ success: true, payload: projects });
    }).catch((error: Error) => console.log(`Unable to fetch projects. Error: ${stringifyObject(error)}`));
};

export {
    createProject,
    deleteProject,
    getProjectById,
    getProjects,
    updateProject,
};
