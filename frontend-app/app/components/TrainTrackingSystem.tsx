import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CircleUser,
  ArrowRight,
  AlertCircle,
  Clock,
  Activity,
  MapPin,
  RotateCw,
  Settings,
  Info,
  BarChart,
  Zap,
  Calendar
} from 'lucide-react';
import DiamondCrossing from './DiamondCrossing';

const TrainTrackingSystem = () => {
  const [trains, setTrains] = useState({
    train1: {
      name: 'Mountain Express',
      currentSection: 'L1-S3',
      speed: 45,
      direction: 'right',
      level: 1,
      status: 'running',
      warnings: [],
      nextStop: 'Mountain Station',
      arrivalTime: '15:30',
      maintenance: { lastCheck: '2024-01-10', status: 'good' },
      passengers: 127,
      route: ['L1-S1', 'L1-S2', 'L1-S3', 'L1-S4', 'L1-S5']
    },
    train2: {
      name: 'Valley Runner',
      currentSection: 'L2-S1',
      speed: 30,
      direction: 'right',
      level: 2,
      status: 'approaching_junction',
      warnings: ['Junction ahead'],
      nextStop: 'Valley Junction',
      arrivalTime: '15:15',
      maintenance: { lastCheck: '2024-01-09', status: 'needs_inspection' },
      passengers: 85,
      route: ['L2-S1', 'L2-S2', 'L2-S3', 'L2-S4']
    },
    train3: {
      name: 'City Limited',
      currentSection: 'L2-S6',
      speed: 0,
      direction: 'left',
      level: 2,
      status: 'stationed',
      warnings: [],
      nextStop: 'Central Station',
      arrivalTime: '15:45',
      maintenance: { lastCheck: '2024-01-11', status: 'good' },
      passengers: 156,
      route: ['L2-S6', 'L2-S7', 'L2-S8']
    }
  });

  const [selectedTrain, setSelectedTrain] = useState(null);
  const [scheduledMaintenance, setScheduledMaintenance] = useState([
    { train: 'Valley Runner', date: '2024-01-12', type: 'Regular Inspection' },
    { train: 'Mountain Express', date: '2024-01-15', type: 'Brake Check' }
  ]);

  const TrackVisualizer = ({ level, sections }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-medium">Level {level}</h3>
          {Object.values(trains).filter(t => t.level === level).map(train => (
            <Alert key={train.name} className={`py-1 ${
              train.status === 'running' ? 'bg-green-50' : 'bg-yellow-50'
            }`}>
              <AlertDescription className="text-sm">
                {train.name}: {train.status}
              </AlertDescription>
            </Alert>
          ))}
        </div>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100">
            <Settings className="w-4 h-4 text-blue-600" />
          </button>
          <button className="p-2 rounded-lg bg-purple-50 hover:bg-purple-100">
            <Calendar className="w-4 h-4 text-purple-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-8 gap-2 relative">
        {sections.map((section) => {
          const activeTrain = Object.values(trains).find(t => t.currentSection === section);
          const isScheduledStop = activeTrain?.route.includes(section);
          
          return (
            <div key={section} className="relative" onClick={() => activeTrain && setSelectedTrain(activeTrain)}>
              <div className={`h-8 rounded-lg transition-all duration-300 flex items-center justify-center cursor-pointer
                ${activeTrain ? 'bg-blue-200 shadow-md' : 'bg-gray-100'}
                ${isScheduledStop ? 'border-b-2 border-green-500' : ''}
                ${activeTrain?.warnings.length > 0 ? 'animate-pulse border-2 border-amber-500' : ''}`}>
                <div className="text-xs font-medium text-gray-700">{section}</div>
              </div>
              {activeTrain && (
                <div className="absolute top-0 transform -translate-y-full">
                  <div className="flex items-center gap-2 bg-white rounded-lg shadow-lg p-2 border-2 border-blue-500">
                    <CircleUser className="text-blue-500 w-4 h-4" />
                    <span className="text-sm font-medium">{activeTrain.name}</span>
                    <div className="text-xs px-2 py-1 rounded-full bg-gray-100">
                      {activeTrain.speed} km/h
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  const TrainDetailsPanel = ({ train }) => {
    if (!train) return null;

    return (
      <Card className="shadow-lg border-l-4 border-l-blue-500">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CircleUser className="text-blue-500" />
              {train.name}
            </div>
            <div className="text-sm px-3 py-1 rounded-full bg-gray-100">
              Level {train.level}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="font-medium">Current Status</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Speed:</span>
                  <span>{train.speed} km/h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Section:</span>
                  <span>{train.currentSection}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Passengers:</span>
                  <span>{train.passengers}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-purple-500" />
                <span className="font-medium">Schedule</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Stop:</span>
                  <span>{train.nextStop}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Arrival:</span>
                  <span>{train.arrivalTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-4 h-4 text-gray-500" />
              <span className="font-medium">Maintenance</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Last Check:</span>
                <span>{train.maintenance.lastCheck}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status:</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  train.maintenance.status === 'good' 
                    ? 'bg-green-100 text-green-700'
                    : 'bg-amber-100 text-amber-700'
                }`}>
                  {train.maintenance.status}
                </span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gray-50">
            <div className="flex items-center gap-2 mb-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span className="font-medium">Route Information</span>
            </div>
            <div className="flex gap-2">
              {train.route.map((section, index) => (
                <div key={section} className="flex items-center">
                  <div className={`px-2 py-1 rounded ${
                    train.currentSection === section 
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100'
                  }`}>
                    {section}
                  </div>
                  {index < train.route.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const MaintenanceSchedule = () => (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="text-gray-500" />
          Scheduled Maintenance
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {scheduledMaintenance.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50">
              <div className="flex items-center gap-3">
                <CircleUser className="text-blue-500" />
                <div>
                  <div className="font-medium">{item.train}</div>
                  <div className="text-sm text-gray-600">{item.type}</div>
                </div>
              </div>
              <div className="text-sm font-medium">{item.date}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Train Tracking System</h1>
        <div className="flex gap-2">
          <button className="p-2 rounded-lg bg-green-50 hover:bg-green-100">
            <BarChart className="w-5 h-5 text-green-600" />
          </button>
          <button className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100">
            <Settings className="w-5 h-5 text-blue-600" />
          </button>
        </div>
      </div>

      <Card className="shadow-lg">
        <CardContent className="space-y-8 p-6">
          <TrackVisualizer level={2} sections={[
            'L2-S1', 'L2-S2', 'L2-S3', 'L2-S4', 'L2-S5', 'L2-S6', 'L2-S7', 'L2-S8'
          ]} />
          <TrackVisualizer level={1} sections={[
            'L1-S1', 'L1-S2', 'L1-S3', 'L1-S4', 'L1-S5', 'L1-S6'
          ]} />
        </CardContent>
      </Card>

      {selectedTrain && (
        <TrainDetailsPanel train={selectedTrain} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MaintenanceSchedule />
        
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="text-purple-500" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { time: '14:30', event: 'Mountain Express entered tunnel section' },
                { time: '14:28', event: 'Valley Runner approaching junction point' },
                { time: '14:25', event: 'City Limited arrived at station' },
              ].map((event, index) => (
                <div key={index} className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-50">
                  <div className="text-sm font-medium text-gray-600">{event.time}</div>
                  <div className="text-sm">{event.event}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <DiamondCrossing id={undefined} onSignalChange={undefined}/>
      </div>
    </div>
  );
};

export default TrainTrackingSystem;