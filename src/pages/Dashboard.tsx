
import React from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import CyclePrediction from '@/components/CyclePrediction';

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            View your cycle information and upcoming predictions.
          </p>
        </div>
        
        <CyclePrediction />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-card hercycle-shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Recent Symptoms</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-hercycle-rose/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      <span className="text-lg">🤕</span>
                    </div>
                    <div>
                      <p className="font-medium">Headache</p>
                      <p className="text-sm text-muted-foreground">2 days ago</p>
                    </div>
                  </div>
                  <span className="text-sm bg-hercycle-rose px-2 py-0.5 rounded-full text-hercycle-deepPink">
                    Moderate
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-hercycle-rose/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      <span className="text-lg">💫</span>
                    </div>
                    <div>
                      <p className="font-medium">Cramps</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <span className="text-sm bg-hercycle-rose px-2 py-0.5 rounded-full text-hercycle-deepPink">
                    Severe
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-hercycle-rose/20 rounded-lg">
                  <div className="flex items-center">
                    <div className="mr-3 flex-shrink-0">
                      <span className="text-lg">😴</span>
                    </div>
                    <div>
                      <p className="font-medium">Fatigue</p>
                      <p className="text-sm text-muted-foreground">3 days ago</p>
                    </div>
                  </div>
                  <span className="text-sm bg-hercycle-rose px-2 py-0.5 rounded-full text-hercycle-deepPink">
                    Mild
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass-card hercycle-shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Mood Patterns</h2>
              <div className="relative h-[220px]">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="p-4 text-center">
                    <p className="text-muted-foreground mb-2">More data needed</p>
                    <p className="text-sm text-muted-foreground">
                      Log your mood regularly to see patterns over time.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
