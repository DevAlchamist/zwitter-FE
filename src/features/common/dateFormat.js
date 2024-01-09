export function formatDate(mongoDate) {
  const date = new Date(mongoDate);
  const options = {
    hour: "numeric",
    minute: "numeric",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour12: true,
  };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}
