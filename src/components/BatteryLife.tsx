
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Battery, Zap, Clock, TrendingUp, Power } from "lucide-react";

const BatteryLife = () => {
  const batteryLevel = 78;
  const estimatedDays = 12;
  
  return (
    <div className="space-y-6">
      {/* Current Battery Status */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Battery className="w-5 h-5 text-green-600" />
            Battery Status
          </CardTitle>
          <CardDescription>
            Current power level and usage statistics
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">{batteryLevel}%</div>
            <Progress value={batteryLevel} className="w-full h-3 mb-3" />
            <Badge className="bg-green-500 text-white">
              Good Level
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="text-center p-3 rounded-lg bg-blue-50">
              <Clock className="w-5 h-5 text-blue-600 mx-auto mb-1" />
              <p className="font-medium text-blue-800">{estimatedDays} Days</p>
              <p className="text-xs text-blue-600">Estimated Runtime</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-50">
              <Zap className="w-5 h-5 text-purple-600 mx-auto mb-1" />
              <p className="font-medium text-purple-800">2000mAh</p>
              <p className="text-xs text-purple-600">Total Capacity</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Battery Usage History */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-orange-600" />
            Usage History
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm font-medium">Today</span>
              <span className="text-sm text-gray-600">-8% (Normal Usage)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm font-medium">Yesterday</span>
              <span className="text-sm text-gray-600">-12% (High Usage)</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
              <span className="text-sm font-medium">Last 7 Days</span>
              <span className="text-sm text-gray-600">-65% Average</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Power Management Tips */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Power className="w-5 h-5 text-indigo-600" />
            Power Saving Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3 text-sm">
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="font-medium text-green-800">✓ Use Medium Intensity</p>
              <p className="text-green-600">Reduces power consumption by 30%</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <p className="font-medium text-blue-800">💡 Schedule Smart Spraying</p>
              <p className="text-blue-600">Only spray when needed for optimal efficiency</p>
            </div>
            <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
              <p className="font-medium text-yellow-800">🔋 Enable Auto Sleep</p>
              <p className="text-yellow-600">Device sleeps when not in use</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charging Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Charging Information</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p><span className="font-medium">Charging Port:</span> USB-C</p>
          <p><span className="font-medium">Charging Time:</span> 3-4 hours (full charge)</p>
          <p><span className="font-medium">Fast Charging:</span> 80% in 2 hours</p>
          <p><span className="font-medium">Battery Type:</span> Lithium-ion (Li-ion)</p>
          <p><span className="font-medium">Charge Cycles:</span> 500+ cycles</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BatteryLife;
