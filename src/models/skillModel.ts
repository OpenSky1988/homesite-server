import { Document, Schema } from 'mongoose';
import mongoose from 'mongoose';

interface ISkill {
    _id: Number;
    description: String;
    id: String;
    img: String;
    name: String;
};

type SkillType = ISkill & Document;

const SkillSchema = new Schema({
    description: { type: String, required: true },
    id: { type: String, required: true },
    img: { type: String, required: true },
    name: { type: String, required: true },
}, {
    timestamps: true
});

const skillModel = mongoose.model('SkillModel', SkillSchema);

export { ISkill, SkillType};
export default skillModel;