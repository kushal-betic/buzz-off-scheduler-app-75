
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Droplets, Zap, Volume2 } from "lucide-react";

interface IntensityControlProps {
  intensity: number;
  onIntensityChange: (intensity: number) => void;
}

type IntensityMode = 'low' | 'medium' | 'high';

const IntensityControl = ({ intensity, onIntensityChange }: IntensityControlProps) => {
  const intensityModes = {
    low: { value: 25, label: "Low", color: "bg-green-500", icon: "🌱", description: "Eco-friendly mode with minimal spray for light protection" },
    medium: { value: 50, label: "Medium", color: "bg-yellow-500", icon: "🌿", description: "Balanced protection for normal mosquito activity" },
    high: { value: 75, label: "High", color: "bg-red-500", icon: "🔥", description: "Maximum strength for extreme conditions" }
  };

  const getCurrentMode = (): IntensityMode => {
    if (intensity <= 30) return 'low';
    if (intensity <= 60) return 'medium';
    return 'high';
  };

  const currentMode = getCurrentMode();
  const currentModeData = intensityModes[currentMode];

  const handleModeChange = (mode: IntensityMode) => {
    onIntensityChange(intensityModes[mode].value);
  };

  const handleSliderChange = (value: number[]) => {
    onIntensityChange(value[0]);
  };

  return (
    <div className="space-y-6">
      {/* Intensity Slider Control */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            Intensity Control
          </CardTitle>
          <CardDescription>
            Adjust spray intensity with precision control
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Intensity Display */}
          <div className="text-center">
            <div className="text-4xl mb-2">{currentModeData.icon}</div>
            <Badge className={`${currentModeData.color} text-white border-0 px-4 py-2 text-base`}>
              {intensity}% Intensity
            </Badge>
          </div>

          {/* Slider Control */}
          <div className="space-y-4">
            <Label className="text-sm font-medium">Intensity Level:</Label>
            <div className="px-3">
              <Slider
                value={[intensity]}
                onValueChange={handleSliderChange}
                max={100}
                min={0}
                step={5}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>0%</span>
                <span>25%</span>
                <span>50%</span>
                <span>75%</span>
                <span>100%</span>
              </div>
            </div>
          </div>

          {/* Quick Preset Buttons */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Quick Presets:</Label>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(intensityModes).map(([key, mode]) => (
                <Button
                  key={key}
                  variant={currentMode === key ? "default" : "outline"}
                  className={`p-3 h-auto flex flex-col items-center gap-1 ${
                    currentMode === key 
                      ? `${mode.color} hover:${mode.color}/90 text-white` 
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => handleModeChange(key as IntensityMode)}
                >
                  <span className="text-lg">{mode.icon}</span>
                  <div className="text-xs">{mode.label}</div>
                </Button>
              ))}
            </div>
          </div>

          {/* Current Mode Description */}
          <div className="p-3 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-800">Current Setting</span>
            </div>
            <p className="text-sm text-blue-700">
              {currentModeData.description}
            </p>
          </div>

          {/* Battery Impact Warning */}
          {intensity > 70 && (
            <div className="p-3 rounded-lg bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-amber-600">⚠️</span>
                <span className="font-medium text-amber-800">Battery Notice</span>
              </div>
              <p className="text-sm text-amber-700">
                High intensity mode may reduce battery life. Consider using medium mode for extended use.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default IntensityControl;
