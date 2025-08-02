import { BleClient } from '@capacitor-community/bluetooth-le';
import { BluetoothDevice } from './types';
import { BLUETOOTH_CONFIG } from './config';

export class BluetoothScanner {
  async scanForDevices(timeoutMs: number = 10000): Promise<BluetoothDevice[]> {
    const devices: BluetoothDevice[] = [];
    const deviceMap = new Map<string, BluetoothDevice>();

    try {
      // Start scanning for devices
      await BleClient.requestLEScan(
        {
          services: [], // Scan for all devices initially
          allowDuplicates: false,
        },
        (result) => {
          // Filter for relevant devices (mosquito repellent or generic BLE devices)
          if (this.isRelevantDevice(result)) {
            const device: BluetoothDevice = {
              deviceId: result.device.deviceId,
              name: result.device.name || `Device ${result.device.deviceId.slice(-4)}`,
              uuids: result.device.uuids || [],
              rssi: result.rssi,
            };
            
            // Avoid duplicates
            if (!deviceMap.has(device.deviceId)) {
              deviceMap.set(device.deviceId, device);
              devices.push(device);
            }
          }
        }
      );

      // Stop scanning after timeout
      setTimeout(async () => {
        await BleClient.stopLEScan();
      }, timeoutMs);

      return devices;
    } catch (error) {
      console.error('Error scanning for devices:', error);
      await BleClient.stopLEScan();
      throw new Error('Device scan failed');
    }
  }

  private isRelevantDevice(result: any): boolean {
    const device = result.device;
    
    // Check if device has a name (usually indicates it's configurable)
    if (device.name) {
      const nameUpperCase = device.name.toUpperCase();
      // Look for mosquito repellent related keywords
      if (nameUpperCase.includes('VERA') || 
          nameUpperCase.includes('SHIELD') || 
          nameUpperCase.includes('REPELLENT') || 
          nameUpperCase.includes('MOSQUITO') ||
          nameUpperCase.includes('SPRAY') ||
          nameUpperCase.includes('BUG')) {
        return true;
      }
    }

    // Check if device advertises relevant services
    if (device.uuids && device.uuids.length > 0) {
      return device.uuids.some((uuid: string) => 
        BLUETOOTH_CONFIG.TARGET_SERVICE_UUIDS.some(targetUuid => 
          uuid.toLowerCase().includes(targetUuid.toLowerCase())
        )
      );
    }

    // Accept devices with good signal strength (likely nearby controllable devices)
    if (result.rssi && result.rssi > -60) {
      return true;
    }

    return false;
  }
}