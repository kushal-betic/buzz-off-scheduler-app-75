export interface BluetoothDevice {
  deviceId: string;
  name: string | null;
  uuids: string[];
  rssi?: number;
}

export interface DeviceData {
  batteryLevel?: number;
  sprayIntensity?: number;
  isActive?: boolean;
  scheduledTimes?: string[];
  lastSprayTime?: Date;
  sprayCount?: number;
  deviceMode?: 'auto' | 'manual';
  firmwareVersion?: string;
}

export interface BluetoothServiceConfig {
  TARGET_SERVICE_UUIDS: string[];
  CHARACTERISTICS: {
    BATTERY_LEVEL: string;
    DEVICE_STATUS: string;
    SPRAY_SETTINGS: string;
    SCHEDULE_DATA: string;
  };
}