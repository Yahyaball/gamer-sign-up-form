export type FieldStatus = "pending" | "ok" | "locked" | "error";
export type FieldName = "callsign" | "email" | "password" | "confirm" | "terms";
export type FieldState = { status: FieldStatus; text: string };
