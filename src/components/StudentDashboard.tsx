import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { Calendar, BookOpen, CheckCircle, XCircle, Clock, Target, LogOut, User, FileText, GraduationCap as ExamIcon, QrCode, Brain, CalendarDays, Plus, AlertCircle, Zap, TrendingUp } from 'lucide-react';
import { useApp } from '../App';
import { QRAttendance } from './QRAttendance';
import { PersonalizedTasks } from './PersonalizedTasks';
import { DailyRoutine } from './DailyRoutine';

interface StudentDashboardProps {
  onLogout: () => void;
}

const mockAttendanceData = {
  subjects: [
    { name: 'Mathematics', attended: 18, total: 20, percentage: 90 },
    { name: 'Physics', attended: 15, total: 18, percentage: 83 },
    { name: 'Chemistry', attended: 16, total: 19, percentage: 84 },
    { name: 'Computer Science', attended: 19, total: 20, percentage: 95 },
    { name: 'English', attended: 14, total: 17, percentage: 82 }
  ],
  absentDays: [
    { date: '2024-01-15', subject: 'Physics', reason: 'Sick' },
    { date: '2024-01-22', subject: 'Mathematics', reason: 'Family emergency' },
    { date: '2024-02-05', subject: 'Chemistry', reason: 'Medical appointment' }
  ]
};

const mockTasks = [
  {
    id: 1,
    title: 'Complete Math Assignment #5',
    subject: 'Mathematics',
    dueDate: '2024-02-18',
    priority: 'high',
    status: 'pending'
  },
  {
    id: 2,
    title: 'Physics Lab Report',
    subject: 'Physics',
    dueDate: '2024-02-20',
    priority: 'medium',
    status: 'in-progress'
  },
  {
    id: 3,
    title: 'Chemistry Research Project',
    subject: 'Chemistry',
    dueDate: '2024-02-25',
    priority: 'low',
    status: 'pending'
  }
];

export function StudentDashboard({ onLogout }: StudentDashboardProps) {
  const { user, tests, exams } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [showAlert, setShowAlert] = useState('');

  const handleQuickAction = (action: string, targetTab?: string) => {
    switch (action) {
      case 'mark-attendance':
        setActiveTab('qr-attendance');
        break;
      case 'view-tasks':
        setActiveTab('tasks');
        break;
      case 'check-routine':
        setActiveTab('routine');
        break;
      case 'upcoming-tests':
        setActiveTab('tests');
        break;
      case 'study-material':
        setShowAlert('study-material');
        setTimeout(() => setShowAlert(''), 3000);
        break;
      case 'study-guide':
        setShowAlert('study-guide');
        setTimeout(() => setShowAlert(''), 3000);
        break;
      default:
        if (targetTab) setActiveTab(targetTab);
    }
  };

  const getOverallAttendance = () => {
    const totalClasses = mockAttendanceData.subjects.reduce((sum, subject) => sum + subject.total, 0);
    const totalAttended = mockAttendanceData.subjects.reduce((sum, subject) => sum + subject.attended, 0);
    return Math.round((totalAttended / totalClasses) * 100);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Welcome back, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">Student Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Alert Messages */}
        {showAlert && (
          <Alert className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {showAlert === 'study-material' && 'Study materials are being prepared for this test. Check back soon!'}
              {showAlert === 'study-guide' && 'Study guide is being generated based on the exam syllabus. This will be available shortly!'}
            </AlertDescription>
          </Alert>
        )}

        {/* Quick Actions Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-600" />
              Quick Actions
            </CardTitle>
            <CardDescription>Perform common tasks quickly</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center gap-2 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => handleQuickAction('mark-attendance')}
              >
                <QrCode className="w-6 h-6 text-blue-600" />
                <span className="text-sm">Mark Attendance</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center gap-2 hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={() => handleQuickAction('view-tasks')}
              >
                <Brain className="w-6 h-6 text-green-600" />
                <span className="text-sm">Smart Tasks</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center gap-2 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                onClick={() => handleQuickAction('check-routine')}
              >
                <CalendarDays className="w-6 h-6 text-purple-600" />
                <span className="text-sm">Daily Routine</span>
              </Button>
              
              <Button 
                variant="outline" 
                className="h-20 flex flex-col items-center gap-2 hover:bg-orange-50 dark:hover:bg-orange-900/20"
                onClick={() => handleQuickAction('upcoming-tests')}
              >
                <FileText className="w-6 h-6 text-orange-600" />
                <span className="text-sm">View Tests</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleQuickAction('', 'attendance')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Overall Attendance</p>
                  <p className="text-2xl font-semibold">{getOverallAttendance()}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleQuickAction('view-tasks')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl font-semibold">{mockTasks.filter(t => t.status === 'pending').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleQuickAction('view-tasks')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Completed Tasks</p>
                  <p className="text-2xl font-semibold">{mockTasks.filter(t => t.status === 'completed').length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleQuickAction('upcoming-tests')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Tests</p>
                  <p className="text-2xl font-semibold">{tests.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer hover:shadow-md transition-shadow" 
            onClick={() => handleQuickAction('', 'exams')}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                  <ExamIcon className="w-5 h-5 text-indigo-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Exams</p>
                  <p className="text-2xl font-semibold">{exams.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="qr-attendance" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Quick Attend
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Brain className="w-4 h-4" />
              Smart Tasks
            </TabsTrigger>
            <TabsTrigger value="routine" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Daily Routine
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Tests
            </TabsTrigger>
            <TabsTrigger value="exams" className="flex items-center gap-2">
              <ExamIcon className="w-4 h-4" />
              Exams
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Today's Schedule */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Today's Schedule
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">Mathematics 101</p>
                      <p className="text-sm text-muted-foreground">9:00 AM - 10:00 AM</p>
                    </div>
                    <Badge variant="outline" className="bg-blue-100 dark:bg-blue-900/30">Upcoming</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">Physics 201</p>
                      <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 dark:bg-green-900/30">Later Today</Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleQuickAction('check-routine')}
                  >
                    View Full Routine
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <div>
                      <p className="font-medium">Marked present for Mathematics</p>
                      <p className="text-sm text-muted-foreground">Today, 9:05 AM</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Plus className="w-4 h-4 text-blue-600" />
                    <div>
                      <p className="font-medium">New task assigned</p>
                      <p className="text-sm text-muted-foreground">Yesterday, 3:30 PM</p>
                    </div>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => handleQuickAction('view-tasks')}
                  >
                    View All Tasks
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Attendance by Subject</CardTitle>
                <CardDescription>Your attendance percentage for each subject</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockAttendanceData.subjects.map((subject, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{subject.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {subject.attended}/{subject.total} ({subject.percentage}%)
                      </span>
                    </div>
                    <Progress value={subject.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Absences</CardTitle>
                <CardDescription>Days you were absent from classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockAttendanceData.absentDays.map((absence, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <XCircle className="w-4 h-4 text-red-500" />
                        <div>
                          <p className="font-medium">{absence.subject}</p>
                          <p className="text-sm text-muted-foreground">{absence.date}</p>
                        </div>
                      </div>
                      <Badge variant="outline">{absence.reason}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* QR Attendance Tab */}
          <TabsContent value="qr-attendance">
            <QRAttendance studentId={user?.id || ''} />
          </TabsContent>

          {/* Smart Tasks Tab */}
          <TabsContent value="tasks">
            <PersonalizedTasks studentId={user?.id || ''} />
          </TabsContent>

          {/* Daily Routine Tab */}
          <TabsContent value="routine">
            <DailyRoutine studentId={user?.id || ''} />
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Tests</CardTitle>
                <CardDescription>View your scheduled tests and prepare accordingly</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {tests.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming tests scheduled</p>
                  </div>
                ) : (
                  tests.map((test) => (
                    <div key={test.id} className="border rounded-lg p-4 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{test.title}</h4>
                          <p className="text-sm text-muted-foreground">{test.subject}</p>
                        </div>
                        <Badge variant="outline" className="bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300">
                          Test
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{test.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{test.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span>{test.duration}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Syllabus:</p>
                        <div className="flex flex-wrap gap-1">
                          {test.syllabus.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                          Created by {test.createdBy}
                        </span>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="text-purple-600 border-purple-600 hover:bg-purple-50"
                          onClick={() => handleQuickAction('study-material')}
                        >
                          Study Material
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Exams</CardTitle>
                <CardDescription>View your scheduled exams and important details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {exams.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <ExamIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No upcoming exams scheduled</p>
                  </div>
                ) : (
                  exams.map((exam) => (
                    <div key={exam.id} className="border rounded-lg p-4 space-y-3 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 dark:from-indigo-900/10 dark:to-purple-900/10">
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <h4 className="font-medium">{exam.title}</h4>
                          <p className="text-sm text-muted-foreground">{exam.subject}</p>
                        </div>
                        <Badge className="bg-indigo-600 hover:bg-indigo-700">
                          Exam
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{exam.date}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{exam.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Target className="w-4 h-4 text-muted-foreground" />
                          <span>{exam.duration}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-muted-foreground" />
                          <span>{exam.totalMarks} marks</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <p className="text-sm font-medium">Syllabus:</p>
                        <div className="flex flex-wrap gap-1">
                          {exam.syllabus.map((topic, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {topic}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-xs text-muted-foreground">
                          Created by {exam.createdBy}
                        </span>
                        <Button 
                          size="sm" 
                          className="bg-indigo-600 hover:bg-indigo-700"
                          onClick={() => handleQuickAction('study-guide')}
                        >
                          Study Guide
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}