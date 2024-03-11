import { FaBook, FaUserGraduate } from "react-icons/fa";

export default function SideBar(props) {
  const { setSelectedTab, selectedTab } = props;

  return (
    <div className="flex flex-col items-end mt-5 text-sm leading-5 text-neutral-500 max-md:mt-10">
      <div className="flex flex-col self-stretch w-full bg-white">
        <div className="mt-8 font-medium leading-[143%] text-neutral-800">
          Users Management
        </div>
        <button
          className={`flex gap-3 ${
            selectedTab === "Students" ? "bg-blue-200" : ""
          } justify-between p-2 mt-1.5 whitespace-nowrap leading-[143%]`}
          onClick={() => setSelectedTab("Students")}
        >
          <FaUserGraduate className="w-4 h-4 text-blue-400" />
          <div className="flex-auto my-auto">Students</div>
        </button>
        <button
          className={`flex gap-3 ${
            selectedTab === "Librarians" ? "bg-blue-200" : ""
          } justify-between p-3 mt-1.5 whitespace-nowrap leading-[143%]`}
          onClick={() => setSelectedTab("Librarians")}
        >
          <FaBook className="w-4 h-4 text-blue-400" />
          <div className="flex-auto my-auto">Librarians</div>
        </button>
      </div>
    </div>
  );
}
