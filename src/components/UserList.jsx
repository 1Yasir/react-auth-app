import React, { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Button } from '@mui/material';

function UserList() {
  const [userList, setUserList] = useState(null);
  const [gender, setGender] = useState("");
  const [sorting, setSorting] = useState(null);

  const handleInput = (e) => {
    setGender(e.target.value);
  };

  const handleSorting = (name, value) => {
    setSorting({ name, value });
  };

  useEffect(() => {
    const fetchApiData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:8009/users?gender=${gender}&${sorting?.name}=${sorting?.value}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
        const data = await res.json();
        setUserList(data);

        if (!data) {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, [gender, sorting]);

  return (
    <>
      <div>
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
            checked={gender === ""}
          />
          <label htmlFor="all">All</label>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className='table-heading  table-name'>
              User Name
              <Button onClick={() => handleSorting("name", sorting?.value === 1 ? -1 : 1)} >
                {sorting?.name === "name" && sorting?.value === 1 ? <ArrowDownwardIcon  /> : <ArrowUpwardIcon />}
              </Button>
            </th>
            <th className='table-heading '>Gender</th>
            <th className='table-heading table-age '>
              Age
              <Button onClick={() => handleSorting("age", sorting?.value === 1 ? -1 : 1)}>
                {sorting?.name === "age" && sorting?.value === 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon  />}
              </Button>
            </th>
            <th className='table-heading table-rating '>
              Rating
              <Button onClick={() => handleSorting("rating", sorting?.value === 1 ? -1 : 1)}>
                {sorting?.name === "rating" && sorting?.value === 1 ? <ArrowDownwardIcon /> : <ArrowUpwardIcon  />}
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((user, i) => (
            <tr key={i}>
              <td>{user.name}</td>
              <td>{user.gender}</td>
              <td>{user.age}</td>
              <td>{user.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
