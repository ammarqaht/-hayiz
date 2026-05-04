export type Cafe = {
  id: string;
  name: string;
  area: string;
  rating: number;
  reviews: number;
  image: string;
  pricePerHour: number;
  seatsAvailable: number;
  seatsTotal: number;
  wifi: "fast" | "fastest" | "good";
  noise: "silent" | "calm" | "lively";
  amenities: string[];
  // normalized 0..1 coords on our stylized Riyadh map
  x: number;
  y: number;
  tags: string[];
};

export const cafes: Cafe[] = [
  {
    id: "elm-grove",
    name: "Elm & Grove",
    area: "Al Olaya",
    rating: 4.9,
    reviews: 312,
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 22,
    seatsAvailable: 8,
    seatsTotal: 24,
    wifi: "fastest",
    noise: "calm",
    amenities: ["Power outlets", "Quiet zone", "Specialty coffee", "Outdoor"],
    x: 0.42,
    y: 0.36,
    tags: ["Quiet", "Premium"],
  },
  {
    id: "north-pour",
    name: "North Pour",
    area: "Al Malqa",
    rating: 4.8,
    reviews: 218,
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 18,
    seatsAvailable: 14,
    seatsTotal: 30,
    wifi: "fastest",
    noise: "calm",
    amenities: ["Booths", "Meeting room", "Power outlets"],
    x: 0.32,
    y: 0.18,
    tags: ["Meeting", "Spacious"],
  },
  {
    id: "qahwa-lab",
    name: "Qahwa Lab",
    area: "Diplomatic Quarter",
    rating: 4.7,
    reviews: 401,
    image:
      "https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 25,
    seatsAvailable: 3,
    seatsTotal: 18,
    wifi: "fast",
    noise: "lively",
    amenities: ["Specialty coffee", "Outdoor", "Pets welcome"],
    x: 0.18,
    y: 0.32,
    tags: ["Trendy"],
  },
  {
    id: "atlas-coffee",
    name: "Atlas Coffee Co.",
    area: "King Abdullah Rd",
    rating: 4.6,
    reviews: 156,
    image:
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 16,
    seatsAvailable: 21,
    seatsTotal: 32,
    wifi: "good",
    noise: "lively",
    amenities: ["Late night", "Booths", "Power outlets"],
    x: 0.56,
    y: 0.5,
    tags: ["Late night"],
  },
  {
    id: "sand-salt",
    name: "Sand & Salt",
    area: "Al Yasmin",
    rating: 4.9,
    reviews: 522,
    image:
      "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 28,
    seatsAvailable: 0,
    seatsTotal: 22,
    wifi: "fastest",
    noise: "silent",
    amenities: ["Silent zone", "Phone booths", "Specialty coffee"],
    x: 0.38,
    y: 0.12,
    tags: ["Silent", "Premium"],
  },
  {
    id: "ember-house",
    name: "Ember House",
    area: "Al Nakheel",
    rating: 4.5,
    reviews: 92,
    image:
      "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 14,
    seatsAvailable: 11,
    seatsTotal: 28,
    wifi: "good",
    noise: "calm",
    amenities: ["Power outlets", "Outdoor"],
    x: 0.62,
    y: 0.28,
    tags: ["Affordable"],
  },
  {
    id: "mira-roastery",
    name: "Mira Roastery",
    area: "Al Hamra",
    rating: 4.8,
    reviews: 287,
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 20,
    seatsAvailable: 6,
    seatsTotal: 20,
    wifi: "fastest",
    noise: "calm",
    amenities: ["Specialty coffee", "Power outlets", "Pastries"],
    x: 0.74,
    y: 0.4,
    tags: ["Roastery"],
  },
  {
    id: "loop-bake",
    name: "Loop & Bake",
    area: "Al Sahafah",
    rating: 4.7,
    reviews: 178,
    image:
      "https://images.unsplash.com/photo-1559496417-e7f25cb247f3?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 17,
    seatsAvailable: 9,
    seatsTotal: 26,
    wifi: "fast",
    noise: "lively",
    amenities: ["Bakery", "Power outlets", "Outdoor"],
    x: 0.28,
    y: 0.62,
    tags: ["Bakery"],
  },
  {
    id: "linea-cafe",
    name: "Linea Café",
    area: "King Fahd Rd",
    rating: 4.6,
    reviews: 211,
    image:
      "https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=1200&q=80",
    pricePerHour: 19,
    seatsAvailable: 12,
    seatsTotal: 24,
    wifi: "fast",
    noise: "calm",
    amenities: ["Meeting room", "Power outlets", "Specialty coffee"],
    x: 0.5,
    y: 0.7,
    tags: ["Meeting"],
  },
];

export const featured = cafes.slice(0, 6);

// The café the user is most likely to visit — drives the default in the
// reserve dialog and the "your bookings here" example flow.
export const PINNED_CAFE_ID = "elm-grove";

export function getCafeById(id: string): Cafe | undefined {
  return cafes.find((c) => c.id === id);
}

export const ownerOverview = {
  todayRevenue: 4280,
  todayBookings: 47,
  occupancy: 78,
  avgRating: 4.8,
  weeklyRevenue: [
    { d: "Mon", v: 2400 },
    { d: "Tue", v: 3100 },
    { d: "Wed", v: 2780 },
    { d: "Thu", v: 3890 },
    { d: "Fri", v: 4490 },
    { d: "Sat", v: 5200 },
    { d: "Sun", v: 4280 },
  ],
  hourlyOccupancy: [
    { h: "8a", v: 18 },
    { h: "9a", v: 32 },
    { h: "10a", v: 56 },
    { h: "11a", v: 71 },
    { h: "12p", v: 84 },
    { h: "1p", v: 78 },
    { h: "2p", v: 88 },
    { h: "3p", v: 92 },
    { h: "4p", v: 81 },
    { h: "5p", v: 64 },
    { h: "6p", v: 49 },
    { h: "7p", v: 38 },
  ],
  channels: [
    { name: "HAYIZ App", value: 64 },
    { name: "Walk-in", value: 22 },
    { name: "Partners", value: 14 },
  ],
};

