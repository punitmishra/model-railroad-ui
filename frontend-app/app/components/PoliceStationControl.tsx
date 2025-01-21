import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Building, 
  Lightbulb, 
  Car,
  Sun, 
  Moon,
  AlertTriangle,
  Siren,
  LayoutGrid,
  ParkingSquare
} from 'lucide-react';

const PoliceStationControl = () => {
  const [lights, setLights] = useState({
    indoorLights: false,
    streetLamp: false,
    basementLights: false,
    emergencyLights: false,
    dispatchLights: false,
    parkingLights: false
  });

  const [vehicles, setVehicles] = useState({
    car1: { type: 'Patrol Car', inStation: true, lights: false, charging: false },
    car2: { type: 'K-9 Unit', inStation: true, lights: false, charging: true },
    car3: { type: 'Detective Car', inStation: false, lights: false, charging: false },
    car4: { type: 'SWAT Van', inStation: true, lights: false, charging: true }
  });

  const [timeOfDay, setTimeOfDay] = useState('day');
  const [emergencyMode, setEmergencyMode] = useState(false);

  const toggleLight = (light) => {
    setLights(prev => ({
      ...prev,
      [light]: !prev[light]
    }));
  };

  const toggleVehicleProperty = (vehicleId, property) => {
    setVehicles(prev => ({
      ...prev,
      [vehicleId]: {
        ...prev[vehicleId],
        [property]: !prev[vehicleId][property]
      }
    }));
  };

  const toggleEmergencyMode = () => {
    setEmergencyMode(prev => !prev);
    if (!emergencyMode) {
      setLights(prev => ({
        ...prev,
        emergencyLights: true,
        dispatchLights: true
      }));
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <Card className="shadow-lg border-t-4 border-t-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Building className="h-6 w-6 text-blue-500" />
              Police Station Control
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTimeOfDay(prev => prev === 'day' ? 'night' : 'day')}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {timeOfDay === 'day' 
                  ? <Sun className="h-5 w-5 text-yellow-500" />
                  : <Moon className="h-5 w-5 text-blue-500" />}
              </button>
              <button
                onClick={toggleEmergencyMode}
                className={`p-2 rounded-lg ${
                  emergencyMode ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'
                }`}
              >
                <AlertTriangle className="h-5 w-5" />
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Station Visualization */}
          <div className={`relative w-full h-96 mb-6 rounded-lg overflow-hidden transition-all duration-500 ${
            timeOfDay === 'day' ? 'bg-blue-50' : 'bg-gray-900'
          }`}>
            {/* Main Building */}
            <div className="absolute left-1/2 top-1/3 transform -translate-x-1/2 -translate-y-1/2 w-64 h-48">
              <div className="relative w-full h-full bg-blue-200 rounded-lg shadow-xl">
                {/* Roof */}
                <div className="absolute -top-8 left-0 right-0 h-16 bg-gray-700 transform skew-y-6" />
                
                {/* Windows with light effect */}
                {[1, 2, 3, 4].map((window) => (
                  <div
                    key={window}
                    className="absolute w-8 h-8 bg-gray-800 rounded-sm overflow-hidden"
                    style={{
                      top: '25%',
                      left: `${window * 20}%`,
                    }}
                  >
                    <div className={`w-full h-full transition-all duration-300 ${
                      lights.indoorLights ? 'bg-yellow-200 animate-pulse opacity-75' : 'opacity-0'
                    }`} />
                  </div>
                ))}

                {/* Emergency Lights */}
                <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 
                  ${emergencyMode ? 'animate-pulse' : ''}`}>
                  <div className="flex gap-2">
                    <div className={`w-3 h-3 rounded-full ${
                      emergencyMode ? 'bg-red-500' : 'bg-gray-400'
                    }`} />
                    <div className={`w-3 h-3 rounded-full ${
                      emergencyMode ? 'bg-blue-500' : 'bg-gray-400'
                    }`} />
                  </div>
                </div>

                {/* Street Lamp */}
                <div className="absolute -left-12 top-1/2 w-2 h-16 bg-gray-600">
                  <div className={`absolute -top-1 -left-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    lights.streetLamp ? 'bg-yellow-300 animate-pulse shadow-lg' : 'bg-gray-400'
                  }`} />
                </div>

                {/* Basement Garage */}
                <div className="absolute -bottom-16 left-0 right-0 h-16 bg-gray-800 rounded-lg overflow-hidden">
                  <div className={`w-full h-full transition-opacity duration-300 ${
                    lights.basementLights ? 'bg-yellow-100 bg-opacity-30' : 'bg-opacity-0'
                  }`}>
                    <div className="flex justify-around items-center h-full">
                      {Object.entries(vehicles).map(([id, vehicle]) => (
                        <div key={id} className="relative">
                          {vehicle.inStation && (
                            <>
                              <Car className={`h-6 w-6 ${
                                vehicle.lights ? 'text-blue-500 animate-pulse' : 'text-gray-400'
                              }`} />
                              {vehicle.charging && (
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                              )}
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Light Controls */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {Object.entries(lights).map(([light, isOn]) => (
              <button
                key={light}
                onClick={() => toggleLight(light)}
                className={`p-4 rounded-lg transition-all duration-300 ${
                  isOn ? 'bg-yellow-100 shadow-md' : 'bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Lightbulb className={`h-6 w-6 ${
                    isOn ? 'text-yellow-500' : 'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium capitalize">
                    {light.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Vehicle Controls */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(vehicles).map(([id, vehicle]) => (
              <div key={id} className="p-4 rounded-lg bg-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Car className={`h-6 w-6 ${
                      vehicle.inStation ? 'text-blue-500' : 'text-gray-400'
                    }`} />
                    <span className="font-medium">{vehicle.type}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    vehicle.lights ? 'bg-blue-500 animate-pulse' : 'bg-gray-300'
                  }`} />
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => toggleVehicleProperty(id, 'inStation')}
                    className={`w-full py-2 px-4 rounded-lg ${
                      vehicle.inStation 
                        ? 'bg-red-100 hover:bg-red-200 text-red-700'
                        : 'bg-green-100 hover:bg-green-200 text-green-700'
                    }`}
                  >
                    {vehicle.inStation ? 'Deploy Vehicle' : 'Return to Station'}
                  </button>
                  <button
                    onClick={() => toggleVehicleProperty(id, 'lights')}
                    className={`w-full py-2 px-4 rounded-lg ${
                      vehicle.lights
                        ? 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700'
                        : 'bg-blue-100 hover:bg-blue-200 text-blue-700'
                    }`}
                  >
                    {vehicle.lights ? 'Lights Off' : 'Lights On'}
                  </button>
                  <button
                    onClick={() => toggleVehicleProperty(id, 'charging')}
                    className={`w-full py-2 px-4 rounded-lg ${
                      vehicle.charging
                        ? 'bg-green-100 hover:bg-green-200 text-green-700'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {vehicle.charging ? 'Stop Charging' : 'Start Charging'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoliceStationControl;