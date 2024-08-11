import axios from "axios";
import { useEffect, useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";

function Projects() {

    const [data, setData] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        axios.get("http://localhost:4000/fetchproject")
            .then(({ data }) => {
                setData(data);
                // console.log(data);
            })
    }, []);

    const addProject = async () => {
        try {
            const { data } = await axios.post("http://localhost:4000/addproject", {
                projectName: name,
                projectDescription: description,
            });
            if (data != null) {
                alert("project added successfully!");
                setData((prev) => {
                    return [...prev, data];
                });
                setName('');
                setDescription('');
            }
        } catch (e) {
            alert("something went wrong!");
        }

    };

    const handleDelete = async (id) => {
        try {
            const { data } = await axios.delete(`http://localhost:4000/deleteproject/${id}`);
            setData((prevData) => {
                return prevData.filter((item) => item._id !== data._id);
            })
        } catch (e) {
            alert("Something Happened Wrong!");
        }
    }

    const viewData = data.map((item) => {
        return (

            <div className="flex flex-row justify-between bg-white p-4 rounded-lg shadow-md mb-4 hover:bg-gray-100 hover:shadow-lg transition duration-200 cursor-pointer">
                <Link className="w-[80%]" to={`/profile/projects/${item._id}`}>
                    <div className="flex flex-col justify-start" key={item._id}>
                        <h1 className="text-xl font-bold">{item.projectName}</h1>
                        <h2 className="text-gray-700">{item.projectDescription}</h2>
                    </div>
                </Link>
                <div>
                    <AiFillDelete
                        className="text-3xl text-red-500 hover:text-4xl hover:text-red-800"
                        onClick={() => handleDelete(item._id)}
                    />
                </div>
            </div >

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
