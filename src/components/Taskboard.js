import React from 'react';
import { dummyTasks } from './dummyData/dummyData1';
import { FaTasks } from 'react-icons/fa';
import { AiOutlinePlus } from 'react-icons/ai';
import { BiDotsHorizontalRounded } from 'react-icons/bi';

function Taskboard() {
    const statusCategories = ['Backlog', 'In Discussion', 'In Progress', 'Completed'];

    const statusColors = {
        'Backlog': 'bg-red-100 border-red-400',
        'In Discussion': 'bg-yellow-100 border-yellow-400',
        'In Progress': 'bg-blue-100 border-blue-400',
        'Completed': 'bg-green-100 border-green-400',
    };

    const renderTasks = (status) => {
        return dummyTasks
            .filter(task => task.status === status)
            .map((task, index) => (
                <div key={index} className={`p-4 rounded border-l-4 mb-4 ${statusColors[status]}`}>
                    <div className="flex items-center mb-2">
                        <FaTasks className="text-gray-500 mr-2" />
                        <h3 className="font-bold text-lg">{task.name}</h3>
                    </div>
                    <p className="text-gray-700">{task.description}</p>
                    <p className="text-gray-500 text-sm">Due: {task.dueDate}</p>
                    <p className="text-gray-500 text-sm">Assigned to: {task.assignedUser}</p>
                    <div className="flex flex-wrap mt-2">
                        {task.tags.map((tag, idx) => (
                            <span key={idx} className="bg-blue-200 text-blue-800 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded">{tag}</span>
                        ))}
                    </div>
                </div>
            ));
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-2xl font-bold mb-6">Taskboard</h1>
            <div className="grid grid-cols-4 gap-4">
                {statusCategories.map((status, index) => (
                    <div key={index}>
                        <div className='flex justify-between mb-5'>
                            <h2 className="text-lg font-semibold">{status}</h2>
                            <div className='flex items-center'>
                                <AiOutlinePlus />
                                <BiDotsHorizontalRounded />
                            </div>
                        </div>

                        {renderTasks(status)}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Taskboard;
