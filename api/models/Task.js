const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    projectId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project"
    },
    taskName : {
        type : String,
        require : true
    },
    taskDescription : {
        type : String,
        require : true,
    },
    taskStatus : {
        type : String,
        enum : ['Backlog', 'In Discussion', 'In Progress', 'Completed'],
        default : "Backlog",
        require : true,
    },
    taskTags : {
        type : String,
    },
    taskDueDate : {
        type : Date,
        default : Date.now,
    },
    taskAssignedUser : {
        type : String,
        require : true,
    }

}, { timestamps: true });

const taskModel = mongoose.model("Task" , TaskSchema);
module.exports = taskModel;