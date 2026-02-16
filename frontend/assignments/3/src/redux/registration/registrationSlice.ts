import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const API_URL =
  "https://7wmjl1l9lb.execute-api.ap-south-1.amazonaws.com/prod/registration";

export interface RegistrationState {
  name: string;
  email: string;
  event: string;
  message?: string;
  registrationId: string;
  registrationStatus: string;
  loading: boolean;
  error: string | null;
}

const initialState: RegistrationState = {
  name: "",
  email: "",
  event: "",
  message: "",
  registrationId: "",
  registrationStatus: "Queued",
  loading: false,
  error: null,
};

type ApiResponse = Record<string, unknown>;

type MappedState = Pick<
  RegistrationState,
  "name" | "email" | "event" | "message" | "registrationId" | "registrationStatus"
>;

const toRecord = (value: unknown): Record<string, unknown> | null => {
  if (typeof value === "object" && value !== null) return value as Record<string, unknown>;
  return null;
};

const toStringValue = (value: unknown): string | undefined => {
  return typeof value === "string" ? value : undefined;
};

const mapApi = (payload: ApiResponse, current: RegistrationState): MappedState => {
  const data =
    toRecord(payload.data) ??
    toRecord(payload.item) ??
    toRecord(payload.registration) ??
    payload;

  return {
    name: toStringValue(data.name) ?? current.name,
    email: toStringValue(data.email) ?? current.email,
    event: toStringValue(data.event) ?? current.event,
    message: toStringValue(data.message) ?? current.message,
    registrationId:
      toStringValue(data.registrationId) ??
      toStringValue(data.registration_id) ??
      toStringValue(data.id) ??
      current.registrationId,
    registrationStatus:
      toStringValue(data.status) ??
      toStringValue(data.registrationStatus) ??
      current.registrationStatus,
  };
};

export const submitRegistration = createAsyncThunk<ApiResponse, Pick<RegistrationState, "name" | "email" | "event" | "message">>(
  "registration/submit",
  async (data) => {
    console.log("Submitting registration with data:", data);
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) throw new Error("Failed");

    return (await res.json()) as ApiResponse;
  }
);

type fetchResponse = {
    status: string;
}

export const fetchRegistrationStatus = createAsyncThunk<
  fetchResponse,
  string,
  { rejectValue: string }
  >
  ("registration/fetchStatus", async (id, { rejectWithValue }) => {
  try {
    const res = await fetch(`https://7wmjl1l9lb.execute-api.ap-south-1.amazonaws.com/prod/registration-status/${encodeURIComponent(id)}`);

    if (res.status === 404) return rejectWithValue("id not found");
    if (!res.ok) return rejectWithValue("Failed to fetch");

    return (await res.json()) as fetchResponse;
  } catch {     
    return rejectWithValue("Failed to fetch");
  }
});

export const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setEvent: (state, action) => {
      state.event = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRegistration.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitRegistration.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        // state.registrationId = action.payload
        console.log("submitRegistration.fulfilled", { payload: action.payload });
        Object.assign(state, mapApi(action.payload, state));
      })
      .addCase(submitRegistration.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed";
      })
      .addCase(fetchRegistrationStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRegistrationStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        Object.assign(state, mapApi(action.payload, state));
        state.registrationStatus =  action.payload.status;
      })
      .addCase(fetchRegistrationStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? action.error.message ?? "Failed to fetch";
      });
  },
});

export const { setName, setEmail, setEvent, setMessage } = registrationSlice.actions;

export default registrationSlice.reducer;
