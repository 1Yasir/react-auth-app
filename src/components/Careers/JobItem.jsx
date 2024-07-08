import React from 'react';

const JobItem = ({ title, location, experience, description, type, date }) => {
  return (
    <div className="job-item">
      <h4>{title}</h4>
      <p>{location}</p>
      <p>{experience}</p>
      <p>{description}</p>
      <div className="job-meta">
        <span>{type}</span>
        <span>{date}</span>
      </div>
    </div>
  );
};

export default JobItem;
