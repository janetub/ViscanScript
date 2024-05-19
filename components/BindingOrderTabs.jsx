import Image from "next/image";
// Updated Tab component with styles
//flex flex-col gap-3 justify-between p-3 cursor-pointer pl-9 whitespace-nowrap max-md:pl-5
// todo: image source
export const bindingStatuses = [
  { status: "Pending", color: "#FFA500" },
  { status: "Submitted", color: "#FFFF00" },
  { status: "Checked", color: "#008000" },
  { status: "For Binding", color: "#0000FF" },
  { status: "Ready", color: "#800080" },
  { status: "Completed", color: "#FF0000" },
];
export const getNextStatus = (status) => {
  const currentIndex = bindingStatuses.findIndex(
    (item) => item.status === status,
  );
  const nextIndex = currentIndex + 1;
  const nextStatus = bindingStatuses[nextIndex];
  return nextStatus;
};

const selectedImage =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?";
const unselectedImage =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?";

export default function Tabs({ selectedTab, onSelect }) {
  return (
    <div className="flex flex-col cursor-pointer pl-9 whitespace-nowrap max-md:pl-5">
      {[{ status: "All", color: "#FFFFFF" }, ...bindingStatuses].map((tab) => {
        const status = tab.status;

        return (
          <div
            key={status}
            className={`flex gap-3 justify-between p-3 cursor-pointer ${
              selectedTab === status ? "bg-violet-100 rounded-xl" : ""
            }`}
            onClick={() => onSelect(status)}
          >
            <img
              loading="lazy"
              src={selectedTab === status ? selectedImage : unselectedImage}
              className="my-auto aspect-square w-[5px]"
            />
            <div
              className={`grow ${
                selectedTab === status ? "text-violet-800" : ""
              }`}
            >
              {status}
            </div>
          </div>
        );
      })}
    </div>
  );
}
