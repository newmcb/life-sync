import { NextResponse } from "next/server";
import {
  guestFinanceSummary,
  guestSchedule,
  guestTodos,
} from "@/data/sampleData";

export async function GET() {
  return NextResponse.json({
    schedule: guestSchedule,
    todos: guestTodos,
    finance: guestFinanceSummary,
  });
}
