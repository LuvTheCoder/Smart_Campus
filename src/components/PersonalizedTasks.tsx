import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  BookOpen, 
  Target, 
  Clock, 
  Star, 
  CheckCircle,
  PlayCircle,
  Settings,
  TrendingUp,
  Brain,
  Award
} from 'lucide-react';
import { useApp } from '../App';

interface PersonalizedTasksProps {
  studentId: string;
}

export function PersonalizedTasks({ studentId }: PersonalizedTasksProps) {
  const { getPersonalizedTasks, studentPreferences } = useApp();
  const [activeTask, setActiveTask] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const tasks = getPersonalizedTasks(studentId);
  const prefs = studentPreferences.find(p => p.studentId === studentId);

  const handleStartTask = (taskId: string) => {
    setActiveTask(taskId);
  };

  const handleCompleteTask = (taskId: string) => {
    setCompletedTasks(prev => [...prev, taskId]);
    setActiveTask(null);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100 dark:bg-green-900/30';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/30';
      case 'hard': return 'text-red-600 bg-red-100 dark:bg-red-900/30';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'practice': return BookOpen;
      case 'reading': return BookOpen;
      case 'project': return Target;
      case 'research': return Brain;
      default: return BookOpen;
    }
  };

  return (
    <div className="space-y-6">
      {/* Student Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Your Learning Profile
          </CardTitle>
          <CardDescription>
            Tasks personalized based on your interests, strengths, and goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          {prefs && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Interests
                </h4>
                <div className="flex flex-wrap gap-1">
                  {prefs.interests.map((interest, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {interest}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-1">
                  <TrendingUp className="w-4 h-4" />
                  Strengths
                </h4>
                <div className="flex flex-wrap gap-1">
                  {prefs.strengths.map((strength, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {strength}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-1">
                  <Award className="w-4 h-4" />
                  Career Goals
                </h4>
                <div className="flex flex-wrap gap-1">
                  {prefs.careerGoals.map((goal, index) => (
                    <Badge key={index} variant="default" className="text-xs">
                      {goal}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Progress Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Tasks Completed</span>
                <span className="text-sm text-muted-foreground">
                  {completedTasks.length} / {tasks.length}
                </span>
              </div>
              <Progress 
                value={(completedTasks.length / tasks.length) * 100} 
                className="h-2"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-semibold text-green-600">{completedTasks.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div className="text-center p-3 bg-muted/50 rounded-lg">
                <p className="text-2xl font-semibold text-blue-600">
                  {tasks.reduce((acc, task) => acc + parseInt(task.estimatedTime), 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Minutes</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommended Tasks */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Recommended for You
          </CardTitle>
          <CardDescription>
            Perfect for your free periods and study time
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tasks.map((task) => {
              const isCompleted = completedTasks.includes(task.id);
              const isActive = activeTask === task.id;
              const Icon = getTypeIcon(task.type);
              
              return (
                <div 
                  key={task.id} 
                  className={`p-4 border rounded-lg transition-all ${
                    isCompleted ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800' :
                    isActive ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800' :
                    'bg-card'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        isCompleted ? 'bg-green-100 dark:bg-green-900/30' :
                        isActive ? 'bg-blue-100 dark:bg-blue-900/30' :
                        'bg-muted'
                      }`}>
                        {isCompleted ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : (
                          <Icon className={`w-5 h-5 ${
                            isActive ? 'text-blue-600' : 'text-muted-foreground'
                          }`} />
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="font-medium mb-1">{task.title}</h4>
                        <p className="text-sm text-muted-foreground mb-3">
                          {task.description}
                        </p>
                        
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="outline" className="text-xs">
                            {task.subject}
                          </Badge>
                          <Badge className={`text-xs ${getDifficultyColor(task.difficulty)}`}>
                            {task.difficulty}
                          </Badge>
                          <Badge variant="secondary" className="text-xs flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {task.estimatedTime}
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-1">
                          {task.tags.map((tag, index) => (
                            <span 
                              key={index} 
                              className="text-xs px-2 py-1 bg-muted rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-2 ml-4">
                      {isCompleted ? (
                        <Badge variant="default" className="bg-green-600">
                          Completed
                        </Badge>
                      ) : isActive ? (
                        <Button 
                          size="sm" 
                          onClick={() => handleCompleteTask(task.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Complete
                        </Button>
                      ) : (
                        <Button 
                          size="sm" 
                          onClick={() => handleStartTask(task.id)}
                          className="flex items-center gap-1"
                        >
                          <PlayCircle className="w-4 h-4" />
                          Start
                        </Button>
                      )}
                      
                      {task.dueDate && (
                        <p className="text-xs text-muted-foreground">
                          Due: {new Date(task.dueDate).toLocaleDateString()}
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
    </div>
  );
}