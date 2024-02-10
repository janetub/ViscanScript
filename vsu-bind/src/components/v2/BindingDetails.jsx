import logo from "../../assets/logo.png"; // Adjust the path as necessary

const BindingDetails = ({ binding, onClose }) => {
  return (
    <div className="flex flex-col ml-5 w-[32%] max-md:ml-0 max-md:w-full">
      <div className="flex flex-col grow max-md:mt-5">
        <div className="relative flex flex-col pt-2.5 pr-3 pb-10 pl-3 w-full bg-sky-100 rounded-xl">
          <button
            className="absolute top-0 right-0 mt-4 mr-4 text-gray-700 bg-red-100 py-2 px-3 rounded-full hover:bg-gray-3"
            onClick={onClose}
          >
            <strong class="text-xl align-center cursor-pointer alert-del">
              &times;
            </strong>
          </button>
          <div className="flex gap-3 justify-between items-start">
            <div className="flex justify-center items-center px-5 text-2xl font-bold leading-8 text-white whitespace-nowrap bg-violet-300 rounded-xl aspect-[1.03] h-[68px]">
              16
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="flex justify-center items-center px-2.5 mt-3 border border-solid border-[color:var(--Blue-600,#1E88E5)] h-[155px] rounded-[100px] w-[155px]">
              <div className="flex overflow-hidden relative flex-col px-px pb-3.5 w-full aspect-square">
                <div className="relative shrink-0 bg-blue-300 rounded-full h-[118px]" />
                <img
                  loading="lazy"
                  src={logo}
                  className="object-cover absolute inset-0 size-full"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="self-center mt-7 text-xl font-bold text-center whitespace-nowrap text-neutral-800">
              {binding.name}
            </div>
            <div className="self-center mt-2.5 text-sm font-semibold text-center text-neutral-500">
              {binding.studentNumber}
            </div>
            <div className="self-center mt-2.5 text-xl font-bold text-center text-neutral-800">
              {binding.courseCode}
            </div>
          </div>
        </div>
        <div className="flex flex-col px-4 pt-6 pb-12 mt-5 w-full text-sm font-medium leading-5 rounded border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)]">
          <div className="text-neutral-800">Information</div>
          <div className="flex gap-2 justify-between mt-3 text-xs whitespace-nowrap text-neutral-500">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/40167252833974e55b8daf9e213a2150888a9426d85ae581283ba04d3df51681?"
              className="w-4 aspect-square"
            />
            <div className="grow">{binding.email}</div>
          </div>
          <div className="mt-7 text-neutral-800">Title</div>
          <div className="mt-3 text-base font-bold text-neutral-500">
            {binding.title}
          </div>
          <div className="mt-7 text-neutral-800">Status</div>
          <div className="flex gap-1 justify-end self-start px-1.5 py-px mt-2 text-xs tracking-wide leading-4 text-yellow-400 whitespace-nowrap rounded-xl">
            <div className="justify-center px-2 py-1 bg-yellow-50 aspect-[2.29] rounded-[100px]">
              Pending
            </div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/8591c6bdcf420031e58cdd4b9f64e09b096dc8d071e22318c17050ec3e9751e1?"
              className="my-auto w-4 aspect-square"
            />
          </div>
          <div className="mt-7 font-semibold text-neutral-500">
            Acknowledgement ID: ---
            <br />
            Order ID: ---
            <br />
            OR ID: ---
          </div>
          <div className="flex gap-0 justify-between mt-7 whitespace-nowrap text-neutral-800">
            <div className="grow">Attachment</div>
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/36b256fbaad2472e7560c418a759003ae55ae5db0e7d2bc445618c056c108363?"
              className="my-auto w-4 aspect-square"
            />
          </div>
          <div className="flex gap-3 justify-between mt-3 text-xs leading-5 whitespace-nowrap">
            <img
              loading="lazy"
              srcSet="..."
              className="aspect-square w-[42px]"
            />
            <div className="flex flex-col flex-1">
              <div className="text-neutral-800">File Name.docx</div>
              <div className="text-neutral-400">4/16/2021 07:47:03 </div>
            </div>
          </div>
          <div className="flex gap-3 justify-between mt-3 text-xs leading-5 whitespace-nowrap">
            <img
              loading="lazy"
              srcSet="..."
              className="aspect-square w-[42px]"
            />
            <div className="flex flex-col flex-1">
              <div className="text-neutral-800">File Name.pdf</div>
              <div className="text-neutral-400">3/20/2021 12:47:03 </div>
            </div>
          </div>
          <div className="flex gap-3 justify-between pr-2 mt-14 mb-1 text-center text-white whitespace-nowrap max-md:mt-10">
            <div className="grow justify-center px-5 py-3 bg-sky-500 rounded">
              Complete Order
            </div>
            <div className="grow justify-center px-5 py-3 bg-sky-500 rounded">
              Complete Order
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BindingDetails;
