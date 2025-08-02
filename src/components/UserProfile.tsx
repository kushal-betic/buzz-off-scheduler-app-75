
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { User, Calendar, Clock, TrendingUp, Droplets, Zap } from "lucide-react";

const UserProfile = () => {
  // Mock data - in a real app this would come from a database
  const userData = {
    name: "User",
    totalSprays: 127,
    totalRuntime: "42h 30m",
    averageDaily: 3.2,
    peakHour: "20:00",
    currentStreak: 7,
    lastUsed: "2 hours ago"
  };

  const weeklyUsage = [
    { day: "Mon", sprays: 4 },
    { day: "Tue", sprays: 2 },
    { day: "Wed", sprays: 5 },
    { day: "Thu", sprays: 3 },
    { day: "Fri", sprays: 6 },
    { day: "Sat", sprays: 4 },
    { day: "Sun", sprays: 3 }
  ];

  const hourlyUsage = [
    { hour: "06:00", usage: 15 },
    { hour: "08:00", usage: 25 },
    { hour: "12:00", usage: 10 },
    { hour: "18:00", usage: 45 },
    { hour: "20:00", usage: 85 },
    { hour: "22:00", usage: 60 }
  ];

  const maxUsage = Math.max(...hourlyUsage.map(h => h.usage));

  return (
    <div className="space-y-6">
      {/* User Info */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5 text-blue-600" />
            User Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-3">
              <User className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold">{userData.name}</h3>
            <p className="text-sm text-gray-600">MosquitoShield User</p>
          </div>
        </CardContent>
      </Card>

      {/* Usage Statistics */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-600" />
            Usage Statistics
          </CardTitle>
          <CardDescription>Your spray usage overview</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-blue-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="w-4 h-4 text-blue-600" />
                <p className="text-xs text-blue-700">Total Sprays</p>
              </div>
              <p className="text-xl font-bold text-blue-800">{userData.totalSprays}</p>
            </div>
            <div className="p-3 bg-green-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-green-600" />
                <p className="text-xs text-green-700">Total Runtime</p>
              </div>
              <p className="text-xl font-bold text-green-800">{userData.totalRuntime}</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Daily Average</span>
              <Badge variant="secondary">{userData.averageDaily} sprays</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Current Streak</span>
              <Badge className="bg-orange-500">{userData.currentStreak} days</Badge>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Used</span>
              <Badge variant="outline">{userData.lastUsed}</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Peak Usage Time */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-orange-600" />
            Peak Usage Analysis
          </CardTitle>
          <CardDescription>When you use the device most</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border">
            <div className="text-center">
              <p className="text-sm text-orange-700 mb-1">Most Active Hour</p>
              <p className="text-2xl font-bold text-orange-800">{userData.peakHour}</p>
              <p className="text-xs text-orange-600 mt-1">Evening peak time</p>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">Hourly Usage Pattern:</h4>
            {hourlyUsage.map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{item.hour}</span>
                  <span>{item.usage}%</span>
                </div>
                <Progress value={item.usage} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Weekly Usage */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-purple-600" />
            Weekly Usage
          </CardTitle>
          <CardDescription>Spray sessions this week</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyUsage.map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-xs text-gray-600 mb-2">{day.day}</p>
                <div className="bg-gradient-to-t from-purple-200 to-purple-100 rounded p-2">
                  <p className="text-sm font-bold text-purple-800">{day.sprays}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;
