
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { HelpCircle, AlertTriangle, CheckCircle, Phone, Mail, MessageCircle } from "lucide-react";

const HelpPage = () => {
  const troubleshootingSteps = [
    {
      issue: "Device won't connect to Bluetooth",
      solutions: [
        "Ensure device is in pairing mode (LED should blink blue)",
        "Make sure your phone's Bluetooth is enabled",
        "Clear app cache and restart the application",
        "Reset device by holding power button for 10 seconds",
        "Check if device is within 10 meters range"
      ]
    },
    {
      issue: "Spray not working",
      solutions: [
        "Check if repellent cartridge needs replacement",
        "Verify battery level is above 20%",
        "Ensure spray nozzle is not blocked",
        "Check if device is properly scheduled",
        "Perform manual spray test from app"
      ]
    },
    {
      issue: "App crashes or freezes",
      solutions: [
        "Force close and restart the app",
        "Update to the latest app version",
        "Restart your smartphone",
        "Clear app data and re-pair device",
        "Reinstall the application if problem persists"
      ]
    },
    {
      issue: "Battery drains quickly",
      solutions: [
        "Reduce spray intensity to conserve battery",
        "Check for firmware updates",
        "Ensure device is not in extreme temperatures",
        "Limit manual spray usage",
        "Contact support if battery life is under 15 days"
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Emergency Contact */}
      <Alert className="bg-gradient-to-r from-red-50 to-pink-50 border-red-200">
        <AlertTriangle className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-800">
          <strong>Emergency:</strong> If you experience any allergic reactions or health issues, 
          stop using the device immediately and contact your healthcare provider.
        </AlertDescription>
      </Alert>

      {/* Quick Solutions */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600" />
            Quick Solutions
          </CardTitle>
          <CardDescription>
            Common fixes for immediate issues
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 text-left"
              onClick={() => console.log("Reset device initiated")}
            >
              <div>
                <div className="font-medium">Reset Device Connection</div>
                <div className="text-sm text-gray-600">Fix Bluetooth connectivity issues</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 text-left"
              onClick={() => console.log("Test spray initiated")}
            >
              <div>
                <div className="font-medium">Test Spray Function</div>
                <div className="text-sm text-gray-600">Verify device is working properly</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start h-auto p-4 text-left"
              onClick={() => console.log("Battery check initiated")}
            >
              <div>
                <div className="font-medium">Check Battery Status</div>
                <div className="text-sm text-gray-600">View detailed battery information</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting Guide */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Troubleshooting Guide</CardTitle>
          <CardDescription>
            Step-by-step solutions for common problems
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="space-y-2">
            {troubleshootingSteps.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-4">
                <AccordionTrigger className="text-left font-medium hover:no-underline">
                  {item.issue}
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-4">
                  <div className="space-y-2">
                    {item.solutions.map((solution, sIndex) => (
                      <div key={sIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{solution}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      {/* Device Status Indicators */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">LED Status Indicators</CardTitle>
          <CardDescription>
            Understanding your device's visual signals
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <div>
                <span className="font-medium">Blinking Blue:</span>
                <span className="text-sm text-gray-600 ml-2">Pairing mode active</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <div>
                <span className="font-medium">Solid Green:</span>
                <span className="text-sm text-gray-600 ml-2">Connected and ready</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-orange-50">
              <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
              <div>
                <span className="font-medium">Blinking Orange:</span>
                <span className="text-sm text-gray-600 ml-2">Low battery (below 20%)</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-50">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <div>
                <span className="font-medium">Blinking Red:</span>
                <span className="text-sm text-gray-600 ml-2">Error or cartridge empty</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Support */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Contact Support</CardTitle>
          <CardDescription>
            Get help from our technical support team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-3">
            <Button 
              variant="outline" 
              className="justify-start gap-3 h-auto p-4"
              onClick={() => console.log("Opening phone support")}
            >
              <Phone className="w-5 h-5 text-blue-600" />
              <div className="text-left">
                <div className="font-medium">Phone Support</div>
                <div className="text-sm text-gray-600">1-800-SHIELD (24/7)</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start gap-3 h-auto p-4"
              onClick={() => console.log("Opening email support")}
            >
              <Mail className="w-5 h-5 text-green-600" />
              <div className="text-left">
                <div className="font-medium">Email Support</div>
                <div className="text-sm text-gray-600">support@mosquitoshield.com</div>
              </div>
            </Button>
            <Button 
              variant="outline" 
              className="justify-start gap-3 h-auto p-4"
              onClick={() => console.log("Opening live chat")}
            >
              <MessageCircle className="w-5 h-5 text-purple-600" />
              <div className="text-left">
                <div className="font-medium">Live Chat</div>
                <div className="text-sm text-gray-600">Available 9 AM - 6 PM EST</div>
              </div>
            </Button>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-blue-50 to-cyan-50 border">
            <div className="flex items-center gap-2 mb-2">
              <Badge className="bg-blue-100 text-blue-800 border-0">Tip</Badge>
            </div>
            <p className="text-sm text-blue-700">
              Have your device serial number ready when contacting support. 
              You can find it in the device settings or on the product label.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPage;
