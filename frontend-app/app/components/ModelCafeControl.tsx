import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Coffee,
  Lightbulb,
  Car,
  SignpostBig,
  PanelTopOpen,
  Utensils,
  Clock,
  Sun,
  Moon
} from 'lucide-react';

const ModelCafeControl = () => {
  const [cafeState, setCafeState] = useState({
    lights: {
      mainRoom: false,
      driveThru: false,
      parking: false,
      sign: false,
      roofAccent: false
    },
    operations: {
      isOpen: false,
      driveThruActive: false,
      signRotating: false
    },
    timeOfDay: 'day'
  });

  const toggleLight = (light) => {
    setCafeState(prev => ({
      ...prev,
      lights: {
        ...prev.lights,
        [light]: !prev.lights[light]
      }
    }));
  };

  const toggleOperation = (operation) => {
    setCafeState(prev => ({
      ...prev,
      operations: {
        ...prev.operations,
        [operation]: !prev.operations[operation]
      }
    }));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
    <Card className="shadow-lg border-t-4 border-t-red-500">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coffee className="h-6 w-6 text-red-500" />
            Café Control Center
          </div>
          <button
            onClick={() => setCafeState(prev => ({
              ...prev,
              timeOfDay: prev.timeOfDay === 'day' ? 'night' : 'day'
            }))}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {cafeState.timeOfDay === 'day' 
              ? <Sun className="h-5 w-5 text-yellow-500" />
              : <Moon className="h-5 w-5 text-blue-500" />}
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className={`relative w-full h-64 mb-6 rounded-lg overflow-hidden transition-all duration-500 ${
          cafeState.timeOfDay === 'day' ? 'bg-blue-50' : 'bg-gray-900'
        }`}>
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-40">
            <div className="relative w-full h-full">
              <div className="absolute -right-24 top-0 w-32 h-full">
                <div className="relative w-full h-full">
                  <div className="absolute -top-4 left-0 right-0 h-8 bg-red-500 transform -skew-x-12">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute h-full w-4 bg-white"
                        style={{ left: `${i * 24}px` }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-0 w-1 h-full bg-gray-400" />
                  <div className="absolute top-4 left-4 w-1 h-full bg-gray-400" />
                </div>
              </div>

              <div className="relative w-full h-full bg-gray-200 rounded-lg shadow-xl">
                <div className="absolute -top-6 left-0 right-0 h-8 bg-red-500">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute h-full w-4 bg-white"
                      style={{ left: `${i * 32}px` }}
                    />
                  ))}
                </div>

                <div className={`absolute -top-12 left-1/2 transform -translate-x-1/2 
                  ${cafeState.operations.signRotating ? 'animate-spin-slow' : ''}`}>
                  <div className={`w-24 h-8 rounded-full bg-red-600 flex items-center justify-center
                    ${cafeState.lights.sign ? 'animate-pulse' : ''}`}>
                    <Coffee className={`h-6 w-6 ${
                      cafeState.lights.sign ? 'text-white' : 'text-gray-300'
                    }`} />
                  </div>
                </div>

                <div className="absolute top-4 left-4 w-12 h-8 bg-blue-900 rounded-sm overflow-hidden">
                  <div className={`w-full h-full transition-all duration-300 ${
                    cafeState.lights.mainRoom ? 'bg-yellow-200 animate-pulse opacity-75' : 'opacity-0'
                  }`} />
                </div>
                <div className="absolute top-4 right-4 w-12 h-8 bg-blue-900 rounded-sm overflow-hidden">
                  <div className={`w-full h-full transition-all duration-300 ${
                    cafeState.lights.mainRoom ? 'bg-yellow-200 animate-pulse opacity-75' : 'opacity-0'
                  }`} />
                </div>

                <div className="absolute bottom-4 -right-20 w-16 h-6 bg-blue-900 rounded-sm overflow-hidden">
                  <div className={`w-full h-full transition-all duration-300 ${
                    cafeState.lights.driveThru ? 'bg-yellow-200 animate-pulse opacity-75' : 'opacity-0'
                  }`} />
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gray-400" />
                </div>

                {cafeState.operations.driveThruActive && (
                  <div className="absolute -right-40 bottom-2">
                    <Car className="h-8 w-8 text-blue-500 animate-bounce" />
                  </div>
                )}

                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute bottom-8 w-2 h-2 rounded-full transition-all duration-300 ${
                      cafeState.lights.driveThru 
                        ? 'bg-yellow-400 animate-pulse' 
                        : 'bg-gray-400'
                    }`}
                    style={{ right: `${-60 + (i * 20)}px` }}
                  />
                ))}

                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute -top-1 w-2 h-2 rounded-full transition-all duration-300 ${
                      cafeState.lights.roofAccent 
                        ? 'bg-red-400 animate-pulse' 
                        : 'bg-gray-400'
                    }`}
                    style={{ left: `${(i + 1) * 48}px` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.entries(cafeState.lights).map(([light, isOn]) => (
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
            onClick={() => toggleOperation('isOpen')}
            className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
              cafeState.operations.isOpen ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <PanelTopOpen className={`h-6 w-6 ${
                cafeState.operations.isOpen ? 'text-green-500' : 'text-red-500'
              }`} />
              <span className="text-sm font-medium">
                {cafeState.operations.isOpen ? 'Open' : 'Closed'}
              </span>
            </div>
          </button>

          <button
            onClick={() => toggleOperation('driveThruActive')}
            className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
              cafeState.operations.driveThruActive ? 'bg-blue-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <Car className={`h-6 w-6 ${
                cafeState.operations.driveThruActive ? 'text-blue-500' : 'text-gray-400'
              }`} />
              <span className="text-sm font-medium">Drive-Thru</span>
            </div>
          </button>

          <button
            onClick={() => toggleOperation('signRotating')}
            className={`p-4 rounded-lg transition-all duration-300 hover:scale-105 ${
              cafeState.operations.signRotating ? 'bg-purple-100' : 'bg-gray-100'
            }`}
          >
            <div className="flex flex-col items-center gap-2">
              <SignpostBig className={`h-6 w-6 ${
                cafeState.operations.signRotating ? 'text-purple-500' : 'text-gray-400'
              }`} />
              <span className="text-sm font-medium">Rotate Sign</span>
            </div>
          </button>
        </div>
      </CardContent>
    </Card>
  </div>
  );
};

export default ModelCafeControl;