import { BleClient } from '@capacitor-community/bluetooth-le';
import { DeviceData } from './types';
import { BLUETOOTH_CONFIG } from './config';

export class BluetoothDataManager {
  private deviceData: DeviceData = {};

  async readDeviceData(deviceId: string): Promise<DeviceData> {
    try {
      const deviceData: DeviceData = {};

      // Read battery level
      try {
        const batteryData = await BleClient.read(
          deviceId,
          '0000180F-0000-1000-8000-00805F9B34FB', // Battery Service
          BLUETOOTH_CONFIG.CHARACTERISTICS.BATTERY_LEVEL
        );
        deviceData.batteryLevel = new DataView(batteryData.buffer).getUint8(0);
      } catch (error) {
        console.log('Battery level not available');
      }

      // Read device status and settings
      try {
        const statusData = await BleClient.read(
          deviceId,
          '12345678-1234-5678-9012-123456789abc',
          BLUETOOTH_CONFIG.CHARACTERISTICS.DEVICE_STATUS
        );
        const statusView = new DataView(statusData.buffer);
        deviceData.sprayIntensity = statusView.getUint8(0);
        deviceData.isActive = statusView.getUint8(1) === 1;
        deviceData.deviceMode = statusView.getUint8(2) === 1 ? 'auto' : 'manual';
        deviceData.sprayCount = statusView.getUint16(3, true);
      } catch (error) {
        console.log('Device status not available');
      }

      // Read schedule data
      try {
        const scheduleData = await BleClient.read(
          deviceId,
          '12345678-1234-5678-9012-123456789abc',
          BLUETOOTH_CONFIG.CHARACTERISTICS.SCHEDULE_DATA
        );
        const scheduleView = new DataView(scheduleData.buffer);
        const scheduleCount = scheduleView.getUint8(0);
        const scheduledTimes: string[] = [];
        
        for (let i = 0; i < scheduleCount && i < 8; i++) {
          const hour = scheduleView.getUint8(1 + i * 2);
          const minute = scheduleView.getUint8(2 + i * 2);
          if (hour < 24 && minute < 60) {
            scheduledTimes.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`);
          }
        }
        deviceData.scheduledTimes = scheduledTimes;
      } catch (error) {
        console.log('Schedule data not available');
      }

      // Store the data and return it
      this.deviceData = { ...this.deviceData, ...deviceData };
      return this.deviceData;
    } catch (error) {
      console.error('Error reading device data:', error);
      return this.getPlaceholderData();
    }
  }

  getDeviceData(): DeviceData {
    return this.deviceData;
  }

  getPlaceholderData(): DeviceData {
    return {
      batteryLevel: 85,
      sprayIntensity: 50,
      isActive: false,
      scheduledTimes: ['08:00', '20:00'],
      sprayCount: 24,
      deviceMode: 'auto',
      firmwareVersion: '1.2.1'
    };
  }

  clearDeviceData(): void {
    this.deviceData = {};
  }
}