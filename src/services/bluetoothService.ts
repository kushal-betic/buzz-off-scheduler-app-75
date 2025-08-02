import { BleClient, BleDevice } from '@capacitor-community/bluetooth-le';

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

export class BluetoothService {
  private static instance: BluetoothService;
  private isInitialized = false;
  private connectedDevice: BluetoothDevice | null = null;
  private deviceData: DeviceData = {};

  // Common service UUIDs for mosquito repellent devices
  private readonly TARGET_SERVICE_UUIDS = [
    '12345678-1234-5678-9012-123456789abc', // Custom mosquito repellent service
    '0000180F-0000-1000-8000-00805F9B34FB', // Battery Service
    '0000180A-0000-1000-8000-00805F9B34FB', // Device Information Service
  ];

  // Characteristic UUIDs for reading device data
  private readonly CHARACTERISTICS = {
    BATTERY_LEVEL: '00002A19-0000-1000-8000-00805F9B34FB',
    DEVICE_STATUS: '12345678-1234-5678-9012-123456789abd',
    SPRAY_SETTINGS: '12345678-1234-5678-9012-123456789abe',
    SCHEDULE_DATA: '12345678-1234-5678-9012-123456789abf',
  };

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
        this.TARGET_SERVICE_UUIDS.some(targetUuid => 
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

  async connectToDevice(deviceId: string): Promise<void> {
    await this.initialize();

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
      
      // Start reading device data after successful connection
      await this.readDeviceData();
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

  async sendSprayCommand(intensity: number = 50): Promise<void> {
    if (!this.connectedDevice) {
      throw new Error('No device connected');
    }

    try {
      // This would be specific to your device's service/characteristic UUIDs
      // You'll need to replace these with actual UUIDs from your mosquito repellent device
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

  getConnectedDevice(): BluetoothDevice | null {
    return this.connectedDevice;
  }

  isConnected(): boolean {
    return this.connectedDevice !== null;
  }

  async readDeviceData(): Promise<DeviceData> {
    if (!this.connectedDevice) {
      return this.getPlaceholderData();
    }

    try {
      const deviceData: DeviceData = {};

      // Read battery level
      try {
        const batteryData = await BleClient.read(
          this.connectedDevice.deviceId,
          '0000180F-0000-1000-8000-00805F9B34FB', // Battery Service
          this.CHARACTERISTICS.BATTERY_LEVEL
        );
        deviceData.batteryLevel = new DataView(batteryData.buffer).getUint8(0);
      } catch (error) {
        console.log('Battery level not available');
      }

      // Read device status and settings
      try {
        const statusData = await BleClient.read(
          this.connectedDevice.deviceId,
          '12345678-1234-5678-9012-123456789abc',
          this.CHARACTERISTICS.DEVICE_STATUS
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
          this.connectedDevice.deviceId,
          '12345678-1234-5678-9012-123456789abc',
          this.CHARACTERISTICS.SCHEDULE_DATA
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
    return this.isConnected() ? this.deviceData : this.getPlaceholderData();
  }

  private getPlaceholderData(): DeviceData {
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

  async refreshDeviceData(): Promise<DeviceData> {
    if (this.isConnected()) {
      return await this.readDeviceData();
    }
    return this.getPlaceholderData();
  }
}