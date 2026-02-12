import { useGetUsersQuery ,useGetUserByIdQuery , useAddUserMutation} from "../redux/services/api";
import { use, useState } from "react";
import User from "./User"; 
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setFirstName, setLastName, setEmail, setAge } from "../redux/userSlice";


export default function Home() {
 
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
   const {data  , isLoading, error} = useGetUsersQuery();
  console.log(data?.users);  
   const [addUser, { isLoading: isAdding }] = useAddUserMutation();
   
    const formState = useSelector((state: any) => state.user);
   
  function handleAddUser(e: React.FormEvent) { 
    e.preventDefault();  
    addUser({
      firstName: formState.firstName,
      lastName: formState.lastName,
      email: formState.email,
      age: formState.age,
    });
   
  }
   
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
   

  return (
    <div>
      <h1>Users List</h1>   
      <div>
        <form>
          <label htmlFor="firstName">FirstName </label>
          <input id="firstName" type="text" onChange={(e) => dispatch(setFirstName(e.target.value))} placeholder="Search users..." />
          <label htmlFor="lastName">LastName </label>
          <input id="lastName" type="text" onChange={(e) => dispatch(setLastName(e.target.value))} placeholder="Search users..." />
          <label htmlFor="email">Email </label>
          <input id="email" type="email" onChange={(e) => dispatch(setEmail(e.target.value))}    placeholder="Search users..." />
          <label htmlFor="age">Age </label>
          <input id="age" type="number" onChange={(e) => dispatch(setAge(e.target.value))} placeholder="Search users..." />
          <div>
            <button type="submit" onClick={(e)=>handleAddUser(e)}>Add User</button>
          </div>
        </form>   
        



      </div>
      <ul>
        {
          data?.users.map((user: any) => (
             

              <li onClick={()=> {
                // Navigate to user details page
                  navigate(`/user/${user.id}`); 
              }} 
              key={user.id}>
                <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
                <p>{user.firstName}</p>
                <p>{user.lastName}</p>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone_no}</p>
                <p>Age: {user.age}</p>
              </li>
          ))
        }
      </ul>

    </div>
  );
}


