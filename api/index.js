const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');


const secretkey = "kfvishvgffhsddgetsstss";

// Schema Model for mongoDB..
const User = require("./models/User");
const Project = require("./models/Project");
const Task = require("./models/Task");
// middleware..
app.use(express.json());
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
app.use(cookieParser());

// connecting to database...
// mongoose.connect("mongodb://localhost:27017/ProjectManager");
const connectDb = async () => {
    await mongoose.connect("mongodb+srv://vishvamitrakumarsingh:vishu2000@cluster0.mp4pi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(() => console.log("Db is connected!"));
};
connectDb();

app.post('/register', async (req, res) => {
    const { email, userName, password } = req.body;
    try {
        const userDoc = await User.create({
            email, userName, password,
        });
        res.json(userDoc);
    } catch (e) {
        res.json(400).json(e);
    }
});

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email, password });
    if (userDoc) {
        jwt.sign({ userName: userDoc.userName, id: userDoc._id, email: userDoc.email }, secretkey, {}, async (err, token) => {
            if (err) {
                console.log(err);
            }
            else {
                res.cookie('token', token).json({ userName: userDoc.userName, id: userDoc._id, email: userDoc.email });
            };
        });
    } else {
        res.status(400).json("Wrong Credential!");
    }
});

app.get("/profile", (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretkey, {}, async (err, userDoc) => {
            if (err) throw err;
            res.json(userDoc);
        })
    } else {
        res.json(null);
    }
});

app.post("/addproject", async (req, res) => {
    const { projectName, projectDescription } = req.body;
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretkey, {}, async (err, user) => {
            if (err) throw err;
            const projectDoc = await Project.create({
                userId: user.id, projectName, projectDescription,
            });
            if (projectDoc) res.json(projectDoc);
        })
    }
    else res.json(null);
});

app.get("/fetchproject", async (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, secretkey, {}, async (err, user) => {
            if (err) throw err;
            const userId = user.id;
            const projects = await Project.find({ userId: userId });
            res.json(projects);
        });
    } else {
        res.status(400).json("first login!");
    }
});


app.delete("/deleteproject/:id", async (req, res) => {
    const id = req.params.id;
    try {
        const userDoc = await Project.findOne({ _id: id });
        const data = await Project.deleteOne({ _id: id });
        await Task.deleteMany({projectId : id});
        if (data.deletedCount === 1) {
            res.json(userDoc);
        }
    } catch (e) {
        res.json(e);
    }
});

app.get("/fetchtask/:projectid", async (req, res) => {
    const projectId = req.params.projectid;
    try {
        const projectDoc = await Project.findOne({ _id: projectId });
        const tasks = await Task.find({ projectId: projectId });
        res.json({ tasks, projectName: projectDoc.projectName });
    } catch (e) {
        res.status(400).json(e);
    }
})

app.post("/addtask/:projectid", async (req, res) => {
    const projectId = req.params.projectid;
    const { taskName, taskDescription, taskStatus, taskTags, taskDueDate, taskAssignedUser } = req.body;
    try {
        const taskDoc = await Task.create({ projectId, taskName, taskDescription, taskStatus, taskTags, taskDueDate, taskAssignedUser });
        if (taskDoc) res.json(taskDoc);
        else res.json(null);
    } catch (e) {
        res.status(400).json(e);
    }
});


app.delete("/deletetask/:taskid", async (req, res) => {
    const taskId = req.params.taskid;
    try {
        const taskDoc = await Task.findOne({ _id: taskId });
        await Task.deleteOne({ _id: taskId });
        res.json(taskDoc);
    } catch (e) {
        res.status(400).json(e);
    }
})

app.get("/alltasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (e) {
        res.status(400).json(e);
    }
});


app.post("/logout" , (req , res)=>{
    res.cookie('token' , '').json("ok");
})




app.listen(4000, () => {
    console.log("server is running on 4000 port!");
});
