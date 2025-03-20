
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

// Mock data for the charts
const nasdaqData = [
  { date: 'Jan', value: 16500 },
  { date: 'Feb', value: 16800 },
  { date: 'Mar', value: 17100 },
  { date: 'Apr', value: 16900 },
  { date: 'May', value: 17300 },
  { date: 'Jun', value: 17500 },
  { date: 'Jul', value: 17200 },
  { date: 'Aug', value: 17400 },
  { date: 'Sep', value: 17600 },
  { date: 'Oct', value: 17800 },
  { date: 'Nov', value: 17650 },
  { date: 'Dec', value: 17700 },
];

const ibexData = [
  { date: 'Jan', value: 9800 },
  { date: 'Feb', value: 9900 },
  { date: 'Mar', value: 10100 },
  { date: 'Apr', value: 10000 },
  { date: 'May', value: 10200 },
  { date: 'Jun', value: 10400 },
  { date: 'Jul', value: 10300 },
  { date: 'Aug', value: 10150 },
  { date: 'Sep', value: 10250 },
  { date: 'Oct', value: 10350 },
  { date: 'Nov', value: 10200 },
  { date: 'Dec', value: 10300 },
];

const MarketWidget = () => {
  return (
    <section id="market-data" className="py-12 bg-gray-50">
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">Market Trends</h2>
          
          <Tabs defaultValue="nasdaq" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="nasdaq">NASDAQ</TabsTrigger>
              <TabsTrigger value="ibex">IBEX</TabsTrigger>
            </TabsList>
            
            <TabsContent value="nasdaq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>NASDAQ Composite</span>
                    <span className="text-lg text-green-600">17,652.36 (+0.55%)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={nasdaqData}>
                        <defs>
                          <linearGradient id="colorNasdaq" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#1A2C56" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#1A2C56" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 200', 'dataMax + 200']} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#1A2C56" fillOpacity={1} fill="url(#colorNasdaq)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Open</p>
                      <p className="text-xl font-medium">17,598.21</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">High</p>
                      <p className="text-xl font-medium">17,742.36</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Low</p>
                      <p className="text-xl font-medium">17,532.85</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="ibex">
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>IBEX 35</span>
                    <span className="text-lg text-red-600">10,356.89 (-0.32%)</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={ibexData}>
                        <defs>
                          <linearGradient id="colorIbex" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis domain={['dataMin - 200', 'dataMax + 200']} />
                        <Tooltip />
                        <Area type="monotone" dataKey="value" stroke="#D4AF37" fillOpacity={1} fill="url(#colorIbex)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Open</p>
                      <p className="text-xl font-medium">10,389.52</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">High</p>
                      <p className="text-xl font-medium">10,425.17</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">Low</p>
                      <p className="text-xl font-medium">10,346.25</p>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default MarketWidget;
