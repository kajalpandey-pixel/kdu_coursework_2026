import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchRegistrationStatus } from "../redux/registration/registrationSlice";
import "./statusStyle.scss";

export default function Status() {
  const dispatch = useAppDispatch();
  const {
    registrationId,
    name,
    email,
    event,
    registrationStatus,
    loading,
    error,
  } = useAppSelector((state) => state.registration);

  useEffect(() => {
    if (registrationId) {
      dispatch(fetchRegistrationStatus(registrationId));
    }
  }, [dispatch, registrationId]);

  const statusValue = registrationStatus || "Queued"; 
   
  const isSuccessful = statusValue.toLowerCase() === "successful"; 
  const isQueued = !isSuccessful;

  function handleRefresh(){
    dispatch(fetchRegistrationStatus(registrationId));
  }

  return (
    <div className="status-page">
      <h1>Status Page</h1>
      <button className="eventRegistration" onClick={handleRefresh}>Refresh Status</button>

      <div className="status-card">
        <p>
          <strong>Registration ID:</strong> {registrationId || "Pending"}
        </p>
        <hr />
        <p>
          <strong>Name:</strong> {name || "-"}
        </p>
        <p>
          <strong>Email:</strong> {email || "-"}
        </p>
        <p>
          <strong>Event:</strong> {event || "-"}
        </p>
        <hr />
        <div className="status-row">
          <strong>Status:</strong>
          <span>{registrationStatus || "Queued"}</span>
          <span className={`badge queued ${isQueued ? "active" : ""}`}>
            Queued
          </span>
          <span className={`badge successful ${isSuccessful ? "active" : ""}`}>
            Successful
          </span>
        </div>
      </div>

      {loading && <p className="status-loading">Checking status...</p>}
      {error && <p className="status-error">{error}</p>}
    </div>
  );
}
