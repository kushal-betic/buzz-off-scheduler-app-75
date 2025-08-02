import { BluetoothServiceConfig } from './types';

export const BLUETOOTH_CONFIG: BluetoothServiceConfig = {
  // Common service UUIDs for mosquito repellent devices
  TARGET_SERVICE_UUIDS: [
    '12345678-1234-5678-9012-123456789abc', // Custom mosquito repellent service
    '0000180F-0000-1000-8000-00805F9B34FB', // Battery Service
    '0000180A-0000-1000-8000-00805F9B34FB', // Device Information Service
  ],

  // Characteristic UUIDs for reading device data
  CHARACTERISTICS: {
    BATTERY_LEVEL: '00002A19-0000-1000-8000-00805F9B34FB',
    DEVICE_STATUS: '12345678-1234-5678-9012-123456789abd',
    SPRAY_SETTINGS: '12345678-1234-5678-9012-123456789abe',
    SCHEDULE_DATA: '12345678-1234-5678-9012-123456789abf',
  },
};