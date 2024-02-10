const ListItem = ({ id, title, status, handleOpenItem, item }) => {
  const statusColors = {
    Binding: "bg-red-200 text-red-700",
    Submitted: "bg-green-200 text-green-700",
    Pending: "bg-yellow-200 text-yellow-700",
  };

  return (
    <div
      className="flex justify-between items-center p-4 border-b border-gray-200"
      onClick={handleOpenItem(item)}
    >
      <span className="text-gray-700 font-semibold">{id}</span>
      <span className="text-gray-900 font-medium truncate">{title}</span>
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[status]}`}
      >
        {status}
      </span>
    </div>
  );
};

export default ListItem;
