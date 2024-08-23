import { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faChevronUp,
  faEllipsisH,
  faClock,
  faPencilAlt,
} from "@fortawesome/free-solid-svg-icons";

interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

const TaskMenu: React.FC = () => {
  const [showWidget, setShowWidget] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("My Tasks");
  const [taskDate, setTaskDate] = useState<string>("");
  const [tasks, setTasks] = useState<
    { title: string; date: string; description: string }[]
  >([]);
  const [openTaskIndex, setOpenTaskIndex] = useState<number | null>(null);
  const [completedTasks, setCompletedTasks] = useState<boolean[]>([]);
  const [taskDates, setTaskDates] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editedDescription, setEditedDescription] = useState<string>("");
  const [newTaskTitle, setNewTaskTitle] = useState<string>("Type Task Title");
  const [newTaskDate, setNewTaskDate] = useState<string>("");
  const [newTaskDescription, setNewTaskDescription] =
    useState<string>("No Description");
  const [showDeleteMenu, setShowDeleteMenu] = useState<number | null>(null);

  const options = ["My Tasks", "Personal Errands", "Urgent To-Do"];

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get<Task[]>('https://jsonplaceholder.typicode.com/todos');
        const tasksData = response.data.slice(0, 3).map((task: Task) => ({
          title: task.title,
          date: "",
          description: "Deskripsi untuk " + task.title,
        }));
        setTasks(tasksData);
        setCompletedTasks(Array(tasksData.length).fill(false));
        setTaskDates(Array(tasksData.length).fill(""));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const toggleWidget = () => {
    setShowWidget((prevShowWidget) => !prevShowWidget);
  };

  const toggleDropdown = () => {
    setShowDropdown((prevShowDropdown) => !prevShowDropdown);
  };

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleEditDescription = (index: number) => {
    setEditingIndex(index);
    setEditedDescription(tasks[index].description);
  };

  const handleAddTask = () => {
    const newTask = {
      title: newTaskTitle,
      date: newTaskDate,
      description: newTaskDescription,
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
    setNewTaskTitle("Type Task Title");
    setNewTaskDate("");
    setNewTaskDescription("No Description");
  };

  const widgetVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  };

  const filteredOptions = options.filter((option) => option !== selectedOption);

  return (
    <div className="relative flex flex-col items-center cursor-pointer">
      <span className="text-white mb-1">Task</span>
      <Image
        src={showWidget ? "/assets/task-open.png" : "/assets/task.png"}
        alt="Task Icon"
        width={50}
        height={50}
        onClick={toggleWidget}
      />
      {showWidget && (
        <motion.div
          className="absolute top-[-484px] right-0 w-[500px] h-[500px] bg-white shadow-md rounded-lg overflow-hidden"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={widgetVariants}
          transition={{ duration: 0.3 }}
        >
          {/* Header Widget */}
          <div className="flex justify-between items-center p-3">
            <div className="relative">
              <div className="flex items-center">
                {taskDate && (
                  <span className="mr-2 text-gray-600">{taskDate}</span>
                )}
                <button
                  onClick={toggleDropdown}
                  className="p-2 border border-gray-300 rounded-md w-40 text-left flex items-center justify-between"
                >
                  {selectedOption}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className={`ml-2 transition-transform ${
                      showDropdown ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
              {showDropdown && (
                <div className="absolute left-0 mt-2 w-full bg-white border border-gray-300 rounded-md shadow-lg z-10">
                  <ul className="divide-y divide-gray-300">
                    {filteredOptions.map((option) => (
                      <li
                        key={option}
                        className="p-2 cursor-pointer hover:bg-gray-100"
                        onClick={() => handleOptionSelect(option)}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <button
              className="p-2 bg-blue-500 text-white rounded-md"
              onClick={handleAddTask}
            >
              New Task
            </button>
          </div>

          {/* Daftar Task */}
          <div className="p-4 h-full overflow-y-auto">
            {tasks.map((task, index) => (
              <div key={index} className="mb-4 border-b border-gray-300">
                <div
                  className="flex items-center justify-between cursor-pointer p-2"
                  onClick={() =>
                    setOpenTaskIndex(openTaskIndex === index ? null : index)
                  }
                >
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border-gray-500"
                      checked={completedTasks[index]}
                      onChange={() => {
                        const updatedCompletedTasks = [...completedTasks];
                        updatedCompletedTasks[index] =
                          !updatedCompletedTasks[index];
                        setCompletedTasks(updatedCompletedTasks);
                      }}
                    />
                    {editingIndex === index ? (
                      <input
                        type="text"
                        className="p-1 ml-3 border border-gray-300 rounded-md"
                        value={task.title}
                        onChange={(e) => {
                          const updatedTasks = [...tasks];
                          updatedTasks[index].title = e.target.value;
                          setTasks(updatedTasks);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            setEditingIndex(null);
                          }
                        }}
                      />
                    ) : (
                      <h3
                        className={`text-gray-700 font-semibold ml-3 ${
                          completedTasks[index] ? "line-through" : ""
                        }`}
                        onClick={() => setEditingIndex(index)}
                      >
                        {task.title}
                      </h3>
                    )}
                  </div>
                  <div className="flex items-center">
                    <span className="mr-2 text-gray-600">
                      {taskDates[index]}
                    </span>
                    <FontAwesomeIcon
                      icon={
                        openTaskIndex === index ? faChevronDown : faChevronUp
                      }
                      className="text-gray-500 ml-2"
                    />
                    <FontAwesomeIcon
                      icon={faEllipsisH}
                      className="text-gray-500 ml-4 cursor-pointer"
                      onClick={() => {
                        setShowDeleteMenu(
                          showDeleteMenu === index ? null : index
                        );
                      }}
                    />
                    {showDeleteMenu === index && (
                      <div className="absolute mt-[65px] bg-white border border-gray-300 rounded-md shadow-lg z-10">
                        <button
                          className="p-2 text-red-500"
                          onClick={() => {
                            const updatedTasks = tasks.filter(
                              (_, i) => i !== index
                            );
                            setTasks(updatedTasks);
                            const updatedCompletedTasks = completedTasks.filter(
                              (_, i) => i !== index
                            );
                            setCompletedTasks(updatedCompletedTasks);
                            const updatedTaskDates = taskDates.filter(
                              (_, i) => i !== index
                            );
                            setTaskDates(updatedTaskDates);
                            setShowDeleteMenu(null);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {openTaskIndex === index && (
                  <div className="pl-8">
                    <div className="flex items-center mt-1">
                      <FontAwesomeIcon
                        icon={faClock}
                        className="text-blue-400 mr-2"
                        onClick={() => {
                          /* logika untuk mengatur waktu */
                        }}
                      />
                      <input
                        type="date"
                        className="p-1 border border-gray-300 rounded-md"
                        value={taskDates[index]}
                        onChange={(e) => {
                          const updatedTaskDates = [...taskDates];
                          updatedTaskDates[index] = e.target.value;
                          setTaskDates(updatedTaskDates);
                        }}
                      />
                    </div>
                    <div className="flex items-center mt-2 mb-4">
                      {editingIndex === index ? (
                        <input
                          type="text"
                          className="p-1 border border-gray-300 rounded-md"
                          value={editedDescription}
                          onChange={(e) => setEditedDescription(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              const updatedTasks = [...tasks];
                              updatedTasks[index].description =
                                editedDescription;
                              setTasks(updatedTasks);
                              setEditingIndex(null);
                            }
                          }}
                        />
                      ) : (
                        <>
                          <FontAwesomeIcon
                            icon={faPencilAlt}
                            className="text-blue-400 mr-2"
                            onClick={() => handleEditDescription(index)}
                          />
                          <span className="text-gray-600">
                            {task.description}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TaskMenu;
