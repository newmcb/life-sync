import { NextResponse } from "next/server";
import {
  guestFinanceSummary,
  guestSchedule,
  guestSecret,
  guestTodos,
} from "@/data/sampleData";

export async function GET() {
  return NextResponse.json({
    schedule: guestSchedule,
    todos: guestTodos,
    finance: guestFinanceSummary,
    secret: guestSecret,
  });
}
