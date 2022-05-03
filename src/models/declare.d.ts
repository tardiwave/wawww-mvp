declare interface DeviceOrientationEvent {
  webkitCompassHeading: number | null;
  webkitCompassAccuracy: number | null;
  requestPermission: () => Promise<PermissionState>;
}