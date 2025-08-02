import { BleClient } from '@capacitor-community/bluetooth-le';
import { BluetoothDevice } from './types';

export class BluetoothConnection {
  private connectedDevice: BluetoothDevice | null = null;

  async connectToDevice(deviceId: string): Promise<BluetoothDevice> {
    try {
      await BleClient.connect(deviceId, (disconnectedDeviceId) => {
        console.log(`Device ${disconnectedDeviceId} disconnected`);
        this.connectedDevice = null;
      });

      // Get device info after connection
      const services = await BleClient.getServices(deviceId);
      console.log('Available services:', services);

      // Store connected device info
      this.connectedDevice = {
        deviceId,
        name: `Connected Device ${deviceId.slice(-4)}`,
        uuids: services.map(s => s.uuid),
      };

      console.log('Successfully connected to device:', deviceId);
      return this.connectedDevice;
    } catch (error) {
      console.error('Failed to connect to device:', error);
      throw new Error('Device connection failed');
    }
  }

  async disconnectDevice(): Promise<void> {
    if (this.connectedDevice) {
      try {
        await BleClient.disconnect(this.connectedDevice.deviceId);
        this.connectedDevice = null;
        console.log('Device disconnected successfully');
      } catch (error) {
        console.error('Error disconnecting device:', error);
        throw new Error('Device disconnection failed');
      }
    }
  }

  getConnectedDevice(): BluetoothDevice | null {
    return this.connectedDevice;
  }

  isConnected(): boolean {
    return this.connectedDevice !== null;
  }

  async sendSprayCommand(intensity: number = 50): Promise<void> {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    try {
      // This would be specific to your device's service/characteristic UUIDs
      const serviceUuid = '12345678-1234-5678-9012-123456789abc';
      const characteristicUuid = '12345678-1234-5678-9012-123456789abd';
      
      // Create command data (example format) - Convert to DataView
      const buffer = new ArrayBuffer(2);
      const dataView = new DataView(buffer);
      dataView.setUint8(0, 0x01); // Command: Spray
      dataView.setUint8(1, intensity); // Intensity: 0-100
      
      await BleClient.write(
        this.connectedDevice.deviceId,
        serviceUuid,
        characteristicUuid,
        dataView
      );
      
      console.log(`Spray command sent with intensity: ${intensity}`);
    } catch (error) {
      console.error('Failed to send spray command:', error);
      throw new Error('Spray command failed');
    }
  }
}