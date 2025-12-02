import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import { formatDate, getTimeStatus } from "../utils/dateFormat";
import { useEffect, useState } from "react";

export default function TaskItem({ task, setTasks, onEdit }) {
  const [status, setStatus] = useState("");
  useEffect(() => {
    const updateStatus = () => {
      setStatus(getTimeStatus(task.date));
    };

    updateStatus();
    const timer = setInterval(updateStatus, 60000); // update every minute

    return () => clearInterval(timer);
  }, [task.date]);

  const toggle = () => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === task.id ? { ...t, completed: !t.completed } : t
      )
    );
  };

  const remove = () => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };
  return (
    <div className="flex justify-between items-center p-3 border rounded">
      <div className="flex gap-3">
        <input type="checkbox" checked={task.completed} onChange={toggle} />
        <span className={task.completed ? "line-through text-gray-500" : ""}>
          {task.title}
        </span>
        {task.description && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {task.description}
          </p>
        )}

        {task.date && (
          <div className="flex gap-3 items-center ml-6">
            <p className="text-xs text-gray-400 dark:text-gray-500">
              {formatDate(task.date)}
            </p>
            <span
              className={`text-xs font-semibold ${
                status.includes("Late")
                  ? "text-red-500"
                  : status.includes("left")
                  ? "text-green-600"
                  : "text-yellow-500"
              }`}
            >
              {status}
            </span>
          </div>
        )}
        {task.category && (
          <span className="inline-block px-2 py-1 text-xs bg-indigo-100 text-indigo-600 rounded mt-2">
            {task.category}
          </span>
        )}
      </div>
      <div className="flex gap-3">
        <PencilIcon
          className="w-5 cursor-pointer"
          onClick={() => onEdit(task)}
        />
        <TrashIcon
          className="w-5 text-red-500 cursor-pointer"
          onClick={remove}
        />
      </div>
    </div>
  );
}
