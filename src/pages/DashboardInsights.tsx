
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import DashboardLayout from '@/components/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Mock data for charts
const cycleLengthData = [
  { month: 'Jan', length: 28 },
  { month: 'Feb', length: 29 },
  { month: 'Mar', length: 28 },
  { month: 'Apr', length: 30 },
  { month: 'May', length: 27 },
];

const periodLengthData = [
  { month: 'Jan', length: 5 },
  { month: 'Feb', length: 6 },
  { month: 'Mar', length: 5 },
  { month: 'Apr', length: 4 },
  { month: 'May', length: 5 },
];

const symptomsFrequencyData = [
  { name: 'Cramps', value: 75 },
  { name: 'Headache', value: 45 },
  { name: 'Fatigue', value: 60 },
  { name: 'Bloating', value: 40 },
  { name: 'Mood swings', value: 30 },
];

const COLORS = ['#FF8042', '#c084fc', '#FF5C8D', '#82ca9d', '#8884d8'];

const DashboardInsights = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Insights</h1>
          <p className="text-muted-foreground">
            Analyze your cycle patterns and symptoms over time.
          </p>
        </div>

        <Tabs defaultValue="cycle" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cycle">Cycle Analysis</TabsTrigger>
            <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="cycle" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Cycle Length</CardTitle>
                  <CardDescription>Your cycle length over the past 5 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={cycleLengthData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[25, 32]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="length" stroke="#FF5C8D" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Period Duration</CardTitle>
                  <CardDescription>Your period duration over the past 5 months</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={periodLengthData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[0, 7]} />
                      <Tooltip />
                      <Bar dataKey="length" fill="#FF5C8D" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
            
            <Card className="relative">
              <div className="absolute top-0 right-0 w-full h-full bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-4">
                <div className="bg-hercycle-deepPink/10 p-3 rounded-full">
                  <Crown className="h-10 w-10 text-hercycle-deepPink" />
                </div>
                <h3 className="text-xl font-semibold">Premium Feature</h3>
                <p className="text-center max-w-md text-muted-foreground">
                  Upgrade to HerCycle Premium to unlock advanced cycle insights and predictions.
                </p>
                <Button asChild className="mt-4 bg-hercycle-deepPink hover:bg-hercycle-deepPink/90">
                  <Link to="/premium">View Premium Options</Link>
                </Button>
              </div>
              <CardHeader>
                <CardTitle>Cycle Predictions</CardTitle>
                <CardDescription>
                  Advanced predictions based on your historical data
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[250px] flex items-center justify-center">
                <p className="text-muted-foreground">Chart preview</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="symptoms" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Symptoms Frequency</CardTitle>
                  <CardDescription>Most common symptoms during your cycle</CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={symptomsFrequencyData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {symptomsFrequencyData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="relative">
                <div className="absolute top-0 right-0 w-full h-full bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-4">
                  <div className="bg-hercycle-deepPink/10 p-3 rounded-full">
                    <Crown className="h-10 w-10 text-hercycle-deepPink" />
                  </div>
                  <h3 className="text-xl font-semibold">Premium Feature</h3>
                  <p className="text-center max-w-md text-muted-foreground">
                    Upgrade to HerCycle Premium to unlock advanced symptom patterns and correlations.
                  </p>
                  <Button asChild className="mt-4 bg-hercycle-deepPink hover:bg-hercycle-deepPink/90">
                    <Link to="/premium">View Premium Options</Link>
                  </Button>
                </div>
                <CardHeader>
                  <CardTitle>Symptom Timeline</CardTitle>
                  <CardDescription>
                    How your symptoms correlate with cycle phases
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[300px]">
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-muted-foreground">Chart preview</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-4">
            <Card className="relative">
              <div className="absolute top-0 right-0 w-full h-full bg-background/80 backdrop-blur-sm z-10 flex flex-col items-center justify-center space-y-4">
                <div className="bg-hercycle-deepPink/10 p-3 rounded-full">
                  <Crown className="h-10 w-10 text-hercycle-deepPink" />
                </div>
                <h3 className="text-xl font-semibold">Premium Feature</h3>
                <p className="text-center max-w-md text-muted-foreground">
                  Upgrade to HerCycle Premium to access detailed trends analysis and personalized insights.
                </p>
                <Button asChild className="mt-4 bg-hercycle-deepPink hover:bg-hercycle-deepPink/90">
                  <Link to="/premium">View Premium Options</Link>
                </Button>
              </div>
              <CardHeader>
                <CardTitle>Long-term Trends</CardTitle>
                <CardDescription>
                  Analyze how your cycle has changed over time
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[400px]">
                <div className="h-full w-full flex items-center justify-center">
                  <p className="text-muted-foreground">Advanced charts available with premium</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default DashboardInsights;
