const BindingTable = ({ toggleShowDetails, bindings }) => {
  return (
    <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
      <div className="flex flex-col px-5 pt-4 pb-12 w-full rounded border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)] max-md:mt-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between pl-20 max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
          <div className="flex gap-2 justify-center px-4 py-2 my-auto text-sm font-medium leading-5 whitespace-nowrap rounded-xl border border-solid bg-neutral-100 border-[color:var(--DeepPurple-50,#EDE7F6)] text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/617c92a3a8a66cd2ed8716b3b2b971f70aa89c1377de43ea61b51ee303557e2d?"
              className="my-auto w-4 aspect-square"
            />
            <div className="grow">Search</div>
          </div>
          <div className="flex gap-5 justify-between px-1.5 py-3 rounded-xl bg-neutral-50">
            <div className="text-xs leading-5 text-neutral-500">1-9 of 9</div>
            <div className="flex gap-0 my-auto">
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd76317491ea58712227e5ceb21e73e7852d21087c939fe54af37538446112f?"
                className="w-4 aspect-square"
              />
              <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/894c1823729502fc9761c47568f3db9c7d13a97df6caab81855d21980cbce0b4?"
                className="w-4 aspect-square"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center px-2 mt-4 text-sm font-medium bg-white rounded-xl text-neutral-400 max-md:max-w-full">
          {bindings.map((binding) => (
            <div
              key={binding.id}
              className="flex gap-5 justify-between items-center p-4 w-full max-md:flex-wrap max-md:max-w-full"
              onClick={() => toggleShowDetails(binding)}
            >
              <div className="flex gap-2 justify-between self-stretch font-bold whitespace-nowrap">
                <img
                  loading="lazy"
                  srcSet="..."
                  className="w-8 aspect-square"
                />
                <div className="grow my-auto">{binding.name}</div>
              </div>
              <div className="flex-auto self-stretch my-auto text-xs">
                {binding.title}
              </div>
              <div className="justify-center self-stretch px-2 py-1 my-auto text-violet-800 whitespace-nowrap bg-purple-200 aspect-[2.5] leading-[143%] rounded-[100px]">
                {binding.status}
              </div>
              <div className="self-stretch my-auto text-xs text-neutral-500">
                {binding.date}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BindingTable;
