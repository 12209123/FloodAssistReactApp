import emergenciesData from "../../public/emergencies.json";
export interface EmergencyWaypoint {
  id: number;
  position: [number, number];
  priority: string;
  title: string;
  description: string;
}

export const emergencies: EmergencyWaypoint[] = emergenciesData.map((data) => ({
  ...data,
  position: [data.position[0], data.position[1]] as [number, number],
}));
