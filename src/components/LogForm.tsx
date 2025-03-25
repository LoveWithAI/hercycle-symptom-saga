import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { format } from "date-fns";
import { CalendarIcon, XCircle, Frown, Meh, Smile, Heart, Droplet } from "lucide-react";

const symptoms = [
  { id: "cramps", label: "Cramps", icon: "💫" },
  { id: "headache", label: "Headache", icon: "🤕" },
  { id: "bloating", label: "Bloating", icon: "😶‍🌫️" },
  { id: "fatigue", label: "Fatigue", icon: "😴" },
  { id: "backache", label: "Backache", icon: "🔙" },
  { id: "breastTenderness", label: "Breast Tenderness", icon: "😣" },
  { id: "acne", label: "Acne", icon: "😖" },
  { id: "cravings", label: "Cravings", icon: "🍫" },
  { id: "nausea", label: "Nausea", icon: "🤢" },
  { id: "dizziness", label: "Dizziness", icon: "😵‍💫" },
  { id: "insomnia", label: "Insomnia", icon: "😳" },
  { id: "spotting", label: "Spotting", icon: "🔴" },
];

const moods = [
  { id: "happy", label: "Happy", icon: <Smile className="w-6 h-6" /> },
  { id: "neutral", label: "Neutral", icon: <Meh className="w-6 h-6" /> },
  { id: "sad", label: "Sad", icon: <Frown className="w-6 h-6" /> },
  { id: "irritable", label: "Irritable", icon: "😠" },
  { id: "anxious", label: "Anxious", icon: "😰" },
  { id: "emotional", label: "Emotional", icon: "😢" },
];

const flowLevels = [
  { id: "light", label: "Light", color: "bg-hercycle-pink/30" },
  { id: "medium", label: "Medium", color: "bg-hercycle-pink/60" },
  { id: "heavy", label: "Heavy", color: "bg-hercycle-deepPink" },
];

const LogForm = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [flow, setFlow] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [painLevel, setPainLevel] = useState([0]);
  const [energyLevel, setEnergyLevel] = useState([50]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleSymptom = (symptomId: string) => {
    if (selectedSymptoms.includes(symptomId)) {
      setSelectedSymptoms(selectedSymptoms.filter(id => id !== symptomId));
    } else {
      setSelectedSymptoms([...selectedSymptoms, symptomId]);
    }
  };

  const selectMood = (moodId: string) => {
    setSelectedMood(moodId === selectedMood ? null : moodId);
  };

  const selectFlow = (flowId: string) => {
    setFlow(flowId === flow ? null : flowId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // In a real app, this would connect to Supabase
    console.log('Submitting log:', {
      date,
      flow,
      painLevel: painLevel[0],
      energyLevel: energyLevel[0],
      symptoms: selectedSymptoms,
      mood: selectedMood,
      notes
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setSelectedSymptoms([]);
        setSelectedMood(null);
        setFlow(null);
        setNotes("");
        setPainLevel([0]);
        setEnergyLevel([50]);
        setIsSubmitted(false);
      }, 2000);
    }, 1500);
  };

  return (
    <div className="max-w-2xl w-full mx-auto animate-fade-in">
      {isSubmitted ? (
        <div className="glass-card hercycle-shadow overflow-hidden">
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold mb-2">Log Successfully Saved</h2>
            <p className="text-foreground/70 mb-6">Your entry has been recorded.</p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-hercycle-deepPink hover:bg-hercycle-deepPink/90 text-white"
            >
              Log Another Entry
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="glass-card hercycle-shadow overflow-hidden">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-6">Log your cycle</h2>
              
              <div className="space-y-6">
                <div className="flex flex-col space-y-2">
                  <label className="font-medium">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => date && setDate(date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <label className="font-medium">Flow</label>
                  <div className="grid grid-cols-3 gap-3">
                    {flowLevels.map((level) => (
                      <Button
                        key={level.id}
                        type="button"
                        variant="outline"
                        className={`flex items-center justify-center h-16 ${flow === level.id ? 'border-hercycle-deepPink ring-1 ring-hercycle-deepPink/20' : ''}`}
                        onClick={() => selectFlow(level.id)}
                      >
                        <div className="flex flex-col items-center">
                          <div className={`w-6 h-6 rounded-full ${level.color} mb-1`}></div>
                          <span className="text-sm">{level.label}</span>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>
                
                <Tabs defaultValue="symptoms">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="symptoms">Symptoms</TabsTrigger>
                    <TabsTrigger value="mood">Mood</TabsTrigger>
                    <TabsTrigger value="details">Details</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="symptoms" className="space-y-4">
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                      {symptoms.map((symptom) => (
                        <Button
                          key={symptom.id}
                          type="button"
                          variant="outline"
                          className={`h-16 ${selectedSymptoms.includes(symptom.id) ? 'border-hercycle-deepPink ring-1 ring-hercycle-deepPink/20 bg-hercycle-rose/30' : ''}`}
                          onClick={() => toggleSymptom(symptom.id)}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-lg mb-1">{symptom.icon}</span>
                            <span className="text-xs">{symptom.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="mood" className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                      {moods.map((mood) => (
                        <Button
                          key={mood.id}
                          type="button"
                          variant="outline"
                          className={`h-16 ${selectedMood === mood.id ? 'border-hercycle-deepPink ring-1 ring-hercycle-deepPink/20 bg-hercycle-rose/30' : ''}`}
                          onClick={() => selectMood(mood.id)}
                        >
                          <div className="flex flex-col items-center">
                            <span className="text-lg mb-1">{typeof mood.icon === 'string' ? mood.icon : mood.icon}</span>
                            <span className="text-xs">{mood.label}</span>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="details" className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-medium flex items-center">
                          <Heart size={16} className="mr-1 text-hercycle-deepPink" />
                          Pain Level
                        </label>
                        <span className="text-sm text-foreground/70">
                          {painLevel[0] === 0 ? 'None' : painLevel[0] < 50 ? 'Mild' : painLevel[0] < 80 ? 'Moderate' : 'Severe'}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[0]}
                        max={100}
                        step={1}
                        value={painLevel}
                        onValueChange={setPainLevel}
                        className="py-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="font-medium flex items-center">
                          <Droplet size={16} className="mr-1 text-hercycle-deepPink" />
                          Energy Level
                        </label>
                        <span className="text-sm text-foreground/70">
                          {energyLevel[0] < 30 ? 'Low' : energyLevel[0] < 70 ? 'Medium' : 'High'}
                        </span>
                      </div>
                      <Slider
                        defaultValue={[50]}
                        max={100}
                        step={1}
                        value={energyLevel}
                        onValueChange={setEnergyLevel}
                        className="py-2"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="font-medium">Notes</label>
                      <textarea
                        className="w-full p-3 border rounded-lg min-h-[100px] focus:outline-none focus:ring-2 focus:ring-hercycle-deepPink/20 focus:border-hercycle-deepPink"
                        placeholder="Add any additional notes here..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      ></textarea>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
            
            <div className="p-6 border-t border-border bg-muted/30">
              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="ghost"
                  className="text-foreground/70"
                  onClick={() => {
                    setSelectedSymptoms([]);
                    setSelectedMood(null);
                    setFlow(null);
                    setNotes("");
                    setPainLevel([0]);
                    setEnergyLevel([50]);
                  }}
                >
                  <XCircle size={16} className="mr-1" />
                  Clear Form
                </Button>
                
                <Button 
                  type="submit" 
                  className="bg-hercycle-deepPink hover:bg-hercycle-deepPink/90 text-white"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </div>
                  ) : (
                    'Save Log'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default LogForm;
