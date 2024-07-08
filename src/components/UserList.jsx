import React, { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button } from '@mui/material';

function UserList() {
  const [userList, setUserList] = useState([]);
  const [filter, setFilter] = useState({ gender: "", ageMin: "", ageMax: "" });
  const [sorting, setSorting] = useState({ name: "", value: "" });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFilter(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSorting = (name) => {

    setSorting(prevState => ({
      name,
      value: prevState.name === name && prevState.value === 1 ? -1 : 1
    }));
  };
  console.log(sorting);

  useEffect(() => {
    const fetchApiData = async () => {
      const token = localStorage.getItem("token");
      const query = new URLSearchParams({
        ...filter,
        sortField: sorting.name,
        sortOrder: sorting.value,
        page,
        pageSize
      }).toString();

      console.log(query);

      try {
        const res = await fetch(`http://localhost:8009/users?${query}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
        const data = await res.json();
        console.log(data);
        setUserList(data.users);

        if (!data.users) {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, [filter, sorting, page, pageSize]);

  return (
    <>
      <div className='d-flex gap-3 mb-3'>
        <div>
          <input
            type="radio"
            name="gender"
            onChange={handleInput}
            id="male"
            value="male"
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            onChange={handleInput}
            id="female"
            value="female"
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            onChange={handleInput}
            id="all"
            value=""
          />
          <label htmlFor="all">All</label>
        </div>
      </div>
      <div className="filter">
        <h2>User Filter Based on Name and Age Range</h2>
        <div>
          <input
            type="text"
            name="name"
            onChange={handleInput}
            id="name"
            placeholder="Enter a name"
          />
          <label htmlFor="name">Name</label>
        </div>
        <div>
          <input
            type="number"
            name="ageMin"
            onChange={handleInput}
            id="ageMin"
            placeholder="Min Age"
          />
          <label htmlFor="ageMin">Min Age</label>
        </div>
        <div>
          <input
            type="number"
            name="ageMax"
            onChange={handleInput}
            id="ageMax"
            placeholder="Max Age"
          />
          <label htmlFor="ageMax">Max Age</label>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className='table-heading table-name'>
              User Name
              <Button onClick={() => handleSorting("name")}>
                {sorting.name === "name" && sorting.value === 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
              </Button>
            </th>
            <th className='table-heading'>Gender</th>
            <th className='table-heading table-age'>
              Age
              <Button onClick={() => handleSorting("age")}>
                {sorting.name === "age" && sorting.value === 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
              </Button>
            </th>
            <th className='table-heading table-rating'>Rating</th>
            <th className='table-heading'>Email</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>{user.rating}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        <Button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</Button>
        <Button onClick={() => setPage(page + 1)}>Next</Button>
        <select onChange={(e) => setPageSize(e.target.value)} value={pageSize}>
          <option value={2}>2</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>
    </>
  );
}

export default UserList;
