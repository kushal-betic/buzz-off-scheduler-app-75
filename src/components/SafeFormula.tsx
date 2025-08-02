
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Leaf, Heart, Users, CheckCircle, AlertTriangle } from "lucide-react";

const SafeFormula = () => {
  const ingredients = [
    { name: "Citronella Oil", percentage: "15%", description: "Natural mosquito repellent from lemongrass" },
    { name: "Eucalyptus Oil", percentage: "10%", description: "Essential oil with proven insect-repelling properties" },
    { name: "Peppermint Oil", percentage: "8%", description: "Natural deterrent with refreshing scent" },
    { name: "Lemon Balm Extract", percentage: "5%", description: "Gentle herb extract safe for sensitive skin" },
    { name: "Purified Water", percentage: "55%", description: "Ultra-pure water base for safe dilution" },
    { name: "Natural Emulsifiers", percentage: "7%", description: "Plant-based binding agents" }
  ];

  const certifications = [
    { name: "EPA Registered", icon: <Shield className="w-4 h-4" />, color: "bg-green-500" },
    { name: "DEET-Free", icon: <Leaf className="w-4 h-4" />, color: "bg-blue-500" },
    { name: "Child Safe", icon: <Users className="w-4 h-4" />, color: "bg-purple-500" },
    { name: "Pet Friendly", icon: <Heart className="w-4 h-4" />, color: "bg-pink-500" }
  ];

  return (
    <div className="space-y-6">
      {/* Formula Overview */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center">
            <Leaf className="w-8 h-8 text-white" />
          </div>
          <CardTitle className="text-2xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
            VeraShield Natural Formula
          </CardTitle>
          <CardDescription className="text-base">
            100% Natural, DEET-Free Mosquito Repellent
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap justify-center gap-2">
            {certifications.map((cert, index) => (
              <Badge key={index} className={`${cert.color} text-white border-0 flex items-center gap-1`}>
                {cert.icon}
                {cert.name}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Active Ingredients */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            Active Ingredients
          </CardTitle>
          <CardDescription>
            Natural compounds that provide effective mosquito protection
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={index}>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{ingredient.name}</h4>
                    <Badge variant="secondary" className="text-xs">
                      {ingredient.percentage}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{ingredient.description}</p>
                </div>
              </div>
              {index < ingredients.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Safety Information */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-blue-600" />
            Safety Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-3">
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="font-medium text-green-800">Safe for Children 6+ months</span>
              </div>
              <p className="text-sm text-green-700">Pediatrician tested and approved</p>
            </div>
            
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Heart className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800">Pet Safe Formula</span>
              </div>
              <p className="text-sm text-blue-700">Safe around cats, dogs, and other pets</p>
            </div>
            
            <div className="p-3 rounded-lg bg-purple-50 border border-purple-200">
              <div className="flex items-center gap-2 mb-1">
                <Leaf className="w-4 h-4 text-purple-600" />
                <span className="font-medium text-purple-800">Eco-Friendly</span>
              </div>
              <p className="text-sm text-purple-700">Biodegradable and environmentally safe</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Usage Guidelines */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            Usage Guidelines
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="space-y-2">
            <p><span className="font-medium">✓ Safe for daily use:</span> Can be used multiple times per day</p>
            <p><span className="font-medium">✓ Long-lasting protection:</span> Effective for up to 8 hours</p>
            <p><span className="font-medium">✓ No skin irritation:</span> Gentle on sensitive skin</p>
            <p><span className="font-medium">⚠️ Avoid direct contact:</span> Do not spray directly on face</p>
            <p><span className="font-medium">⚠️ Ventilation:</span> Use in well-ventilated areas</p>
          </div>
        </CardContent>
      </Card>

      {/* Certifications & Testing */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Certifications & Testing</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-600 space-y-2">
          <p><span className="font-medium">EPA Registration:</span> #94279-1</p>
          <p><span className="font-medium">Dermatologically Tested:</span> Hypoallergenic formula</p>
          <p><span className="font-medium">Clinical Studies:</span> 98% effective against mosquitoes</p>
          <p><span className="font-medium">Third-Party Verified:</span> Independent lab testing</p>
          <p><span className="font-medium">Manufacturing:</span> GMP certified facility</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SafeFormula;
