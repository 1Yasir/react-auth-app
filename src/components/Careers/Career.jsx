import React, { useState, useEffect } from 'react';
import FilterSidebar from './FilterSidebar';
import JobList from './JobList';
import SearchBar from './SearchBar';






const Career = () => {
  const [jobs, setJobs] = useState(null);
  const [filters, setFilters] = useState({
    remote: false,
    contract: false,
    fullTime: false,
  });
  const [searchQuery, setSearchQuery] = useState({
    title: '',
    location: '',
  });
  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    const applyFilters = () => {
      let updatedJobs = jobs?.filter(job => {
        const matchesTitle = job.title.toLowerCase().includes(searchQuery.title.toLowerCase());
        const matchesLocation = job.location.toLowerCase().includes(searchQuery.location.toLowerCase());
        const matchesRemote = !filters.remote || job.remote;
        const matchesContract = !filters.contract || job.type === 'Contract';
        const matchesFullTime = !filters.fullTime || job.type === 'Full time';




        return matchesTitle && matchesLocation && matchesRemote && (filters.contract ? matchesContract : true) && (filters.fullTime ? matchesFullTime : true);
      });

      setFilteredJobs(updatedJobs);
    };

    applyFilters();
  }, [jobs, filters, searchQuery]);

  const handleFilterChange = (filterName) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: !prevFilters[filterName],
    }));

  };
  console.log(filters);

  const handleSearchChange = (field, value) => {
    setSearchQuery((prevQuery) => ({
      ...prevQuery,
      [field]: value,
    }));
  };

  return (
    <div className="career">
      <header>
        <h1>Join us</h1>
        <h2>Explore Openings</h2>
      </header>
    
      {
        jobs ? ( 
          <>
          <div className="content">
          <FilterSidebar filters={filters} onFilterChange={handleFilterChange} />
          <div className="main">
            <SearchBar searchQuery={searchQuery} onSearchChange={handleSearchChange} />
            <JobList jobs={filteredJobs} />
          </div>
        </div>
          </>
        )  : "no job found"
      }
   
      </div>
  );
};

export default Career;
