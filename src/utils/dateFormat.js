export const formatDate = (date) => {
  const d = new Date(date);
  // Date part
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  // Time part
  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const hour12 = hours % 12 || 12; // convert 0 → 12
  return `${day}/${month}/${year} ${hour12}:${minutes} ${ampm}`;
};

export const getTimeStatus = (date) => {
  const now = new Date();
  const taskTime = new Date(date);
  const diffMs = taskTime - now;
  const diffMins = Math.floor(Math.abs(diffMs) / 60000);
  const hours = Math.floor(diffMins / 60);
  const minutes = diffMins % 60;
  // Format HH:MM
  const timeFormatted = `${String(hours).padStart(2, "0")}:${String(
    minutes
  ).padStart(2, "0")}`;
  if (diffMs > 0) {
    // Time left
    if (hours === 0) {
      return `${timeFormatted} mins left`;
    }
    return `${timeFormatted} hr left`;
  } else {
    return `${timeFormatted} mins delay`;
  }
};
