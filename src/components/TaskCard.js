import React from 'react';
import { AiFillDelete } from "react-icons/ai";

const TaskCard = ({ task, deleteTask }) => {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-6">
            <div className="p-6">
                <div className='flex flex-row w-full justify-between'>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">{task.taskName}</h2>
                    <AiFillDelete className="text-3xl text-red-500 hover:text-4xl hover:text-red-800"
                        onClick={() => deleteTask(task._id)}
                    />
                </div>
                <p className="text-gray-600 mb-4">{task.taskDescription}</p>
                <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${task.taskStatus === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                            task.taskStatus === 'Completed' ? 'bg-green-100 text-green-800' :
                                task.taskStatus === 'Backlog' ? 'bg-red-100 text-red-800' :
                                    task.taskStatus === 'In Discussion' ? 'bg-blue-100 text-blue-800' :
                                        'bg-gray-100 text-gray-800'
                        }`}>
                        {task.taskStatus}
                    </span>

                </div>
                <div className="flex flex-wrap mb-4">
                    {task.taskTags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-600 mb-2"><strong>Due Date:</strong> {task.taskDueDate}</p>
                <p className="text-gray-600"><strong>Assigned User:</strong> {task.taskAssignedUser}</p>
            </div>
        </div>
    );
};

export default TaskCard;
