import React, { useState, useEffect } from 'react';
import { AlertCircle, Train, Activity } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const DiamondCrossing = ({ id, onSignalChange, theme = 'light' }) => {
  const [northSouthSignal, setNorthSouthSignal] = useState('red');
  const [eastWestSignal, setEastWestSignal] = useState('green');
  const [trainPresent, setTrainPresent] = useState(false);
  const [approachingTrain, setApproachingTrain] = useState(null);
  const [isNightMode, setIsNightMode] = useState(false);

  useEffect(() => {
    // Automatic day/night cycle
    const interval = setInterval(() => {
      setIsNightMode(prev => !prev);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const toggleSignals = () => {
    if (!trainPresent) {
      setNorthSouthSignal(prev => prev === 'red' ? 'green' : 'red');
      setEastWestSignal(prev => prev === 'red' ? 'green' : 'red');
      onSignalChange?.({ northSouth: northSouthSignal, eastWest: eastWestSignal });
    }
  };

  const simulateTrainApproach = (direction) => {
    setApproachingTrain(direction);
    setTrainPresent(true);
    
    if (direction === 'northSouth' && eastWestSignal === 'green') {
      setEastWestSignal('red');
      setNorthSouthSignal('green');
    } else if (direction === 'eastWest' && northSouthSignal === 'green') {
      setNorthSouthSignal('red');
      setEastWestSignal('green');
    }

    // Clear train presence after animation
    setTimeout(() => {
      setTrainPresent(false);
      setApproachingTrain(null);
    }, 5000);
  };

  return (
    <div className={`w-full max-w-3xl p-6 rounded-xl shadow-lg transition-all duration-500 ${
      isNightMode ? 'bg-slate-900 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">Diamond Crossing Control {id}</h3>
          <Activity className="w-6 h-6 text-blue-500" />
        </div>
        
        {/* Enhanced Diamond Crossing SVG */}
        <div className="relative w-96 h-96 mx-auto mb-8">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {/* Background with gradient */}
            <defs>
              <linearGradient id="railBed" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor={isNightMode ? "#2d3748" : "#f7fafc"} />
                <stop offset="100%" stopColor={isNightMode ? "#1a202c" : "#edf2f7"} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <rect x="0" y="0" width="200" height="200" fill="url(#railBed)" rx="8"/>
            
            {/* Track Lines with Enhanced Detail */}
            <g stroke={isNightMode ? "#718096" : "#4a5568"} strokeWidth="3">
              {/* North-South Track */}
              <line x1="100" y1="0" x2="100" y2="200" strokeLinecap="round" />
              <line x1="95" y1="0" x2="95" y2="200" strokeWidth="1" opacity="0.5" />
              <line x1="105" y1="0" x2="105" y2="200" strokeWidth="1" opacity="0.5" />
              
              {/* East-West Track */}
              <line x1="0" y1="100" x2="200" y2="100" strokeLinecap="round" />
              <line x1="0" y1="95" x2="200" y2="95" strokeWidth="1" opacity="0.5" />
              <line x1="0" y1="105" x2="200" y2="105" strokeWidth="1" opacity="0.5" />
            </g>
            
            {/* Diamond Crossing Detail */}
            <path 
              d="M90,90 L110,110 M90,110 L110,90" 
              stroke={isNightMode ? "#cbd5e0" : "#2d3748"} 
              strokeWidth="2"
              fill="none"
            />
            
            {/* Signal Lights with Glow Effect */}
            <g filter="url(#glow)">
              <circle 
                cx="100" 
                cy="40" 
                r="8" 
                fill={northSouthSignal}
                className="cursor-pointer transition-all duration-300"
                opacity={isNightMode ? "0.9" : "0.8"}
              />
              <circle 
                cx="160" 
                cy="100" 
                r="8" 
                fill={eastWestSignal}
                className="cursor-pointer transition-all duration-300"
                opacity={isNightMode ? "0.9" : "0.8"}
              />
            </g>
            
            {/* Approaching Train Animation */}
            {approachingTrain && (
              <g className="animate-pulse">
                <Train 
                  className="w-8 h-8 text-blue-500"
                  style={{
                    transform: `translate(${approachingTrain === 'northSouth' ? '100px, 0' : '0, 100px'}) 
                              rotate(${approachingTrain === 'northSouth' ? '90deg' : '0deg'})`,
                  }}
                />
              </g>
            )}
          </svg>
        </div>
      </div>

      {/* Enhanced Controls Section */}
      <div className="space-y-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={toggleSignals}
            disabled={trainPresent}
            className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 
              ${trainPresent ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'} 
              text-white shadow-lg hover:shadow-xl transform hover:-translate-y-1`}
          >
            Toggle Signals
          </button>
        </div>

        {/* Simulation Controls */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => simulateTrainApproach('northSouth')}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium 
                     shadow-lg hover:shadow-xl transition-all duration-300 
                     hover:bg-green-600 transform hover:-translate-y-1"
          >
            Simulate N-S Train
          </button>
          <button
            onClick={() => simulateTrainApproach('eastWest')}
            className="px-6 py-3 bg-green-500 text-white rounded-lg font-medium 
                     shadow-lg hover:shadow-xl transition-all duration-300 
                     hover:bg-green-600 transform hover:-translate-y-1"
          >
            Simulate E-W Train
          </button>
        </div>

        {/* Status Alerts */}
        {approachingTrain && (
          <Alert className={`
            ${isNightMode ? 'bg-slate-800 border-blue-500' : 'bg-blue-50 border-blue-200'}
            transition-all duration-300
          `}>
            <AlertCircle className="h-5 w-5 text-blue-500" />
            <AlertTitle className="text-lg font-semibold">Train Approaching</AlertTitle>
            <AlertDescription className="text-sm">
              Train approaching from {approachingTrain === 'northSouth' ? 'North-South' : 'East-West'} direction.
              All signals have been automatically adjusted for safety.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};

export default DiamondCrossing;