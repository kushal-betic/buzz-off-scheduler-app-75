
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Shield, Wifi, Battery, Droplets, Clock, Smartphone } from "lucide-react";
import BluetoothSettings from "./BluetoothSettings";
import BatteryLife from "./BatteryLife";
import SafeFormula from "./SafeFormula";
import TimeScheduler from "./TimeScheduler";
import IntensityControl from "./IntensityControl";

type FeatureView = 'main' | 'bluetooth' | 'scheduling' | 'intensity' | 'battery' | 'formula' | 'mobile';

const AboutPage = () => {
  const [currentView, setCurrentView] = useState<FeatureView>('main');
  const [sprayTime, setSprayTime] = useState("20:00");
  const [intensity, setIntensity] = useState(50);

  const features = [
    {
      icon: <Wifi className="w-5 h-5 text-blue-500" />,
      title: "Bluetooth Connectivity",
      description: "Seamless pairing with your smart device",
      view: 'bluetooth' as FeatureView
    },
    {
      icon: <Clock className="w-5 h-5 text-green-500" />,
      title: "Smart Scheduling",
      description: "Automated spray timing based on your preferences",
      view: 'scheduling' as FeatureView
    },
    {
      icon: <Droplets className="w-5 h-5 text-cyan-500" />,
      title: "Adjustable Intensity",
      description: "Customizable spray strength for optimal protection",
      view: 'intensity' as FeatureView
    },
    {
      icon: <Battery className="w-5 h-5 text-yellow-500" />,
      title: "Long Battery Life",
      description: "Up to 30 days of continuous operation",
      view: 'battery' as FeatureView
    },
    {
      icon: <Shield className="w-5 h-5 text-purple-500" />,
      title: "Safe Formula",
      description: "DEET-free, family and pet-friendly repellent",
      view: 'formula' as FeatureView
    },
    {
      icon: <Smartphone className="w-5 h-5 text-indigo-500" />,
      title: "Mobile Control",
      description: "Full remote control via smartphone app",
      view: 'mobile' as FeatureView
    }
  ];

  const renderFeatureView = () => {
    switch (currentView) {
      case 'bluetooth':
        return <BluetoothSettings />;
      case 'battery':
        return <BatteryLife />;
      case 'formula':
        return <SafeFormula />;
      case 'scheduling':
        return <TimeScheduler sprayTime={sprayTime} onTimeChange={setSprayTime} />;
      case 'intensity':
        return <IntensityControl intensity={intensity} onIntensityChange={setIntensity} />;
      case 'mobile':
        return (
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-indigo-600" />
                Mobile Control Features
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-gray-600">
              <p>Control your VeraShield device remotely with full smartphone integration:</p>
              <ul className="space-y-2 ml-4">
                <li>• Real-time device status monitoring</li>
                <li>• Remote spray activation from anywhere</li>
                <li>• Custom scheduling and timing controls</li>
                <li>• Intensity adjustment on-the-go</li>
                <li>• Battery level and usage tracking</li>
                <li>• Push notifications for important alerts</li>
                <li>• Multi-device management support</li>
              </ul>
            </CardContent>
          </Card>
        );
      default:
        return (
          <>
            {/* App Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
                  VeraShield Pro
                </CardTitle>
                <CardDescription className="text-base">
                  Smart Mosquito Repellent System
                </CardDescription>
                <div className="flex justify-center gap-2 mt-3">
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                    Version 2.1.0
                  </Badge>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Bluetooth 5.0
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Features */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Key Features</CardTitle>
                <CardDescription>
                  Advanced mosquito protection technology - tap to explore
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentView(feature.view)}
                    className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-1">{feature.icon}</div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{feature.description}</p>
                      </div>
                      <div className="text-gray-400">→</div>
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Technical Specs */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">Technical Specifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-700">Range:</span>
                    <p className="text-gray-600">15m radius</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Battery:</span>
                    <p className="text-gray-600">2000mAh Li-ion</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Refill:</span>
                    <p className="text-gray-600">30ml cartridge</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Weight:</span>
                    <p className="text-gray-600">450g</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">Connectivity:</span>
                    <p className="text-gray-600">Bluetooth 5.0</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-700">IP Rating:</span>
                    <p className="text-gray-600">IPX4 Water Resistant</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">About the Company</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-gray-600 space-y-3">
                <p>
                  VeraShield is a leading innovator in smart pest control solutions. 
                  Founded in 2020, we're committed to creating effective, eco-friendly, 
                  and technologically advanced products that protect families worldwide.
                </p>
                <p>
                  Our products are tested and certified by leading health organizations 
                  and are trusted by over 100,000 families globally.
                </p>
                <div className="pt-2">
                  <p className="font-medium text-gray-800">Contact Information:</p>
                  <p>Email: support@verashield.com</p>
                  <p>Phone: 1-800-SHIELD (1-800-744-3535)</p>
                  <p>Website: www.verashield.com</p>
                </div>
              </CardContent>
            </Card>
          </>
        );
    }
  };

  return (
    <div className="space-y-6">
      {currentView !== 'main' && (
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={() => setCurrentView('main')}
            className="bg-white/80 backdrop-blur-sm border-0 shadow-lg"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {features.find(f => f.view === currentView)?.title || 'Feature Details'}
            </h2>
          </div>
        </div>
      )}
      
      {renderFeatureView()}
    </div>
  );
};

export default AboutPage;
