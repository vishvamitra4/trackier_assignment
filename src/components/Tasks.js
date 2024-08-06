import { useState } from "react";
import { useParams } from "react-router-dom";
import TaskCard from "./TaskCard";
import { dummyTasks } from "./dummyData/dummyData2";

function Tasks() {
    const { action } = useParams();

    const [data, setData] = useState(dummyTasks);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [newTask, setNewTask] = useState({
        project: `Project-${action}`,
        name: '',
        description: '',
        status: '',
        tags: '',
        dueDate: '',
        assignedUser: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewTask((prevTask) => ({ ...prevTask, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setData((prevData) => [...prevData, { ...newTask, tags: newTask.tags.split(', ') }]);
        setIsFormVisible(false);
        setNewTask({
            project: `Project-${action}`,
            name: '',
            description: '',
            status: '',
            tags: '',
            dueDate: '',
            assignedUser: ''
        });
    };

    const viewTasks = data.map((item, index) => (
        <div key={index} className="p-4">
            <TaskCard task={item} />
        </div>
    ));

    return (
        <div>
            <div className="w-[60%] mx-auto my-[40px] flex flex-col align-center justify-center text-center">
            <h1 className="text-2xl font-bold mb-4">{`Project: ${action}`}</h1>
                <button
                    className="bg-[#134154] text-white px-5 py-3 rounded mt-4"
                    onClick={() => setIsFormVisible(!isFormVisible)}
                >
                    {isFormVisible ? 'Close Form' : 'Add New Task'}
                </button>
            </div>

            {isFormVisible && (
                <form onSubmit={handleSubmit} className="mt-4 p-4 border rounded shadow-md bg-white w-[70%] mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700">Task Name</label>
                        <input
                            type="text"
                            name="name"
                            value={newTask.name}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description</label>
                        <textarea
                            name="description"
                            value={newTask.description}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Status</label>
                        <select
                            name="status"
                            value={newTask.status}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="" disabled>Select Status</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Completed">Done</option>
                            <option value="Completed">In Discussion</option>
                            <option value="Completed">Backlog</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Tags (comma separated)</label>
                        <input
                            type="text"
                            name="tags"
                            value={newTask.tags}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={newTask.dueDate}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Assigned User</label>
                        <input
                            type="text"
                            name="assignedUser"
                            value={newTask.assignedUser}
                            onChange={handleChange}
                            className="mt-1 block w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Add Task
                    </button>
                </form>
            )}
            <div className="flex flex-row flex-wrap justify-around mx-auto w-[70%]">
                {viewTasks}
            </div>
        </div>
    );
};

export default Tasks;
