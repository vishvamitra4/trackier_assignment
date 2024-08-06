import { useState } from "react";
import { Link } from "react-router-dom";

function Projects() {
    const dummyProjects = [
        {
            id: 1,
            name: "Project1",
            description: "Some random text about that dummy project.",
        },
        {
            id: 2,
            name: "Project2",
            description: "Some random text about that dummy project.",
        },
        {
            id: 3,
            name: "Project3",
            description: "Some random text about that dummy project.",
        },
    ];

    const [data, setData] = useState(dummyProjects);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const addProject = () => {
        setData([...data, { id: data.length + 1, name, description }]);
        setName("");
        setDescription("");
    };

    const viewData = data.map((item) => {
        return (
            <Link to={`/profile/projects/${item.id}`}>
                <div key={item.id} className="bg-white p-4 rounded-lg shadow-md mb-4 hover:bg-gray-100 hover:shadow-lg transition duration-200 cursor-pointer">
                    <h1 className="text-xl font-bold">{item.name}</h1>
                    <h2 className="text-gray-700">{item.description}</h2>
                </div>
            </Link>
        );
    });

    return (
        <div className="max-w-4xl mx-auto p-8 bg-gray-50 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Projects</h1>
                <button
                    className="bg-[#134154] text-white px-4 py-2 rounded hover:bg-[#134130] transition duration-200"
                    onClick={() => setShowInput(!showInput)}
                >
                    {showInput ? "Close" : "Add Project"}
                </button>
            </div>

            {showInput && (
                <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                    <div className="mb-4">
                        <input
                            type="text"
                            value={name}
                            placeholder="Name"
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                        <input
                            type="text"
                            value={description}
                            placeholder="Description"
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-2"
                        />
                    </div>
                    <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200"
                        onClick={addProject}
                    >
                        Add
                    </button>
                </div>
            )}

            {viewData}
        </div>
    );
}

export default Projects;
