// Updated Tab component with styles
//flex flex-col gap-3 justify-between p-3 cursor-pointer pl-9 whitespace-nowrap max-md:pl-5
// todo: image source
const Tabs = ({ selectedTab, onSelect }) => {
    return (
      <div className="flex flex-col cursor-pointer pl-9 whitespace-nowrap max-md:pl-5">
        <div className={`flex gap-3 justify-between p-3 cursor-pointer ${selectedTab === 'All' ? 'bg-violet-100 rounded-xl rounded-xl' : ''}`} onClick={() => onSelect('All')}>
        {selectedTab == 'All' ? (
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?"
                className="my-auto aspect-square w-[5px]"
                />
            ) : <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
            className="my-auto aspect-square w-[5px]"
          />}
          <div className={`grow ${selectedTab === 'All' ? 'text-violet-800' : ''}`}>All</div>
        </div>
        <div className={`flex gap-3 justify-between p-3 cursor-pointer ${selectedTab === 'Pending' ? 'bg-violet-100 rounded-xl rounded-xl' : ''}`} onClick={() => onSelect('Pending')}>
            {selectedTab == 'Pending' ? (
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?"
                className="my-auto aspect-square w-[5px]"
                />
            ) : <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
            className="my-auto aspect-square w-[5px]"
          />}
          <div className={`grow ${selectedTab === 'Pending' ? 'text-violet-800' : ''}`}>Pending</div>
        </div>
        <div className={`flex gap-3 justify-between p-3 cursor-pointer ${selectedTab === 'Submitted' ? 'bg-violet-100 rounded-xl' : ''}`} onClick={() => onSelect('Submitted')}>
            {selectedTab == 'Submitted' ? (
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?"
                className="my-auto aspect-square w-[5px]"
                />
            ) : <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
            className="my-auto aspect-square w-[5px]"
          />}
          <div className={`grow ${selectedTab === 'Submitted' ? 'text-violet-800' : ''}`}>Submitted</div>
        </div>
        <div className={`flex gap-3 justify-between p-3 cursor-pointer ${selectedTab === 'Checked' ? 'bg-violet-100 rounded-xl' : ''}`} onClick={() => onSelect('Checked')}>
            {selectedTab == 'Checked' ? (
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?"
                className="my-auto aspect-square w-[5px]"
                />
            ) : <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
            className="my-auto aspect-square w-[5px]"
          />}  
          <div className={`grow ${selectedTab === 'Checked' ? 'text-violet-800' : ''}`}>Checked</div>
        </div>
        <div className={`flex gap-3 justify-between p-3 cursor-pointer ${selectedTab === 'Binding' ? 'bg-violet-100 rounded-xl' : ''}`} onClick={() => onSelect('Binding')}>
            {selectedTab == 'Binding' ? (
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?"
                className="my-auto aspect-square w-[5px]"
                />
            ) : <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
            className="my-auto aspect-square w-[5px]"
          />}
          <div className={`grow ${selectedTab === 'Binding' ? 'text-violet-800' : ''}`}>Binding</div>
        </div>
        <div className={`flex gap-3 justify-between p-3 cursor-pointer ${selectedTab === 'Ready' ? 'bg-violet-100 rounded-xl' : ''}`} onClick={() => onSelect('Ready')}>
            {selectedTab == 'Ready' ? (
                <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/df1dd725b135fcc7239a7a18d55d8a3577cf1827fa654ad22426cf0d62a70cf5?"
                className="my-auto aspect-square w-[5px]"
                />
            ) : <img
            loading="lazy"
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/cf240976e3c662803d5f21ae40a2e72efc3fc07d78504b95f61376a12a2a616d?"
            className="my-auto aspect-square w-[5px]"
          />}
          <div className={`grow ${selectedTab === 'Ready' ? 'text-violet-800' : ''}`}>Ready</div>
        </div>
        {/* Repeat the same structure for other tabs */}
      </div>
    );
  };
  
export default Tabs;