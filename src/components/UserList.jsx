import React, { useEffect, useState } from 'react';

function UserList() {
  const [userList, setUserList] = useState(null);
  const [gender, setGender] = useState("");
  const [arrange, setArrange] = useState(1);

  const handelInput = (e) => {
    setGender(e.target.value);
  };

  const handelInputArrange = (e)=>{
    const order = parseInt(e.target.value);
    setArrange(order)
    console.log(order);
  }

  useEffect(() => {
    const fetchApiData = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await fetch(`http://localhost:8009/users?gender=${gender}&order=${arrange}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          }
        });
        const data = await res.json();
        setUserList(data);

      console.log(data);
        if (!data) {
          throw new Error("Data not found");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchApiData();
  }, [gender]); 

  return (
    <>
      <div>
        <div>
          <input
            type="radio"
            name="gender"
            onChange={handelInput}
            id="male"
            value="male"
          />
          <label htmlFor="male">Male</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            onChange={handelInput}
            id="female"
            value="female"
          />
          <label htmlFor="female">Female</label>
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            onChange={handelInput}
            id="all"
            value=""
            checked = {gender === ""  && true}
          />
          <label htmlFor="all">All</label>
        </div>
      </div>
      <div>

      <div>
          <input
            type="radio"
            name="arrange"
            onChange={handelInputArrange}
            id="acceding"
            value="1"
          />
          <label htmlFor="acceding">acceding</label>
        </div>
        <div>
          <input
            type="radio"
            name="arrange"
            onChange={handelInputArrange}
            id="deciding"
            value="-1"
          />
          <label htmlFor="deciding">deciding</label>
        </div>

      </div>
      <table>
        <thead>
          <tr>
            <th>User Name</th>
            <th>Gender</th>
            <th>age</th>
            <th>rating</th>
          </tr>
        </thead>
        <tbody>
          {userList?.map((list, i) => (
            <tr key={i}>
              <td>{list.name}</td>
              <td>{list.gender}</td>
              <td>{list.age}</td>
              <td>{list.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default UserList;
