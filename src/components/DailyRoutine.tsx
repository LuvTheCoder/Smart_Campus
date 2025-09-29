import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Calendar, 
  Clock, 
  BookOpen, 
  Target, 
  Coffee,
  CheckCircle,
  Circle,
  TrendingUp,
  Users,
  Brain
} from 'lucide-react';
import { useApp } from '../App';

interface DailyRoutineProps {
  studentId: string;
}

export function DailyRoutine({ studentId }: DailyRoutineProps) {
  const { getDailyRoutine } = useApp();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [completedItems, setCompletedItems] = useState<string[]>([]);

  const routine = getDailyRoutine(studentId, selectedDate);
  const currentTime = new Date().toLocaleTimeString('en-US', { 
    hour12: false, 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const toggleItemCompletion = (itemId: string) => {
    setCompletedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'class': return Users;
      case 'task': return BookOpen;
      case 'goal': return Target;
      case 'break': return Coffee;
      default: return Circle;
    }
  };

  const getItemColor = (type: string) => {
    switch (type) {
      case 'class': return 'border-blue-200 bg-blue-50 dark:bg-blue-900/20';
      case 'task': return 'border-green-200 bg-green-50 dark:bg-green-900/20';
      case 'goal': return 'border-purple-200 bg-purple-50 dark:bg-purple-900/20';
      case 'break': return 'border-orange-200 bg-orange-50 dark:bg-orange-900/20';
      default: return 'border-gray-200 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high': return 'border-l-4 border-l-red-500';
      case 'medium': return 'border-l-4 border-l-yellow-500';
      case 'low': return 'border-l-4 border-l-green-500';
      default: return '';
    }
  };

  const isCurrentTime = (startTime: string, endTime: string) => {
    return currentTime >= startTime && currentTime <= endTime;
  };

  const getCompletionStats = () => {
    const totalItems = routine.length;
    const completed = completedItems.length;
    const classItems = routine.filter(item => item.type === 'class').length;
    const taskItems = routine.filter(item => item.type === 'task').length;
    const goalItems = routine.filter(item => item.type === 'goal').length;
    
    return { totalItems, completed, classItems, taskItems, goalItems };
  };

  const stats = getCompletionStats();

  return (
    <div className="space-y-6">
      {/* Header with Date Selection */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Daily Routine
              </CardTitle>
              <CardDescription>
                Your personalized schedule combining classes, tasks, and goals
              </CardDescription>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border rounded-lg bg-background"
            />
          </div>
        </CardHeader>
      </Card>

      {/* Progress Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-xl font-semibold">{stats.completed}/{stats.totalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm text-muted-foreground">Classes</p>
                <p className="text-xl font-semibold">{stats.classItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-sm text-muted-foreground">Tasks</p>
                <p className="text-xl font-semibold">{stats.taskItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-purple-600" />
              <div>
                <p className="text-sm text-muted-foreground">Goals</p>
                <p className="text-xl font-semibold">{stats.goalItems}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Routine Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Timeline for {new Date(selectedDate).toLocaleDateString()}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {routine.map((item, index) => {
              const isCompleted = completedItems.includes(item.id);
              const isCurrent = isCurrentTime(item.startTime, item.endTime);
              const Icon = getItemIcon(item.type);
              
              return (
                <div 
                  key={item.id}
                  className={`relative p-4 border rounded-lg transition-all ${
                    getItemColor(item.type)
                  } ${getPriorityColor(item.priority)} ${
                    isCurrent ? 'ring-2 ring-blue-500 ring-opacity-50' : ''
                  } ${isCompleted ? 'opacity-75' : ''}`}
                >
                  {/* Timeline connector */}
                  {index < routine.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-8 bg-border" />
                  )}
                  
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      <button
                        onClick={() => toggleItemCompletion(item.id)}
                        className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                          isCompleted 
                            ? 'bg-green-600 border-green-600 text-white' 
                            : 'border-muted-foreground hover:border-green-600'
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <Circle className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Icon className="w-5 h-5" />
                          <h4 className={`font-medium ${isCompleted ? 'line-through' : ''}`}>
                            {item.title}
                          </h4>
                          {isCurrent && (
                            <Badge variant="default" className="bg-blue-600">
                              Current
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type}
                          </Badge>
                          {item.priority && (
                            <Badge 
                              variant="secondary" 
                              className={`text-xs ${
                                item.priority === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30' :
                                item.priority === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30' :
                                'bg-green-100 text-green-700 dark:bg-green-900/30'
                              }`}
                            >
                              {item.priority}
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.startTime} - {item.endTime}
                        </span>
                        {item.subject && (
                          <span>{item.subject}</span>
                        )}
                      </div>

                      {item.description && (
                        <p className="text-sm text-muted-foreground">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Add Study Session
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Set Personal Goal
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Coffee className="w-4 h-4" />
              Schedule Break
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}