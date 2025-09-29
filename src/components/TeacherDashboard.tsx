import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { 
  Users, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Target, 
  LogOut, 
  BookOpen, 
  Search,
  Calendar,
  User,
  FileText,
  GraduationCap as ExamIcon,
  Plus,
  Monitor,
  QrCode
} from 'lucide-react';
import { useApp } from '../App';
import { ClassroomDisplay } from './ClassroomDisplay';

interface TeacherDashboardProps {
  onLogout: () => void;
}

const mockClasses = [
  {
    id: 1,
    name: 'Mathematics 101',
    students: 25,
    schedule: 'Mon, Wed, Fri 9:00 AM'
  },
  {
    id: 2,
    name: 'Advanced Calculus',
    students: 18,
    schedule: 'Tue, Thu 10:00 AM'
  },
  {
    id: 3,
    name: 'Statistics',
    students: 22,
    schedule: 'Mon, Wed 2:00 PM'
  }
];

const mockStudents = [
  { id: 1, name: 'Alex Johnson', class: 'Mathematics 101', attendance: 90, status: 'present' },
  { id: 2, name: 'Emma Davis', class: 'Mathematics 101', attendance: 85, status: 'present' },
  { id: 3, name: 'Michael Chen', class: 'Mathematics 101', attendance: 78, status: 'absent' },
  { id: 4, name: 'Sarah Wilson', class: 'Mathematics 101', attendance: 92, status: 'present' },
  { id: 5, name: 'David Brown', class: 'Mathematics 101', attendance: 88, status: 'present' },
  { id: 6, name: 'Lisa Garcia', class: 'Mathematics 101', attendance: 95, status: 'present' },
  { id: 7, name: 'James Miller', class: 'Mathematics 101', attendance: 82, status: 'absent' },
  { id: 8, name: 'Anna Taylor', class: 'Mathematics 101', attendance: 89, status: 'present' }
];

const mockTasks = [
  {
    id: 1,
    title: 'Practice quadratic equations',
    subject: 'Mathematics',
    targetStudents: ['Alex Johnson', 'Michael Chen'],
    difficulty: 'medium',
    estimatedTime: '30 mins'
  },
  {
    id: 2,
    title: 'Review derivative concepts',
    subject: 'Calculus',
    targetStudents: ['Emma Davis', 'Sarah Wilson'],
    difficulty: 'high',
    estimatedTime: '45 mins'
  },
  {
    id: 3,
    title: 'Statistics problem set',
    subject: 'Statistics',
    targetStudents: ['David Brown', 'Lisa Garcia'],
    difficulty: 'low',
    estimatedTime: '25 mins'
  }
];

const mockRoutines = [
  {
    studentName: 'Alex Johnson',
    routine: [
      { time: '9:00 AM', activity: 'Mathematics Class', type: 'class' },
      { time: '10:00 AM', activity: 'Review algebra concepts', type: 'study' },
      { time: '11:00 AM', activity: 'Free period', type: 'free' },
      { time: '12:00 PM', activity: 'Lunch', type: 'break' }
    ]
  }
];

export function TeacherDashboard({ onLogout }: TeacherDashboardProps) {
  const { user, tests, setTests, exams, setExams } = useApp();
  const [selectedClass, setSelectedClass] = useState(mockClasses[0]);
  const [attendanceData, setAttendanceData] = useState(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCreateTestOpen, setIsCreateTestOpen] = useState(false);
  const [isCreateExamOpen, setIsCreateExamOpen] = useState(false);
  
  const [newTest, setNewTest] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: '',
    syllabus: ''
  });

  const [newExam, setNewExam] = useState({
    title: '',
    subject: '',
    date: '',
    time: '',
    duration: '',
    syllabus: '',
    totalMarks: ''
  });

  const handleAttendanceToggle = (studentId: number) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: student.status === 'present' ? 'absent' : 'present' }
          : student
      )
    );
  };

  const filteredStudents = attendanceData.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    student.class === selectedClass.name
  );

  const getAttendanceStats = () => {
    const classStudents = attendanceData.filter(s => s.class === selectedClass.name);
    const present = classStudents.filter(s => s.status === 'present').length;
    const total = classStudents.length;
    return { present, absent: total - present, total };
  };

  const stats = getAttendanceStats();

  const handleCreateTest = () => {
    const test = {
      id: Date.now().toString(),
      ...newTest,
      syllabus: newTest.syllabus.split(',').map(s => s.trim()),
      createdBy: user?.name || 'Teacher'
    };
    setTests([...tests, test]);
    setNewTest({ title: '', subject: '', date: '', time: '', duration: '', syllabus: '' });
    setIsCreateTestOpen(false);
  };

  const handleCreateExam = () => {
    const exam = {
      id: Date.now().toString(),
      ...newExam,
      syllabus: newExam.syllabus.split(',').map(s => s.trim()),
      totalMarks: parseInt(newExam.totalMarks),
      createdBy: user?.name || 'Teacher'
    };
    setExams([...exams, exam]);
    setNewExam({ title: '', subject: '', date: '', time: '', duration: '', syllabus: '', totalMarks: '' });
    setIsCreateExamOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Welcome, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">Teacher Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <p className="text-2xl font-semibold">{mockClasses.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Present Today</p>
                  <p className="text-2xl font-semibold">{stats.present}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center">
                  <XCircle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Absent Today</p>
                  <p className="text-2xl font-semibold">{stats.absent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending Tasks</p>
                  <p className="text-2xl font-semibold">{mockTasks.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="attendance" className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="classroom" className="flex items-center gap-2">
              <Monitor className="w-4 h-4" />
              Live Class
            </TabsTrigger>
            <TabsTrigger value="classes" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Classes
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="routines" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Routines
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

          {/* Attendance Tab */}
          <TabsContent value="attendance" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Mark Attendance</CardTitle>
                    <CardDescription>Quick tap to mark student attendance</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {mockClasses.map((cls) => (
                      <Button
                        key={cls.id}
                        variant={selectedClass.id === cls.id ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedClass(cls)}
                      >
                        {cls.name}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search students..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stats.present}/{stats.total} Present
                    </div>
                  </div>

                  <div className="grid gap-3">
                    {filteredStudents.map((student) => (
                      <div
                        key={student.id}
                        className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-colors ${
                          student.status === 'present'
                            ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                            : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                        }`}
                        onClick={() => handleAttendanceToggle(student.id)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center">
                            <User className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Attendance: {student.attendance}%
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={student.status === 'present' ? 'default' : 'destructive'}
                          >
                            {student.status === 'present' ? 'Present' : 'Absent'}
                          </Badge>
                          {student.status === 'present' ? (
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-600" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classroom Display Tab */}
          <TabsContent value="classroom">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Monitor className="w-5 h-5" />
                  Live Classroom Display
                </CardTitle>
                <CardDescription>
                  Real-time attendance display for your current class
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="class-select">Select Active Class:</Label>
                    <div className="flex gap-2 mt-2">
                      {mockClasses.map((cls) => (
                        <Button
                          key={cls.id}
                          variant={selectedClass.id === cls.id ? 'default' : 'outline'}
                          onClick={() => setSelectedClass(cls)}
                        >
                          {cls.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="border-2 border-dashed border-muted-foreground rounded-lg p-6">
                    <div className="text-center">
                      <Monitor className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Classroom Display Mode</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        This would show the live classroom attendance display for {selectedClass.name}
                      </p>
                      <Button>
                        <QrCode className="w-4 h-4 mr-2" />
                        Generate QR Code
                      </Button>
                    </div>
                  </div>
                  
                  {/* Mini Preview */}
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h4 className="font-medium mb-3">Quick Stats for {selectedClass.name}</h4>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-semibold text-blue-600">
                          {filteredStudents.length}
                        </p>
                        <p className="text-sm text-muted-foreground">Total Students</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-green-600">
                          {filteredStudents.filter(s => s.status === 'present').length}
                        </p>
                        <p className="text-sm text-muted-foreground">Present</p>
                      </div>
                      <div>
                        <p className="text-2xl font-semibold text-orange-600">
                          {filteredStudents.filter(s => s.status === 'absent').length}
                        </p>
                        <p className="text-sm text-muted-foreground">Absent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <CardTitle>My Classes</CardTitle>
                <CardDescription>Overview of all your classes</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockClasses.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                          <BookOpen className="w-5 h-5 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{cls.name}</p>
                          <p className="text-sm text-muted-foreground">{cls.schedule}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">Students</p>
                          <p className="font-medium">{cls.students}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tasks Tab */}
          <TabsContent value="tasks">
            <Card>
              <CardHeader>
                <CardTitle>Suggested Tasks</CardTitle>
                <CardDescription>Personalized tasks for students during free periods</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTasks.map((task) => (
                    <div key={task.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <p className="text-sm text-muted-foreground">{task.subject}</p>
                          <div className="flex gap-2">
                            <Badge variant="outline">{task.difficulty}</Badge>
                            <Badge variant="secondary">{task.estimatedTime}</Badge>
                          </div>
                          <div className="flex gap-1 flex-wrap">
                            {task.targetStudents.map((student, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {student}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button size="sm">
                          Assign
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Routines Tab */}
          <TabsContent value="routines">
            <Card>
              <CardHeader>
                <CardTitle>Generated Routines</CardTitle>
                <CardDescription>Daily routines combining class schedules and study time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {mockRoutines.map((routine, index) => (
                    <div key={index} className="space-y-3">
                      <h4 className="font-medium">{routine.studentName}</h4>
                      <div className="space-y-2">
                        {routine.routine.map((item, itemIndex) => (
                          <div key={itemIndex} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                            <div className="text-sm font-medium w-20">{item.time}</div>
                            <div className={`w-3 h-3 rounded-full ${
                              item.type === 'class' ? 'bg-blue-500' :
                              item.type === 'study' ? 'bg-purple-500' :
                              item.type === 'free' ? 'bg-green-500' : 'bg-gray-500'
                            }`} />
                            <div className="flex-1">
                              <p>{item.activity}</p>
                            </div>
                            <Badge variant="outline" className="capitalize">
                              {item.type}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tests Tab */}
          <TabsContent value="tests">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Manage Tests</CardTitle>
                    <CardDescription>Create and manage tests for your students</CardDescription>
                  </div>
                  <Dialog open={isCreateTestOpen} onOpenChange={setIsCreateTestOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Test
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Test</DialogTitle>
                        <DialogDescription>
                          Add a new test for your students
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="testTitle">Test Title</Label>
                          <Input
                            id="testTitle"
                            value={newTest.title}
                            onChange={(e) => setNewTest({ ...newTest, title: e.target.value })}
                            placeholder="e.g., Algebra Quiz"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="testSubject">Subject</Label>
                          <Input
                            id="testSubject"
                            value={newTest.subject}
                            onChange={(e) => setNewTest({ ...newTest, subject: e.target.value })}
                            placeholder="e.g., Mathematics"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="testDate">Date</Label>
                            <Input
                              id="testDate"
                              type="date"
                              value={newTest.date}
                              onChange={(e) => setNewTest({ ...newTest, date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="testTime">Time</Label>
                            <Input
                              id="testTime"
                              type="time"
                              value={newTest.time}
                              onChange={(e) => setNewTest({ ...newTest, time: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="testDuration">Duration</Label>
                          <Input
                            id="testDuration"
                            value={newTest.duration}
                            onChange={(e) => setNewTest({ ...newTest, duration: e.target.value })}
                            placeholder="e.g., 1 hour"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="testSyllabus">Syllabus (comma-separated)</Label>
                          <Textarea
                            id="testSyllabus"
                            value={newTest.syllabus}
                            onChange={(e) => setNewTest({ ...newTest, syllabus: e.target.value })}
                            placeholder="e.g., Linear equations, Quadratic equations, Polynomials"
                            rows={3}
                          />
                        </div>
                        <Button onClick={handleCreateTest} className="w-full">
                          Create Test
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tests.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No tests created yet</p>
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
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Exams Tab */}
          <TabsContent value="exams">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Manage Exams</CardTitle>
                    <CardDescription>Create and manage exams for your students</CardDescription>
                  </div>
                  <Dialog open={isCreateExamOpen} onOpenChange={setIsCreateExamOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Exam
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                      <DialogHeader>
                        <DialogTitle>Create New Exam</DialogTitle>
                        <DialogDescription>
                          Add a new exam for your students
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="examTitle">Exam Title</Label>
                          <Input
                            id="examTitle"
                            value={newExam.title}
                            onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
                            placeholder="e.g., Mid-term Mathematics Exam"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="examSubject">Subject</Label>
                          <Input
                            id="examSubject"
                            value={newExam.subject}
                            onChange={(e) => setNewExam({ ...newExam, subject: e.target.value })}
                            placeholder="e.g., Mathematics"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="examDate">Date</Label>
                            <Input
                              id="examDate"
                              type="date"
                              value={newExam.date}
                              onChange={(e) => setNewExam({ ...newExam, date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="examTime">Time</Label>
                            <Input
                              id="examTime"
                              type="time"
                              value={newExam.time}
                              onChange={(e) => setNewExam({ ...newExam, time: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="examDuration">Duration</Label>
                            <Input
                              id="examDuration"
                              value={newExam.duration}
                              onChange={(e) => setNewExam({ ...newExam, duration: e.target.value })}
                              placeholder="e.g., 3 hours"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="examMarks">Total Marks</Label>
                            <Input
                              id="examMarks"
                              type="number"
                              value={newExam.totalMarks}
                              onChange={(e) => setNewExam({ ...newExam, totalMarks: e.target.value })}
                              placeholder="e.g., 100"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="examSyllabus">Syllabus (comma-separated)</Label>
                          <Textarea
                            id="examSyllabus"
                            value={newExam.syllabus}
                            onChange={(e) => setNewExam({ ...newExam, syllabus: e.target.value })}
                            placeholder="e.g., Calculus, Algebra, Trigonometry, Statistics"
                            rows={3}
                          />
                        </div>
                        <Button onClick={handleCreateExam} className="w-full">
                          Create Exam
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exams.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <ExamIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>No exams created yet</p>
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
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}