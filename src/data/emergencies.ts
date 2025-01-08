export interface EmergencyWaypoint {
  id: number;
  position: [number, number];
  priority: string;
  title: string;
  description: string;
  ownerId?: string;
}

export const emergencies: EmergencyWaypoint[] = [
  {
    id: 1,
    position: [48.329, 14.294],
    priority: "High",
    title: "Emergency in Willersdorf",
    description: "Heavy rainfall area. Consider filling sandbags.",
  },
  {
    id: 2,
    position: [48.315, 14.25],
    priority: "Medium",
    title: "Emergency in Oberbairing",
    description: "Moderate flooding expected. Secure valuables.",
  },
  {
    id: 3,
    position: [48.31, 14.31],
    priority: "Low",
    title: "Emergency in Außertreffling",
    description: "Light flood risk. Stay informed.",
  },
];
