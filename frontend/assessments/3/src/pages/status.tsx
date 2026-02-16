import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { fetchRegistrationStatus } from "../redux/registration/registrationSlice";

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

  return (
    <>
      <h1>Status Page</h1>
      <button className="eventRegistration">Registration Status</button>

      <div
        style={{
          marginTop: "20px",
          border: "2px solid #d4d4d4",
          borderRadius: "16px",
          padding: "20px",
          maxWidth: "420px",
        }}
      >
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
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <strong>Status:</strong>
          <span
            style={{
              border: "2px solid #f59e0b",
              color: "#b45309",
              borderRadius: "8px",
              padding: "2px 10px",
              fontWeight: 600,
              opacity: isQueued ? 1 : 0.5,
            }}
          >
            Queued
          </span>
          <span
            style={{
              border: "2px solid #22c55e",
              color: "#15803d",
              borderRadius: "8px",
              padding: "2px 10px",
              fontWeight: 600,
              opacity: isSuccessful ? 1 : 0.5,
            }}
          >
            Successful
          </span>
        </div>
      </div>

      {loading && <p style={{ color: "#6b7280" }}>Checking status...</p>}
      {error && <p style={{ color: "#b91c1c" }}>{error}</p>}
    </>
  );
}
