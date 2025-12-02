import React, { useState } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";
import AddTaskModal from "../components/AddTaskModel";
import EditTaskModal from "../components/EditTaskModal";
import TaskItem from "../components/TaskItem";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("All"); // All / Completed / Pending
  const [sortType, setSortType] = useState("Newest"); // Newest / Oldest / A-Z
  const [categoryFilter, setCategoryFilter] = useState("All"); // All + categories

  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);

  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const noTasks = tasks.length === 0;

  // Apply filters
  let filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  if (filter === "Completed") {
    filteredTasks = filteredTasks.filter((t) => t.completed);
  } else if (filter === "Pending") {
    filteredTasks = filteredTasks.filter((t) => !t.completed);
  }

  if (categoryFilter !== "All") {
    filteredTasks = filteredTasks.filter((t) => t.category === categoryFilter);
  }
  console.log("filteredTasks", filteredTasks);
  // Sorting
  if (sortType === "Newest") {
    filteredTasks.sort((a, b) => b.id - a.id);
  } else if (sortType === "Oldest") {
    filteredTasks.sort((a, b) => a.id - b.id);
  } else if (sortType === "A-Z") {
    filteredTasks.sort((a, b) => a.title.localeCompare(b.title));
  }

  return (
    <div
      className={`${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-100"
      } min-h-screen p-6`}
    >
      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 rounded bg-gray-700 text-white"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
        <h1 className="text-3xl font-bold">Task Manager</h1>
        <button
          className="px-4 py-2 rounded bg-red-700 text-white"
          onClick={() => navigate("/")}
        >
          Logout
        </button>
        {/* Dark Mode Toggle */}
      </div>

      {/* If No Tasks */}
      {noTasks && (
        <div className="text-center mt-20">
          <p className="text-lg text-gray-500 dark:text-gray-300 mb-4">
            No task added
          </p>

          <button
            onClick={() => setOpenAdd(true)}
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg text-lg"
          >
            Add Task
          </button>
        </div>
      )}
      {/* Filters + Sorting */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {/* Status Filter */}
        <select
          className="border px-3 py-2 rounded
          bg-white text-gray-800
          dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="" disabled hidden>
            Status
          </option>
          <option value="All">All</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
        </select>

        <select
          className="border px-3 py-2 rounded
          bg-white text-gray-800
          dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="" disabled hidden>
            Sort
          </option>
          <option value="Newest">Newest</option>
          <option value="Oldest">Oldest</option>
          <option vallue="A-Z">A-Z</option>
        </select>

        {/* Category Filter */}
        <select
          className="border px-3 py-2 rounded
          bg-white text-gray-800
          dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="" disabled hidden>
            Category
          </option>

          <option value="All">All</option>
          <option value="work">Work</option>
          <option value="personal">Personal</option>
          <option value="other">Other</option>
        </select>
      </div>
      {/* If tasks exist */}
      {!noTasks && (
        <>
          {/* Search Bar */}
          <div className="flex gap-2 mb-4">
            <input
              className="border px-3 py-2 rounded w-full dark:bg-gray-700 dark:border-gray-600"
              placeholder="Search tasks..."
              onChange={(e) => setSearch(e.target.value)}
            />
            <button
              onClick={() => setOpenAdd(true)}
              className="bg-indigo-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                setTasks={setTasks}
                onEdit={(t) => {
                  setSelectedTask(t);
                  setOpenEdit(true);
                }}
              />
            ))}
          </div>

          {/* Task List */}
          <div className="space-y-3">
            {filteredTasks.length === 0 && (
              <p className="text-center text-gray-500 mt-10">
                No tasks match your filters or search.
              </p>
            )}
          </div>
        </>
      )}

      {/* Modals */}
      <AddTaskModal open={openAdd} setOpen={setOpenAdd} setTasks={setTasks} />

      {selectedTask && (
        <EditTaskModal
          open={openEdit}
          setOpen={setOpenEdit}
          task={selectedTask}
          setTasks={setTasks}
        />
      )}
    </div>
  );
}
