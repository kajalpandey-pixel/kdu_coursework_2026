import {useGetUserByIdQuery} from "../redux/services/api";


export default function User() {  

  const {data, isLoading, error} = useGetUserByIdQuery(1); // Example: Fetch user with ID 1

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Something went wrong</div>;
    
  return (
    <div>
      <h1>User Details</h1>
      <img src={data?.image} alt={`${data?.firstName} ${data?.lastName}`} />
      <p>Name: {data?.firstName} {data?.lastName}</p>
      <p>Email: {data?.email}</p>
      <p>Phone: {data?.phone_no}</p>
      <p>Age: {data?.age}</p>
    </div>
  );
}