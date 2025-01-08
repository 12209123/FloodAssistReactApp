let currentRegisteredEmergencyId: number | null = null;

export function getCurrentRegisteredEmergency(): number | null {
  return currentRegisteredEmergencyId;
}

export function isAnyEmergencyRegistered(): boolean {
  return currentRegisteredEmergencyId !== null;
}

export function setCurrentRegisteredEmergency(id: number | null) {
  currentRegisteredEmergencyId = id;
}
