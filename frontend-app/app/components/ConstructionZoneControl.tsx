import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Construction,
  Lightbulb,
  Truck,
  Building,
  HardHat,
  Sun,
  Moon,
  AlertTriangle,
  Wrench,
  TreePine,
  Mountain,
  CloudRain,
  Wind,
  Loader,
  Settings
} from 'lucide-react';

const ConstructionZoneControl = () => {
  const [lights, setLights] = useState({
    // Front Tower Lights
    frontTower1: false,
    frontTower2: false,
    frontTower3: false,
    frontTower4: false,
    frontTower5: false,
    frontTower6: false,
    // Back Tower Light
    backTower: false,
    // Building Lights
    frontPorch: false,
    backPorch: false,
    interiorLights: false,
    basementLights: false,
  });

  const [vehicles, setVehicles] = useState({
    excavator: { 
      name: 'Excavator', 
      active: false, 
      lights: false, 
      position: 'front',
      working: false,
      color: 'yellow' 
    },
    bulldozer: { 
      name: 'Bulldozer', 
      active: false, 
      lights: false, 
      position: 'back',
      working: false,
      color: 'orange' 
    },
    crane: { 
      name: 'Mobile Crane', 
      active: false, 
      lights: false, 
      position: 'front',
      working: false,
      color: 'blue' 
    },
    dump: { 
      name: 'Dump Truck', 
      active: false, 
      lights: false, 
      position: 'back',
      working: false,
      color: 'red' 
    },
    cement: { 
      name: 'Cement Mixer', 
      active: false, 
      lights: false, 
      position: 'front',
      working: false,
      color: 'green' 
    }
  });

  const [environment, setEnvironment] = useState({
    timeOfDay: 'day',
    weather: 'clear',
    warningLights: false
  });

  // Function to get color class based on vehicle color
  const getVehicleColorClass = (color, isActive) => {
    const colorMap = {
      yellow: isActive ? 'text-yellow-500' : 'text-yellow-300',
      orange: isActive ? 'text-orange-500' : 'text-orange-300',
      blue: isActive ? 'text-blue-500' : 'text-blue-300',
      red: isActive ? 'text-red-500' : 'text-red-300',
      green: isActive ? 'text-green-500' : 'text-green-300'
    };
    return colorMap[color] || 'text-gray-400';
  };

  const ConstructionSite = ({ section }) => (
    <div className={`relative h-96 rounded-lg overflow-hidden transition-all duration-500 ${
      environment.timeOfDay === 'day' ? 'bg-slate-100' : 'bg-slate-900'
    }`}>
      {/* Construction Building */}
      <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 
                     w-64 h-48">
        <div className="relative w-full h-full bg-amber-100 rounded-lg border-2 border-amber-400 shadow-xl">
          {/* Roof */}
          <div className="absolute -top-8 left-0 right-0 h-16 bg-amber-700 transform skew-y-6" />
          
          {/* Windows with light effects */}
          <div className="grid grid-cols-2 gap-4 mt-4 mx-4">
            {[1, 2].map(window => (
              <div key={window} className="h-8 bg-slate-800 rounded-sm overflow-hidden">
                <div className={`w-full h-full transition-opacity duration-300 ${
                  lights.interiorLights ? 'bg-amber-100 animate-pulse opacity-50' : 'opacity-0'
                }`} />
              </div>
            ))}
          </div>

          {/* Construction Signs */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
            <div className="bg-amber-400 px-4 py-1 rounded text-xs font-bold border-2 border-amber-700">
              CONSTRUCTION ZONE
            </div>
          </div>

          {/* Warning Lights */}
          {environment.warningLights && (
            <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
              <div className="w-3 h-3 rounded-full bg-amber-500 animate-pulse delay-75" />
            </div>
          )}
        </div>
      </div>

      {/* Tower Lights */}
      {section === 'front' ? (
        <div className="absolute inset-x-0 top-0 flex justify-around">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className="relative">
              <div className="w-1 h-40 bg-slate-600" />
              <div className={`absolute top-0 -left-1 w-3 h-3 rounded-full transition-all duration-300 ${
                lights[`frontTower${num}`] ? 'bg-amber-300 animate-pulse shadow-lg' : 'bg-slate-400'
              }`} />
            </div>
          ))}
        </div>
      ) : (
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2">
          <div className="relative">
            <div className="w-1 h-40 bg-slate-600" />
            <div className={`absolute top-0 -left-1 w-3 h-3 rounded-full transition-all duration-300 ${
              lights.backTower ? 'bg-amber-300 animate-pulse shadow-lg' : 'bg-slate-400'
            }`} />
          </div>
        </div>
      )}

      {/* Active Vehicles */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-around">
        {Object.entries(vehicles)
          .filter(([_, vehicle]) => vehicle.position === section)
          .map(([id, vehicle]) => (
            <div key={id} 
              className={`transition-all duration-500 transform ${
                vehicle.working ? 'animate-bounce' : ''
              }`}
            >
              <div className="relative">
                <Truck className={`h-8 w-8 ${
                  getVehicleColorClass(vehicle.color, vehicle.active)
                } ${vehicle.lights ? 'animate-pulse' : ''}`} />
                {vehicle.working && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
              <div className={`text-xs text-center mt-1 font-medium ${
                environment.timeOfDay === 'day' ? 'text-slate-700' : 'text-slate-300'
              }`}>
                {vehicle.name}
              </div>
            </div>
        ))}
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-b from-amber-700 to-amber-800" />
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <Card className="shadow-lg border-t-4 border-t-amber-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Construction className="h-6 w-6 text-amber-500" />
              <span className="text-xl font-bold text-slate-800">Construction Zone Control</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setEnvironment(prev => ({
                  ...prev,
                  timeOfDay: prev.timeOfDay === 'day' ? 'night' : 'day'
                }))}
                className="p-2 rounded-lg hover:bg-slate-100"
              >
                {environment.timeOfDay === 'day' 
                  ? <Sun className="h-5 w-5 text-amber-500" />
                  : <Moon className="h-5 w-5 text-slate-500" />}
              </button>
              <button
                onClick={() => setEnvironment(prev => ({
                  ...prev,
                  warningLights: !prev.warningLights
                }))}
                className={`p-2 rounded-lg ${
                  environment.warningLights ? 'bg-amber-100 text-amber-500' : 'hover:bg-slate-100'
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Site Visualizations */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-medium mb-4 text-slate-800">Front Section</h3>
              <ConstructionSite section="front" />
            </div>
            <div>
              <h3 className="text-lg font-medium mb-4 text-slate-800">Back Section</h3>
              <ConstructionSite section="back" />
            </div>
          </div>

          {/* Vehicle Controls */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(vehicles).map(([id, vehicle]) => (
              <Card key={id} className="p-4 bg-white shadow-md">
                <div className="flex flex-col items-center gap-2">
                  <Truck className={`h-6 w-6 ${getVehicleColorClass(vehicle.color, vehicle.active)}`} />
                  <span className="text-sm font-medium text-slate-700">{vehicle.name}</span>
                  <span className="text-xs text-slate-500">
                    {vehicle.position.charAt(0).toUpperCase() + vehicle.position.slice(1)} Section
                  </span>
                  <div className="grid grid-cols-2 gap-2 mt-2 w-full">
                    <button
                      onClick={() => toggleVehicle(id, 'active')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        vehicle.active
                          ? 'bg-green-100 text-green-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {vehicle.active ? 'Active' : 'Inactive'}
                    </button>
                    <button
                      onClick={() => toggleVehicle(id, 'lights')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        vehicle.lights
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      Lights
                    </button>
                    <button
                      onClick={() => toggleVehicle(id, 'working')}
                      className={`px-3 py-1 rounded-md text-sm ${
                        vehicle.working
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {vehicle.working ? 'Working' : 'Idle'}
                    </button>
                    <button
                      onClick={() => moveVehicle(id)}
                      className="px-3 py-1 rounded-md text-sm bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      Move
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Light Controls */}
          <Card className="p-4 bg-white shadow-md">
            <h3 className="font-medium mb-4 text-slate-800">Light Controls</h3>
            <div className="grid grid-cols-2 gap-6">
              {/* Front Lights */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-600">Front Tower Lights</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      onClick={() => toggleLight(`frontTower${num}`)}
                      className={`p-3 rounded-lg transition-all duration-300 ${
                        lights[`frontTower${num}`] ? 'bg-amber-100 shadow-md' : 'bg-slate-100'
                      }`}
                    >
                      <Lightbulb className={`h-5 w-5 ${
                        lights[`frontTower${num}`] ? 'text-amber-500' : 'text-slate-400'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Back Light */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-600">Back Tower Light</h4>
                <button
                  onClick={() => toggleLight('backTower')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    lights.backTower ? 'bg-amber-100 shadow-md' : 'bg-slate-100'
                  }`}
                >
                  <Lightbulb className={`h-5 w-5 ${
                    lights.backTower ? 'text-amber-500' : 'text-slate-400'
                  }`} />
                </button>
              </div>
            </div>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConstructionZoneControl