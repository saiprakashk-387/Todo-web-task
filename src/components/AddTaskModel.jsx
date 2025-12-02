import React, { useState } from "react";
import Modal from "./Model";

export default function AddTaskModal({ open, setOpen, setTasks }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");

  const addTask = () => {
    if (!title.trim()) return;

    setTasks((prev) => [
      ...prev,
      {
        id: Date.now(),
        title,
        description: desc,
        date,
        category,
        completed: false,
      },
    ]);

    setTitle("");
    setDesc("");
    setDate("");
    setCategory("");
    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

      <input
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Description (optional)"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />
      <input
        className="border w-full px-3 py-2 rounded mb-3"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="datetime-local"
        className="border w-full px-3 py-2 rounded mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        onClick={addTask}
        className="bg-indigo-600 text-white w-full py-2 rounded"
      >
        Add Task
      </button>
    </Modal>
  );
}
