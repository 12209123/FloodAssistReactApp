export interface EmergencyWaypoint {
  id: number;
  position: [number, number];
  priority: string;
  title: string;
  description: string;
  ownerId?: string;
  type: string;
}

export const emergencies: EmergencyWaypoint[] = [
  {
    id: 1,
    position: [48.329, 14.294],
    priority: "High",
    title: "Emergency in Urfahr",
    description: "Heavy rainfall area. Consider filling sandbags.",
    type: "official",
  },
  {
    id: 2,
    position: [48.315, 14.25],
    priority: "Medium",
    title: "Emergency near Pöstlingberg",
    description: "Moderate flooding expected. Secure valuables.",
    type: "official",
  },
  {
    id: 3,
    position: [48.31979111554351, 14.33870315551758],
    priority: "Low",
    title: "Emergency in Plesching",
    description: "Light flood risk. Stay informed.",
    type: "official",
  },
];
