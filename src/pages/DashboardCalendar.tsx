
import React, { useState } from 'react';
import { format } from 'date-fns';
import DashboardLayout from '@/components/DashboardLayout';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for period tracking
const mockPeriodsData = [
  { date: new Date(2024, 4, 3), type: 'period', intensity: 'heavy' },
  { date: new Date(2024, 4, 4), type: 'period', intensity: 'heavy' },
  { date: new Date(2024, 4, 5), type: 'period', intensity: 'medium' },
  { date: new Date(2024, 4, 6), type: 'period', intensity: 'light' },
  { date: new Date(2024, 4, 7), type: 'period', intensity: 'light' },
  { date: new Date(2024, 3, 5), type: 'period', intensity: 'heavy' },
  { date: new Date(2024, 3, 6), type: 'period', intensity: 'heavy' },
  { date: new Date(2024, 3, 7), type: 'period', intensity: 'medium' },
  { date: new Date(2024, 3, 8), type: 'period', intensity: 'light' },
  { date: new Date(2024, 3, 9), type: 'period', intensity: 'light' },
  { date: new Date(2024, 4, 16), type: 'ovulation' },
];

// Mock symptoms data
const mockSymptomsData = [
  { date: new Date(2024, 4, 3), symptoms: ['cramps', 'headache', 'fatigue'] },
  { date: new Date(2024, 4, 4), symptoms: ['cramps', 'bloating'] },
  { date: new Date(2024, 4, 5), symptoms: ['fatigue'] },
  { date: new Date(2024, 3, 5), symptoms: ['cramps', 'headache'] },
  { date: new Date(2024, 3, 6), symptoms: ['cramps', 'bloating', 'mood swings'] },
];

const DashboardCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedDateData, setSelectedDateData] = useState<any>(null);

  const getDateStyle = (day: Date) => {
    const periodData = mockPeriodsData.find(
      (p) => p.date.getDate() === day.getDate() && 
             p.date.getMonth() === day.getMonth() && 
             p.date.getFullYear() === day.getFullYear()
    );

    if (periodData) {
      if (periodData.type === 'period') {
        switch (periodData.intensity) {
          case 'heavy':
            return 'bg-hercycle-deepPink text-white hover:bg-hercycle-deepPink hover:text-white';
          case 'medium':
            return 'bg-hercycle-rose text-white hover:bg-hercycle-rose hover:text-white';
          case 'light':
            return 'bg-hercycle-rose/60 text-white hover:bg-hercycle-rose/60 hover:text-white';
          default:
            return '';
        }
      } else if (periodData.type === 'ovulation') {
        return 'bg-blue-400 text-white hover:bg-blue-400 hover:text-white';
      }
    }
    return '';
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    
    if (selectedDate) {
      // Find period data for the selected date
      const periodData = mockPeriodsData.find(
        (p) => p.date.getDate() === selectedDate.getDate() && 
               p.date.getMonth() === selectedDate.getMonth() && 
               p.date.getFullYear() === selectedDate.getFullYear()
      );
      
      // Find symptoms data for the selected date
      const symptomsData = mockSymptomsData.find(
        (s) => s.date.getDate() === selectedDate.getDate() && 
               s.date.getMonth() === selectedDate.getMonth() && 
               s.date.getFullYear() === selectedDate.getFullYear()
      );
      
      setSelectedDateData({
        period: periodData,
        symptoms: symptomsData ? symptomsData.symptoms : [],
        date: selectedDate
      });
    } else {
      setSelectedDateData(null);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
          <p className="text-muted-foreground">
            Track your cycle and symptoms over time.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="glass-card hercycle-shadow p-4 md:col-span-8">
            <div className="w-full flex justify-center">
              <CalendarComponent
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                className="rounded-md border"
                modifiersClassNames={{
                  selected: 'bg-primary text-primary-foreground'
                }}
                modifiers={{
                  customModifier: (date) => !!mockPeriodsData.find(
                    (p) => p.date.getDate() === date.getDate() && 
                           p.date.getMonth() === date.getMonth() && 
                           p.date.getFullYear() === date.getFullYear()
                  )
                }}
                components={{
                  Day: ({ date: dayDate, ...props }) => {
                    const customStyle = getDateStyle(dayDate);
                    return (
                      <button
                        {...props}
                        className={`${props.className} ${customStyle}`}
                      />
                    );
                  }
                }}
              />
            </div>
            <div className="flex justify-center gap-4 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-hercycle-deepPink"></div>
                <span className="text-sm">Heavy flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-hercycle-rose"></div>
                <span className="text-sm">Medium flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-hercycle-rose/60"></div>
                <span className="text-sm">Light flow</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-blue-400"></div>
                <span className="text-sm">Ovulation</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-4 space-y-6">
            {selectedDateData ? (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>
                    {format(selectedDateData.date, 'MMMM d, yyyy')}
                  </CardTitle>
                  <CardDescription>
                    {selectedDateData.period ? 
                      `${selectedDateData.period.type === 'period' ? 'Period day' : 'Ovulation day'}` : 
                      'No period data recorded'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {selectedDateData.period && selectedDateData.period.type === 'period' && (
                    <div className="mb-4">
                      <p className="text-sm font-medium mb-1">Flow intensity:</p>
                      <Badge 
                        className={`${
                          selectedDateData.period.intensity === 'heavy' ? 'bg-hercycle-deepPink' :
                          selectedDateData.period.intensity === 'medium' ? 'bg-hercycle-rose' :
                          'bg-hercycle-rose/60'
                        }`}
                      >
                        {selectedDateData.period.intensity.charAt(0).toUpperCase() + selectedDateData.period.intensity.slice(1)}
                      </Badge>
                    </div>
                  )}
                  
                  <div>
                    <p className="text-sm font-medium mb-1">Symptoms:</p>
                    {selectedDateData.symptoms.length > 0 ? (
                      <div className="flex flex-wrap gap-2">
                        {selectedDateData.symptoms.map((symptom: string, index: number) => (
                          <Badge key={index} variant="outline" className="capitalize">
                            {symptom}
                          </Badge>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">No symptoms recorded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Daily Details</CardTitle>
                  <CardDescription>
                    Select a date to view details
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center py-6">
                    Click on a date to view recorded information
                  </p>
                </CardContent>
              </Card>
            )}
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming</CardTitle>
                <CardDescription>
                  Your predicted cycle events
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-hercycle-deepPink"></div>
                    <span>Next period</span>
                  </div>
                  <span className="font-semibold">June 1, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                    <span>Next ovulation</span>
                  </div>
                  <span className="font-semibold">May 16, 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <span>Fertile window starts</span>
                  </div>
                  <span className="font-semibold">May 13, 2024</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default DashboardCalendar;
