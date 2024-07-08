import React from 'react';
import JobItem from './JobItem';

const JobList = ({ jobs }) => {
  return (
    <div className="job-list">
      {jobs.map((job, index) => (
        <JobItem key={index} {...job} />
      ))}
    </div>
  );
};

export default JobList;
