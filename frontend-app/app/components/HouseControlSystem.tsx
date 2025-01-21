import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { 
  Home, 
  Lightbulb, 
  LampFloor, 
  Sun, 
  Cloud, 
  CloudRain, 
  CloudSnow,
  Thermometer,
  Car,
  TreePine,
  Moon,
  Wind,
  Droplets
} from 'lucide-react';

const HouseControlSystem = () => {
  const [lights, setLights] = useState({
    frontPorch: false,
    backPorch: false,
    sidePorch: false,
    streetLamp: false,
    basement: false,
  });

  const [environment, setEnvironment] = useState({
    timeOfDay: 'day',
    weather: 'clear',
    temperature: 72,
    humidity: 45
  });

  const [basementCars, setBasementCars] = useState([
    { id: 1, parked: true, charging: false },
    { id: 2, parked: true, charging: true },
    { id: 3, parked: false, charging: false }
  ]);

  const toggleLight = (light) => {
    setLights(prev => ({
      ...prev,
      [light]: !prev[light]
    }));
  };

  const toggleAllLights = () => {
    const allOn = Object.values(lights).every(light => light);
    setLights(Object.keys(lights).reduce((acc, key) => ({
      ...acc,
      [key]: !allOn
    }), {}));
  };

  const toggleCarCharging = (carId) => {
    setBasementCars(prev => prev.map(car => 
      car.id === carId ? { ...car, charging: !car.charging } : car
    ));
  };

  const WeatherIcon = () => {
    switch(environment.weather) {
      case 'rain':
        return <CloudRain className="h-6 w-6 text-blue-500" />;
      case 'snow':
        return <CloudSnow className="h-6 w-6 text-blue-300" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      default:
        return environment.timeOfDay === 'day' 
          ? <Sun className="h-6 w-6 text-yellow-500" />
          : <Moon className="h-6 w-6 text-gray-300" />;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Card className="shadow-lg border-t-4 border-t-purple-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6 text-purple-500" />
              Smart Home Control Center
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setEnvironment(prev => ({
                  ...prev,
                  timeOfDay: prev.timeOfDay === 'day' ? 'night' : 'day'
                }))}
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              >
                {environment.timeOfDay === 'day' 
                  ? <Sun className="h-5 w-5 text-yellow-500" />
                  : <Moon className="h-5 w-5 text-gray-500" />}
              </button>
              <button
                onClick={() => {
                  const weathers = ['clear', 'rain', 'snow', 'cloudy'];
                  const currentIndex = weathers.indexOf(environment.weather);
                  const nextWeather = weathers[(currentIndex + 1) % weathers.length];
                  setEnvironment(prev => ({ ...prev, weather: nextWeather }));
                }}
                className="p-2 rounded-lg transition-all duration-300 hover:scale-110"
              >
                <WeatherIcon />
              </button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Environment Status */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="p-4 rounded-lg bg-blue-50">
              <div className="flex items-center justify-between">
                <Thermometer className="h-5 w-5 text-red-500" />
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setEnvironment(prev => ({
                      ...prev, 
                      temperature: Math.max(prev.temperature - 1, 32)
                    }))}
                    className="p-1 rounded-full bg-blue-100 hover:bg-blue-200"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{environment.temperature}°F</span>
                  <button 
                    onClick={() => setEnvironment(prev => ({
                      ...prev, 
                      temperature: Math.min(prev.temperature + 1, 90)
                    }))}
                    className="p-1 rounded-full bg-blue-100 hover:bg-blue-200"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50">
              <div className="flex items-center justify-between">
                <Droplets className="h-5 w-5 text-blue-500" />
                <span className="text-lg font-medium">{environment.humidity}%</span>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50">
              <div className="flex items-center justify-between">
                <Wind className="h-5 w-5 text-gray-500" />
                <WeatherIcon />
              </div>
            </div>
          </div>

          {/* House Visualization */}
          <div className={`relative w-full h-96 mb-6 rounded-lg overflow-hidden transition-all duration-500 ${
            environment.timeOfDay === 'day' ? 'bg-blue-100' : 'bg-gray-900'
          }`}>
            {/* Weather Effects */}
            {environment.weather === 'rain' && (
              <div className="absolute inset-0">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-px h-8 bg-blue-400 animate-rain"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 2}s`
                    }}
                  />
                ))}
              </div>
            )}
            {environment.weather === 'snow' && (
              <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-white rounded-full animate-snow"
                    style={{
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      animationDelay: `${Math.random() * 3}s`
                    }}
                  />
                ))}
              </div>
            )}

            {/* Scenery */}
            <div className="absolute bottom-0 left-0 right-0 h-24">
              {[...Array(5)].map((_, i) => (
                <TreePine
                  key={i}
                  className={`absolute bottom-0 h-16 w-16 transition-colors duration-500 ${
                    environment.timeOfDay === 'day' ? 'text-green-600' : 'text-green-900'
                  }`}
                  style={{ left: `${i * 25}%` }}
                />
              ))}
            </div>

            {/* Main House */}
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-48">
              <div className="relative w-full h-full bg-gray-200 rounded-lg shadow-xl">
                {/* Roof */}
                <div className="absolute -top-12 left-0 right-0 h-20 bg-red-500 transform skew-y-12" />
                
                {/* Windows with light effect */}
                <div className="absolute top-4 left-4 w-8 h-8 bg-blue-900 rounded-sm overflow-hidden">
                  <div className={`w-full h-full transition-all duration-300 ${
                    lights.frontPorch ? 'bg-yellow-200 animate-pulse opacity-75' : 'opacity-0'
                  }`} />
                </div>
                <div className="absolute top-4 right-4 w-8 h-8 bg-blue-900 rounded-sm overflow-hidden">
                  <div className={`w-full h-full transition-all duration-300 ${
                    lights.backPorch ? 'bg-yellow-200 animate-pulse opacity-75' : 'opacity-0'
                  }`} />
                </div>

                {/* Porch Lights */}
                <div className={`absolute -left-2 top-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                  lights.frontPorch 
                    ? 'bg-yellow-300 animate-pulse shadow-lg shadow-yellow-200/50' 
                    : 'bg-gray-400'
                }`} />
                <div className={`absolute -right-2 top-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                  lights.backPorch 
                    ? 'bg-yellow-300 animate-pulse shadow-lg shadow-yellow-200/50' 
                    : 'bg-gray-400'
                }`} />
                <div className={`absolute top-0 left-1/2 w-3 h-3 rounded-full transition-all duration-300 ${
                  lights.sidePorch 
                    ? 'bg-yellow-300 animate-pulse shadow-lg shadow-yellow-200/50' 
                    : 'bg-gray-400'
                }`} />

                {/* Street Lamp */}
                <div className="absolute -left-16 bottom-0 w-2 h-20 bg-gray-600">
                  <div className={`absolute -top-1 -left-1 w-4 h-4 rounded-full transition-all duration-300 ${
                    lights.streetLamp 
                      ? 'bg-yellow-300 animate-pulse shadow-lg shadow-yellow-200/50' 
                      : 'bg-gray-400'
                  }`} />
                </div>

                {/* Basement */}
                <div className={`absolute -bottom-8 left-0 right-0 h-8 bg-gray-300 rounded-b-lg overflow-hidden ${
                  lights.basement ? 'bg-opacity-90' : 'bg-opacity-50'
                }`}>
                  <div className="flex justify-around items-center h-full">
                    {basementCars.map(car => (
                      <div key={car.id} className="relative">
                        <Car className={`h-6 w-6 ${
                          car.parked ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        {car.charging && (
                          <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {/* Light Controls */}
            {Object.entries(lights).map(([light, isOn]) => (
              <button
                key={light}
                onClick={() => toggleLight(light)}
                className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
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

            {/* Basement Car Controls */}
            {basementCars.map(car => (
              <button
                key={car.id}
                onClick={() => toggleCarCharging(car.id)}
                className={`p-4 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  car.charging ? 'bg-green-100' : 'bg-gray-100'
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <Car className={`h-6 w-6 ${
                    car.charging ? 'text-green-500' : 'text-gray-400'
                  }`} />
                  <span className="text-sm font-medium">
                    Car {car.id} {car.charging ? '(Charging)' : ''}
                  </span>
                </div>
              </button>
            ))}

            {/* Master Switch */}
            <button
              onClick={toggleAllLights}
              className={`p-4 rounded-lg col-span-full transition-all duration-300 ${
                Object.values(lights).every(light => light)
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-center gap-2">
                <LampFloor className="h-6 w-6" />
                <span className="font-medium">
                  {Object.values(lights).every(light => light)
                    ? 'Turn All Lights Off'
                    : 'Turn All Lights On'}
                </span>
              </div>
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HouseControlSystem;