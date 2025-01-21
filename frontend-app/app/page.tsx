'use client';

import React from 'react';
import ConstructionZoneControl from './components/ConstructionZoneControl';
import HouseControlSystem from './components/HouseControlSystem';
import PoliceStationControl from './components/PoliceStationControl';
import TrainTrackingSystem from './components/TrainTrackingSystem';
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card';
import ModelCafeControl from './components/ModelCafeControl';
import FireStationControl from './components/FireStationControl';

const components = [
  { component: TrainTrackingSystem, colSpan: 1 },
  { component: ConstructionZoneControl, colSpan: 1 },
  { component: PoliceStationControl, colSpan: 1 },
  { component: HouseControlSystem, colSpan: 1 },
  { component: ModelCafeControl, colSpan: 1 },
  { component: FireStationControl, colSpan: 1}
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Model Railroad Control System
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {components.map(({ component: Component, title }, index) => (
          <Card key={index} className="shadow-lg rounded-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">{title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Component />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
