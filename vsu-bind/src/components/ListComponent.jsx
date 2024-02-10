import { useState } from "react";
import CreateBindingModal from "./CreateBindingModal";
import ListItem from "./ListItem";

const ListComponent = ({ items, handleOpenItem, refetch }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <div className="w-auto flex-grow">
      <div className="flex flex-row justify-between m-5">
        <h1 className="text-2xl text-gray-800 m-5 ">Bindings</h1>
        <button
          className={`rounded-full text-sm font-semibold shadow-sm bg-green-500 text-white border border-green-500 m-5 px-4 py-1`}
          onClick={handleOpenModal}
        >
          Add&nbsp;New
        </button>
      </div>
      <div className="flex-grow bg-white shadow rounded overflow-hidden w-auto m-5">
        {items.map((item) => (
          <ListItem
            item={item}
            key={item.id}
            id={item.id}
            title={item.title}
            status={item.status}
            handleOpenItem={handleOpenItem}
          />
        ))}
      </div>

      <CreateBindingModal
        isOpen={showModal}
        onClose={handleCloseModal}
        refetch={refetch}
      />
    </div>
  );
};

export default ListComponent;
