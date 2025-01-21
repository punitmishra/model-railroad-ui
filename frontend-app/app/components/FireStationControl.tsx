import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Building, 
  Lightbulb, 
  Car,
  Siren,
  Truck,
  AlertTriangle
} from 'lucide-react';

const ParkLight = ({ isOn, position }) => (
  <div
    className={`w-3 h-3 rounded-full transition-all duration-300 ${
      isOn ? 'bg-yellow-400 animate-pulse' : 'bg-gray-400'
    } ${position === 'front' ? 'absolute bottom-4 left-4 mr-2' : 'absolute bottom-4 right-4'}`}
  />
);

const FireStationControl = () => {
  const [fireStationState, setFireStationState] = useState({
    lights: {
      mainRoom: false,
      frontPark1: false,
      frontPark2: false,
      frontPark3: false,
      backPark: false,
      streetLight1: false,
      streetLight2: false
    },
    operations: {
      sirenActive: false,
      firetruck1Active: false,
      firetruck2Active: false,
      car1Active: false
    }
  });

  const toggleLight = (light) => {
    setFireStationState(prev => ({
      ...prev,
      lights: {
        ...prev.lights,
        [light]: !prev.lights[light]
      }
    }));
  };

  const toggleOperation = (operation) => {
    setFireStationState(prev => ({
      ...prev,
      operations: {
        ...prev.operations,
        [operation]: !prev.operations[operation]
      }
    }));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
    <Card className="shadow-lg border-t-4 border-t-red-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6 text-red-500" />
            Fire Station Control
          </div>
          <button
            onClick={() => toggleOperation('sirenActive')}
            className={`p-2 rounded-lg ${
              fireStationState.operations.sirenActive ? 'bg-red-100 text-red-500' : 'hover:bg-gray-100'
            }`}
          >
            <Siren className="h-5 w-5" />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-40">
            <div className="relative w-full h-full bg-gray-200 rounded-lg shadow-xl">
              {/* Roof */}
              <div className="absolute -top-8 left-0 right-0 h-16 bg-red-500 transform skew-y-6" />

              {/* Main Room Light */}
              <div className="absolute top-4 left-4 w-12 h-8 bg-blue-900 rounded-sm overflow-hidden">
                <div className={`w-full h-full transition-all duration-300 ${
                  fireStationState.lights.mainRoom ? 'bg-yellow-200 animate-pulse opacity-75' : 'opacity-0'
                }`} />
              </div>

              {/* Street Lights */}
              <div className="absolute -left-12 bottom-0 w-2 h-16 bg-gray-600">
                <div
                  className={`absolute -top-1 -left-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    fireStationState.lights.streetLight1 ? 'bg-yellow-300 animate-pulse' : 'bg-gray-400'
                  }`}
                />
              </div>
              <div className="absolute -right-12 bottom-0 w-2 h-16 bg-gray-600">
                <div
                  className={`absolute -top-1 -left-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    fireStationState.lights.streetLight2 ? 'bg-yellow-300 animate-pulse' : 'bg-gray-400'
                  }`}
                />
              </div>

              {/* Firetrucks and Car */}
              <div className="absolute bottom-4 left-4 space-x-4 flex">
                {fireStationState.operations.firetruck1Active && (
                  <div className="relative">
                    <Truck className="h-8 w-8 text-red-500 animate-bounce" />
                    <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  </div>
                )}
                {fireStationState.operations.firetruck2Active && (
                  <div className="relative">
                    <Truck className="h-8 w-8 text-red-500 animate-bounce" />
                    <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  </div>
                )}
                {fireStationState.operations.car1Active && (
                  <div className="relative">
                    <Car className="h-8 w-8 text-blue-500 animate-bounce" />
                    <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Front Park Lights */}
          <div className="absolute bottom-4 left-4 space-x-2">
            <ParkLight
              isOn={fireStationState.lights.frontPark1}
              position="front"
            />
            <ParkLight
              isOn={fireStationState.lights.frontPark2}
              position="front"
            />
            <ParkLight
              isOn={fireStationState.lights.frontPark3}
              position="front"
            />
          </div>

          {/* Back Park Light */}
          <div className="absolute bottom-4 right-4">
            <ParkLight
              isOn={fireStationState.lights.backPark}
              position="back"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(fireStationState.lights).map(([light, isOn]) => (
            <button
              key={light}
              onClick={() => toggleLight(light)}
              className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
                isOn ? 'bg-yellow-100 shadow-lg' : 'bg-gray-100'
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

          <button
            onClick={() => toggleOperation('firetruck1Active')}
            className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
              fireStationState.operations.firetruck1Active ? 'bg-red-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Truck className={`h-6 w-6 ${
                  fireStationState.operations.firetruck1Active ? 'text-red-500 animate-bounce' : 'text-gray-400'
                }`} />
                {fireStationState.operations.firetruck1Active && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
              <span className="text-sm font-medium">Firetruck 1</span>
            </div>
          </button>

          <button
            onClick={() => toggleOperation('firetruck2Active')}
            className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
              fireStationState.operations.firetruck2Active ? 'bg-red-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Truck className={`h-6 w-6 ${
                  fireStationState.operations.firetruck2Active ? 'text-red-500 animate-bounce' : 'text-gray-400'
                }`} />
                {fireStationState.operations.firetruck2Active && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
              <span className="text-sm font-medium">Firetruck 2</span>
            </div>
          </button>

          <button
            onClick={() => toggleOperation('car1Active')}
            className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
              fireStationState.operations.car1Active ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <div className="relative">
                <Car className={`h-6 w-6 ${
                  fireStationState.operations.car1Active ? 'text-blue-500 animate-bounce' : 'text-gray-400'
                }`} />
                {fireStationState.operations.car1Active && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                )}
              </div>
              <span className="text-sm font-medium">Police Car</span>
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default FireStationControl;