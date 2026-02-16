import { useAppDispatch, useAppSelector } from "../redux/hook"; 


import {
  setName,
  setEmail,
  setEvent,
  setMessage,
  submitRegistration,
} from "../redux/registration/registrationSlice";

import { useNavigate } from "react-router-dom";

export default function Registration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { name, email, event, message } = useAppSelector(
    (state) => state.registration
  );

  async function handleSubmit() {
    const resultAction = await dispatch(
      submitRegistration({ name, email, event, message })
    );

    if (submitRegistration.fulfilled.match(resultAction)) {
      navigate("/status");
    }
  }

  return (
    <>
      <h1>Registration Page</h1>
      <button className="eventRegistration">Event Registration</button>

      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit();
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          gap: "10px",
        }}
      >
        <label>Name*</label>
        <input value={name} onChange={(e) => dispatch(setName(e.target.value))} />
        <label>Email*</label>
        <input
          value={email}
          onChange={(e) => dispatch(setEmail(e.target.value))}
        />
        <label>Event*</label>
        <input value={event} onChange={(e) => dispatch(setEvent(e.target.value))} />
        <label>Message</label>
        <textarea
          value={message}
          onChange={(e) => dispatch(setMessage(e.target.value))}
        />

        <button type="submit" onClick={()=> navigate("/status")}>Submit</button>
      </form>
      <p style={{ color: "grey" , padding: "10px", flex: "1 1 auto"}}>* Required fields</p>
    </>
    
  );
}
