
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BluetoothIcon, Search, Loader2, Wifi, Signal, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { BluetoothService, BluetoothDevice } from "@/services/bluetoothService";

interface BluetoothPairingProps {
  onConnect: (deviceName: string) => void;
}

const BluetoothPairing = ({ onConnect }: BluetoothPairingProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const [isConnecting, setIsConnecting] = useState<string | null>(null);
  const [availableDevices, setAvailableDevices] = useState<BluetoothDevice[]>([]);
  const [bluetoothEnabled, setBluetoothEnabled] = useState<boolean | null>(null);
  const { toast } = useToast();
  const bluetoothService = BluetoothService.getInstance();

  const checkBluetoothStatus = async () => {
    try {
      const enabled = await bluetoothService.isBluetoothEnabled();
      setBluetoothEnabled(enabled);
      
      if (!enabled) {
        toast({
          title: "Bluetooth Disabled",
          description: "Please enable Bluetooth in your device settings",
          variant: "destructive"
        });
      }
      
      return enabled;
    } catch (error) {
      console.error('Bluetooth status check failed:', error);
      setBluetoothEnabled(false);
      toast({
        title: "Bluetooth Error",
        description: "Failed to check Bluetooth status",
        variant: "destructive"
      });
      return false;
    }
  };

  const scanForDevices = async () => {
    setIsScanning(true);
    setAvailableDevices([]);
    
    try {
      // Check if Bluetooth is enabled first
      const enabled = await checkBluetoothStatus();
      if (!enabled) {
        setIsScanning(false);
        return;
      }

      toast({
        title: "Scanning Started",
        description: "Looking for nearby devices...",
      });

      const devices = await bluetoothService.scanForDevices(10000); // 10 second scan
      
      setAvailableDevices(devices);
      setIsScanning(false);
      
      if (devices.length > 0) {
        toast({
          title: "Scan Complete",
          description: `Found ${devices.length} compatible device(s)`,
        });
      } else {
        toast({
          title: "No Devices Found",
          description: "Make sure your device is in pairing mode and nearby",
          variant: "destructive"
        });
      }
    } catch (error) {
      setIsScanning(false);
      console.error('Device scan failed:', error);
      toast({
        title: "Scan Failed",
        description: "Could not scan for Bluetooth devices. Check permissions.",
        variant: "destructive"
      });
    }
  };

  const connectToDevice = async (device: BluetoothDevice) => {
    setIsConnecting(device.deviceId);
    
    try {
      toast({
        title: "Connecting...",
        description: `Connecting to ${device.name}`,
      });

      await bluetoothService.connectToDevice(device.deviceId);
      
      setIsConnecting(null);
      onConnect(device.name || 'Unknown Device');
      
      toast({
        title: "Device Connected",
        description: `Successfully connected to ${device.name}`,
      });
    } catch (error) {
      setIsConnecting(null);
      console.error('Connection failed:', error);
      toast({
        title: "Connection Failed",
        description: `Could not connect to ${device.name}. Please try again.`,
        variant: "destructive"
      });
    }
  };

  const getSignalStrengthIcon = (rssi?: number) => {
    if (!rssi) return <Wifi className="w-4 h-4 text-gray-400" />;
    
    if (rssi > -50) return <Signal className="w-4 h-4 text-green-500" />;
    if (rssi > -70) return <Signal className="w-4 h-4 text-yellow-500" />;
    return <Signal className="w-4 h-4 text-red-500" />;
  };

  const getSignalStrengthText = (rssi?: number) => {
    if (!rssi) return "Unknown";
    
    if (rssi > -50) return "Excellent";
    if (rssi > -70) return "Good";
    return "Weak";
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BluetoothIcon className="w-5 h-5 text-blue-600" />
          Pair Device
        </CardTitle>
        <CardDescription>
          Connect your mosquito repellent device via Bluetooth LE
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {bluetoothEnabled === false && (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 border border-red-200">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <div className="text-sm text-red-800">
              <p className="font-medium">Bluetooth Disabled</p>
              <p>Please enable Bluetooth in your device settings</p>
            </div>
          </div>
        )}

        <Button 
          onClick={scanForDevices}
          disabled={isScanning || bluetoothEnabled === false}
          className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
        >
          {isScanning ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Scanning for BLE devices...
            </>
          ) : (
            <>
              <Search className="w-4 h-4 mr-2" />
              Scan for Devices
            </>
          )}
        </Button>

        {availableDevices.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-sm text-gray-700">Available Devices:</h4>
            {availableDevices.map((device) => (
              <div 
                key={device.deviceId}
                className="flex items-center justify-between p-3 rounded-lg border bg-gray-50/80 hover:bg-gray-100/80 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{device.name}</span>
                      {getSignalStrengthIcon(device.rssi)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {device.deviceId.slice(-8)} • {getSignalStrengthText(device.rssi)}
                      {device.rssi && ` (${device.rssi} dBm)`}
                    </div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => connectToDevice(device)}
                  disabled={isConnecting === device.deviceId}
                  className="bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600"
                >
                  {isConnecting === device.deviceId ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Connect"
                  )}
                </Button>
              </div>
            ))}
          </div>
        )}

        {!isScanning && availableDevices.length === 0 && bluetoothEnabled !== false && (
          <div className="text-center py-4 text-gray-500">
            <BluetoothIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No devices found. Make sure your device is in pairing mode.</p>
            <p className="text-xs text-gray-400 mt-1">Looking for VeraShield and compatible BLE devices</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BluetoothPairing;
