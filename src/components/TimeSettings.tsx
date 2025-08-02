
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Clock, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { timeValidation } from "@/utils/inputValidation";

interface TimeSettingsProps {
  currentTime: string;
  onTimeChange: (time: string) => void;
}

const TimeSettings = ({ currentTime, onTimeChange }: TimeSettingsProps) => {
  const [manualTime, setManualTime] = useState(currentTime);
  const [isAutoSync, setIsAutoSync] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (isAutoSync) {
      const interval = setInterval(() => {
        const now = new Date().toLocaleTimeString('en-US', { 
          hour12: false, 
          hour: '2-digit', 
          minute: '2-digit' 
        });
        onTimeChange(now);
        setManualTime(now);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAutoSync, onTimeChange]);

  const handleManualTimeSet = () => {
    // Validate and sanitize time input
    const sanitizedTime = timeValidation.sanitizeTimeInput(manualTime);
    
    if (!timeValidation.isValidTimeFormat(sanitizedTime) || !timeValidation.isReasonableTime(sanitizedTime)) {
      toast({
        title: "Invalid Time",
        description: "Please enter a valid time in HH:MM format",
        variant: "destructive",
      });
      return;
    }

    onTimeChange(sanitizedTime);
    setManualTime(sanitizedTime);
    setIsAutoSync(false);
    toast({
      title: "Time Updated",
      description: `Device time set to ${sanitizedTime}`,
    });
  };

  const handleAutoSync = () => {
    setIsAutoSync(true);
    const now = new Date().toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit' 
    });
    onTimeChange(now);
    setManualTime(now);
    toast({
      title: "Auto Sync Enabled",
      description: "Time will sync automatically with your device",
    });
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-600" />
          Time Settings
        </CardTitle>
        <CardDescription>
          Set the device time before connecting
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Time Display */}
        <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border">
          <div className="text-center">
            <p className="text-sm text-blue-700 mb-1">Current Device Time</p>
            <p className="text-2xl font-bold text-blue-800">{currentTime}</p>
            <p className="text-xs text-blue-600 mt-1">
              {isAutoSync ? "Auto-synced" : "Manual"}
            </p>
          </div>
        </div>

        {/* Manual Time Setting */}
        <div className="space-y-3">
          <Label htmlFor="manual-time" className="text-sm font-medium">
            Set Time Manually:
          </Label>
          <div className="flex gap-2">
            <Input
              id="manual-time"
              type="time"
              value={manualTime}
              onChange={(e) => setManualTime(timeValidation.sanitizeTimeInput(e.target.value))}
              className="flex-1"
              disabled={isAutoSync}
              pattern="[0-9]{2}:[0-9]{2}"
              maxLength={5}
            />
            <Button 
              onClick={handleManualTimeSet}
              size="sm"
              disabled={isAutoSync}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600"
            >
              Set
            </Button>
          </div>
        </div>

        {/* Auto Sync Toggle Button */}
        <Button 
          onClick={isAutoSync ? () => setIsAutoSync(false) : handleAutoSync}
          variant={isAutoSync ? "secondary" : "outline"}
          className="w-full"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          {isAutoSync ? "Disable Auto Sync" : "Enable Auto Sync"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default TimeSettings;
