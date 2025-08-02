
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Bluetooth, Wifi, Signal, Settings, Power } from "lucide-react";

const BluetoothSettings = () => {
  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bluetooth className="w-5 h-5 text-blue-600" />
            Bluetooth Connection
          </CardTitle>
          <CardDescription>
            Manage your device's Bluetooth connectivity
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <p className="font-medium text-green-800">VeraShield Pro</p>
                <p className="text-sm text-green-600">Connected</p>
              </div>
            </div>
            <Badge className="bg-green-500 text-white">
              Strong Signal
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Connection Details */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Signal className="w-5 h-5 text-purple-600" />
            Connection Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="font-medium text-gray-700">Protocol:</span>
              <p className="text-gray-600">Bluetooth 5.0 LE</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Range:</span>
              <p className="text-gray-600">30 meters</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Signal Strength:</span>
              <p className="text-gray-600">-45 dBm (Excellent)</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Data Rate:</span>
              <p className="text-gray-600">2 Mbps</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Encryption:</span>
              <p className="text-gray-600">AES-128</p>
            </div>
            <div>
              <span className="font-medium text-gray-700">Power Class:</span>
              <p className="text-gray-600">Class 2</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium">Auto-Reconnect</p>
              <p className="text-sm text-gray-600">Automatically reconnect when in range</p>
            </div>
            <Badge className="bg-green-100 text-green-800">Enabled</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium">Low Power Mode</p>
              <p className="text-sm text-gray-600">Optimize for battery life</p>
            </div>
            <Badge className="bg-blue-100 text-blue-800">Active</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg border">
            <div>
              <p className="font-medium">Security Level</p>
              <p className="text-sm text-gray-600">Connection encryption strength</p>
            </div>
            <Badge className="bg-purple-100 text-purple-800">High</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BluetoothSettings;
