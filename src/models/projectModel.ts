import { Document, Schema } from 'mongoose';
const mongoose = require('mongoose');

interface IProject {
    _id: number;
    id: string | null;
    img: string;
    longDescription: string;
    name: string;
    shortDescription: string;
    skills: string;
};

type ProjectType = IProject & Document;

const ProjectSchema = new Schema({
    id: { type: String, required: true },
    img: { type: String, required: true },
    longDescription: { type: String, required: true },
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    skills: { type: String, required: true },
}, {
    timestamps: true
});

const projectModel = mongoose.model('Project', ProjectSchema);

export { IProject, ProjectType };
module.exports = projectModel;