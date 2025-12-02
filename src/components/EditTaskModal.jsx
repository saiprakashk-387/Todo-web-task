import React, { useState, useEffect } from "react";
import Modal from "./Model";

export default function EditTaskModal({ open, setOpen, task, setTasks }) {
  const [title, setTitle] = useState(task?.title || "");
  const [desc, setDesc] = useState(task?.description || "");
  const [date, setDate] = useState(task?.date || "");

  useEffect(() => {
    setTitle(task?.title || "");
    setDesc(task?.description || "");
    setDate(task?.date || "");
  }, [task]);

  const updateTask = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, title, description: desc, date } : t
      )
    );

    setOpen(false);
  };

  return (
    <Modal open={open} setOpen={setOpen}>
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      <input
        className="border w-full px-3 py-2 rounded mb-3"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="border w-full px-3 py-2 rounded mb-3"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <input
        type="datetime-local"
        className="border w-full px-3 py-2 rounded mb-4"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <button
        onClick={updateTask}
        className="bg-indigo-600 text-white w-full py-2 rounded"
      >
        Update Changes
      </button>
    </Modal>
  );
}
