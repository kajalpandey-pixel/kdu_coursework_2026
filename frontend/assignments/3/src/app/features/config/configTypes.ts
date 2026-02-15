export interface CleaningType {
  id: string;
  label: string;
  basePrice: number;
}

export interface Frequency{
  id: string;
  label: string;
}

export interface Extra {
  id: string;
  label: string;
  price: number;
}

export interface TimeSlot {
  id: string;
  label: string;
  available: boolean;
}

export interface ConfigState {
  cleaningTypes: CleaningType[];
  frequencies: Frequency[];
  extras: Extra[];
  timeSlots: TimeSlot[];
  loading: boolean;
  error: string | null;
}
