import mongoose, { model, Model, models, Schema } from "mongoose";
export const VIDEO_DIMENSION = {
    width: 1080,
    height: 1920
} as const;
// types define 
export interface IVideo {
    _id?: mongoose.Types.ObjectId;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
    controls: boolean;
    transformation?: {
        height: number;
        width: number;
        quality: number;
    };
    createdAt:Date;
    updateAt:Date;
}
// Video schema
const videoSchema = new Schema<IVideo>({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnailUrl:{
        type:String
    },
    videoUrl:{
        type:String,
        required:true
    },
    controls:{
        type:Boolean,
        default:true
    },
    transformation:{
        height:{type:Number,default: VIDEO_DIMENSION.height},
        width:{type:Number,default:VIDEO_DIMENSION.width},
        quality:{type:Number,min:1,max:100}
    }
},{timestamps:true})

// creating modle if not exist if exist retrun User schema
const Video = models?.Video || model<IVideo>('Video',videoSchema)
// export model
export default Video;