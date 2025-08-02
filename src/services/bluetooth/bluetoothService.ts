import { BleClient } from '@capacitor-community/bluetooth-le';
import { BluetoothDevice, DeviceData } from './types';
import { BluetoothScanner } from './scanner';
import { BluetoothConnection } from './connection';
import { BluetoothDataManager } from './dataManager';

export class BluetoothService {
  private static instance: BluetoothService;
  private isInitialized = false;
  private scanner: BluetoothScanner;
  private connection: BluetoothConnection;
  private dataManager: BluetoothDataManager;

  private constructor() {
    this.scanner = new BluetoothScanner();
    this.connection = new BluetoothConnection();
    this.dataManager = new BluetoothDataManager();
  }

  public static getInstance(): BluetoothService {
    if (!BluetoothService.instance) {
      BluetoothService.instance = new BluetoothService();
    }
    return BluetoothService.instance;
  }

  async initialize(): Promise<void> {
    if (this.isInitialized) return;

    try {
      // Initialize BLE client
      await BleClient.initialize();
      
      // Note: Permissions are handled automatically by the plugin on Android
      // For iOS, permissions are requested when needed
      
      this.isInitialized = true;
      console.log('Bluetooth service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize Bluetooth service:', error);
      throw new Error('Bluetooth initialization failed');
    }
  }

  async isBluetoothEnabled(): Promise<boolean> {
    try {
      await this.initialize();
      return await BleClient.isEnabled();
    } catch (error) {
      console.error('Error checking Bluetooth status:', error);
      return false;
    }
  }

  async scanForDevices(timeoutMs: number = 10000): Promise<BluetoothDevice[]> {
    await this.initialize();
    return this.scanner.scanForDevices(timeoutMs);
  }

  async connectToDevice(deviceId: string): Promise<void> {
    await this.initialize();
    const device = await this.connection.connectToDevice(deviceId);
    
    // Start reading device data after successful connection
    if (device) {
      await this.readDeviceData();
    }
  }

  async disconnectDevice(): Promise<void> {
    await this.connection.disconnectDevice();
    this.dataManager.clearDeviceData();
  }

  async sendSprayCommand(intensity: number = 50): Promise<void> {
    return this.connection.sendSprayCommand(intensity);
  }

  getConnectedDevice(): BluetoothDevice | null {
    return this.connection.getConnectedDevice();
  }

  isConnected(): boolean {
    return this.connection.isConnected();
  }

  async readDeviceData(): Promise<DeviceData> {
    const connectedDevice = this.connection.getConnectedDevice();
    if (!connectedDevice) {
      return this.dataManager.getPlaceholderData();
    }
    
    return this.dataManager.readDeviceData(connectedDevice.deviceId);
  }

  getDeviceData(): DeviceData {
    return this.isConnected() 
      ? this.dataManager.getDeviceData() 
      : this.dataManager.getPlaceholderData();
  }

  async refreshDeviceData(): Promise<DeviceData> {
    if (this.isConnected()) {
      return await this.readDeviceData();
    }
    return this.dataManager.getPlaceholderData();
  }
}

// Export the service types for use in components
export type { BluetoothDevice, DeviceData };