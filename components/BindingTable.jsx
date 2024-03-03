/**
 * components/BindingTable.jsx
 * 
 * TODO: add more search filter options
 */

import { useState, useEffect } from "react";

const BindingTable = ({ toggleShowDetails, bindings }) => {
  const [ loading, setLoading ] = useState(true);
  const [ searchQuery, setSearchQuery ] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ sortOrder, setSortOrder ] = useState('newest');
  const [ showSortOptions, setShowSortOptions] = useState(false);
  const [ itemsPerPage, setItemsPerPage ] = useState(3);
  const [ displayedBindings, setDisplayedBindings ] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentBindings, setCurrentBindings] = useState([]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    setCurrentPage(1);
  
    if (query === '') {
      // If the search query is empty, reset displayedBindings to the original bindings array
      setDisplayedBindings(bindings);
    } else {
      // Otherwise, filter and sort the bindings based on the search query
      const filteredBindings = bindings.filter(binding =>
        binding.title.toLowerCase().includes(query)
      );
      const sortedFilteredBindings = filteredBindings.sort((a, b) => a.priorityNum - b.priorityNum);
      setDisplayedBindings(sortedFilteredBindings);
      // console.log(query,'------------------------------------');
      // console.log(displayedBindings);
      // console.log('------------------------------------');
    }
  };
  
  useEffect(() => {
    const calculateCurrentBindings = () => {
      const totalPages = Math.ceil(displayedBindings.length / itemsPerPage);
      setTotalPages(totalPages);
  
      const startIndex = (currentPage - 1) * itemsPerPage + (totalPages==0?0:1);
      const endIndex = Math.min(startIndex + itemsPerPage - 1, displayedBindings.length);
  
      const currentBindings = displayedBindings.slice(startIndex - 1, endIndex);
      setCurrentBindings(currentBindings);
      setStartIndex(startIndex);
      setEndIndex(endIndex);
      setLoading(false);
    };
  
    calculateCurrentBindings();
  }, [displayedBindings, itemsPerPage, currentPage]);
  
  
  useEffect(() => {
    setDisplayedBindings(bindings);
  }, [bindings]);  

  const handleItemsPerPageChange = (itemsPerPage) => {
    setItemsPerPage(itemsPerPage);
  }

  const handlePageNavigation = (direction) => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleSortChange = (order) => {
    if (order === 'newest') {
      setCurrentPage(1);
    } else if (order === 'oldest') {
      const lastPage = Math.ceil(bindings.length / itemsPerPage);
      setCurrentPage(lastPage);
    }
    setSortOrder(order);
    setShowSortOptions(false);
  }

  return (
    <div className="flex flex-col w-full max-md:ml-0 max-md:w-full">
      <div className="flex flex-col px-5 pt-4 pb-12 w-full rounded border border-solid bg-neutral-50 border-[color:var(--Grey-200,#F5F5F5)] max-md:mt-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between max-md:flex-wrap max-md:pl-5 max-md:max-w-full">
          <div className="flex gap-2 justify-center px-4 py-2 my-auto text-sm font-medium leading-5 whitespace-nowrap rounded-xl border border-solid bg-neutral-100 border-[color:var(--DeepPurple-50,#EDE7F6)] text-neutral-400">
            <img
              loading="lazy"
              src="https://cdn.builder.io/api/v1/image/assets/TEMP/617c92a3a8a66cd2ed8716b3b2b971f70aa89c1377de43ea61b51ee303557e2d?"
              className="my-auto w-4 aspect-square"
            />
            <input
              type="text"
              placeholder="Search..."
              className="my-auto flex-grow outline-none bg-transparent"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
          <div className="flex gap-5 justify-between px-1.5 py-3 rounded-xl bg-neutral-50">
            <div>
              <button
                className="text-xs leading-5 text-neutral-500 rounded-md px-2 py-1 hover:bg-gray-200 focus:bg-gray-200"
                onClick={() => setShowSortOptions(!showSortOptions)}
              >
                {`${startIndex}-${endIndex} of ${displayedBindings.length}`}
              </button>
              {showSortOptions && (
                <div className="absolute z-10 bg-white shadow-md rounded-md mt-2 text-center">
                  <button
                    className={`block w-full py-2 px-3 text-sm w-full font-medium ${sortOrder === 'newest' ? 'text-neutral-500' : 'hover:bg-gray-200'}`}
                    onClick={() => handleSortChange('newest')}
                    disabled={sortOrder === 'newest'}
                  >
                    Newest
                  </button>
                  <button
                    className={`block w-full py-2 px-3 hover:bg-gray-200 text-sm font-medium ${sortOrder === 'oldest' ? 'text-neutral-500' : 'hover:bg-gray-200'}`}
                    onClick={() => handleSortChange('oldest')}
                    disabled={sortOrder === 'oldest'}
                  >
                    Oldest
                  </button>
                </div>              
              )}
            </div>
          <div className="flex gap-0 my-auto">
            <button className="w-4 aspect-square" onClick={() => handlePageNavigation('prev')}>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/edd76317491ea58712227e5ceb21e73e7852d21087c939fe54af37538446112f?" />
            </button>
            <button className="w-4 aspect-square" onClick={() => handlePageNavigation('next')}>
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/894c1823729502fc9761c47568f3db9c7d13a97df6caab81855d21980cbce0b4?" />
            </button>
          </div>
        </div>
        </div>
        <div className="flex flex-col justify-center px-2 mt-4 text-sm font-medium rounded-xl text-neutral-400 max-md:max-w-full">
          {loading ? (
            <div className="text-center">Loading...</div>
          ) : (
            currentBindings.length === 0 ? (
              <div className="text-center">No results found</div>
            ) : (
              currentBindings.map((binding) => (
                <div
                  key={binding.priorityNum}
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
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BindingTable;
