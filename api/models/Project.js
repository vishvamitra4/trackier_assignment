const mongoose = require('mongoose');
const {Schema , model} = mongoose;

const ProjectSchema = new Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    projectName : {
        type : String,
        require : true
    },
    projectDescription : {
        type : String,
    }
} , {timestamps : true});

const projectModel = model('Project' , ProjectSchema);
module.exports = projectModel;