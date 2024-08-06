import React from 'react';

const TaskCard = ({ task }) => {
    return (
        <div className="max-w-lg mx-auto bg-white shadow-lg rounded-lg overflow-hidden my-6">
            <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">{task.name}</h2>
                <p className="text-gray-600 mb-4">{task.description}</p>
                <div className="mb-4">
                    <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full ${
                        task.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : 
                        task.status === 'Done' ? 'bg-green-100 text-green-800' : 
                        'bg-red-100 text-red-800'
                    }`}>
                        {task.status}
                    </span>
                </div>
                <div className="flex flex-wrap mb-4">
                    {task.tags.map((tag, index) => (
                        <span
                            key={index}
                            className="bg-blue-100 text-blue-800 text-xs font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <p className="text-gray-600 mb-2"><strong>Due Date:</strong> {task.dueDate}</p>
                <p className="text-gray-600"><strong>Assigned User:</strong> {task.assignedUser}</p>
            </div>
        </div>
    );
};

export default TaskCard;
