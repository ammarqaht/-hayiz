import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(n: number) {
  return new Intl.NumberFormat("en-US").format(n);
}

export function formatCurrency(n: number, currency = "SAR") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
}

const dayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function pad2(n: number) {
  return n.toString().padStart(2, "0");
}

export function formatTime(d: Date) {
  return `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}

export function formatDayLabel(d: Date) {
  const today = new Date();
  const isSameDay =
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate();
  if (isSameDay) return "Today";

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const isTomorrow =
    d.getFullYear() === tomorrow.getFullYear() &&
    d.getMonth() === tomorrow.getMonth() &&
    d.getDate() === tomorrow.getDate();
  if (isTomorrow) return "Tomorrow";

  return `${dayShort[d.getDay()]} · ${monthShort[d.getMonth()]} ${d.getDate()}`;
}

export function formatDateRange(startISO: string, durationMinutes: number) {
  const start = new Date(startISO);
  const end = new Date(start.getTime() + durationMinutes * 60_000);
  return `${formatTime(start)} — ${formatTime(end)}`;
}

export function isoDateKey(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

// Round up to the next half-hour for default reservation start.
export function nextHalfHour(now: Date = new Date()) {
  const d = new Date(now);
  d.setSeconds(0, 0);
  const minutes = d.getMinutes();
  const add = minutes < 30 ? 30 - minutes : 60 - minutes;
  d.setMinutes(minutes + add);
  return d;
}

export function toLocalDatetimeInputValue(d: Date) {
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(
    d.getDate()
  )}T${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
}
