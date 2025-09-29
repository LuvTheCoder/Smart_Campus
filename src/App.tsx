import React, { useState, createContext, useContext } from 'react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { Switch } from './components/ui/switch';
import { Input } from './components/ui/input';
import { Label } from './components/ui/label';
import { Moon, Sun, GraduationCap, BookOpen, Shield } from 'lucide-react';
import { LandingPage } from './components/LandingPage';
import { StudentDashboard } from './components/StudentDashboard';
import { TeacherDashboard } from './components/TeacherDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LoginForm } from './components/LoginForm';

type UserRole = 'student' | 'teacher' | 'admin' | null;

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
}

interface Test {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  syllabus: string[];
  createdBy: string;
}

interface Exam {
  id: string;
  title: string;
  subject: string;
  date: string;
  time: string;
  duration: string;
  syllabus: string[];
  totalMarks: number;
  createdBy: string;
}

interface AttendanceRecord {
  id: string;
  studentId: string;
  classId: string;
  className: string;
  date: string;
  time: string;
  status: 'present' | 'absent' | 'late';
  method: 'qr' | 'proximity' | 'face' | 'manual';
  location?: string;
}

interface StudentPreferences {
  studentId: string;
  interests: string[];
  strengths: string[];
  careerGoals: string[];
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  preferredTaskTypes: string[];
}

interface AcademicTask {
  id: string;
  title: string;
  description: string;
  subject: string;
  difficulty: 'easy' | 'medium' | 'hard';
  estimatedTime: string;
  type: 'practice' | 'reading' | 'project' | 'research';
  tags: string[];
  dueDate?: string;
}

interface DailyRoutineItem {
  id: string;
  type: 'class' | 'task' | 'goal' | 'break';
  title: string;
  startTime: string;
  endTime: string;
  subject?: string;
  description?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface ClassSession {
  id: string;
  name: string;
  subject: string;
  teacherId: string;
  date: string;
  startTime: string;
  endTime: string;
  room: string;
  qrCode?: string;
  attendanceOpen: boolean;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  tests: Test[];
  setTests: (tests: Test[]) => void;
  exams: Exam[];
  setExams: (exams: Exam[]) => void;
  users: User[];
  setUsers: (users: User[]) => void;
  authenticateUser: (email: string, password: string) => User | null;
  attendance: AttendanceRecord[];
  setAttendance: (attendance: AttendanceRecord[]) => void;
  studentPreferences: StudentPreferences[];
  setStudentPreferences: (prefs: StudentPreferences[]) => void;
  academicTasks: AcademicTask[];
  setAcademicTasks: (tasks: AcademicTask[]) => void;
  classSessions: ClassSession[];
  setClassSessions: (sessions: ClassSession[]) => void;
  markAttendance: (studentId: string, classId: string, method: string) => void;
  getPersonalizedTasks: (studentId: string) => AcademicTask[];
  getDailyRoutine: (studentId: string, date: string) => DailyRoutineItem[];
}

const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
};

const mockTests: Test[] = [
  {
    id: '1',
    title: 'Algebra Quiz',
    subject: 'Mathematics',
    date: '2024-02-15',
    time: '10:00 AM',
    duration: '1 hour',
    syllabus: ['Linear equations', 'Quadratic equations', 'Polynomials'],
    createdBy: 'Dr. Sarah Smith'
  },
  {
    id: '2',
    title: 'Motion and Forces Test',
    subject: 'Physics',
    date: '2024-02-18',
    time: '2:00 PM',
    duration: '45 minutes',
    syllabus: ['Newton\'s laws', 'Kinematics', 'Dynamics'],
    createdBy: 'Prof. John Wilson'
  }
];

const mockExams: Exam[] = [
  {
    id: '1',
    title: 'Mid-term Mathematics Exam',
    subject: 'Mathematics',
    date: '2024-03-01',
    time: '9:00 AM',
    duration: '3 hours',
    syllabus: ['Calculus', 'Algebra', 'Trigonometry', 'Statistics'],
    totalMarks: 100,
    createdBy: 'Dr. Sarah Smith'
  },
  {
    id: '2',
    title: 'Physics Final Exam',
    subject: 'Physics',
    date: '2024-03-15',
    time: '1:00 PM',
    duration: '3 hours',
    syllabus: ['Mechanics', 'Thermodynamics', 'Waves', 'Optics'],
    totalMarks: 150,
    createdBy: 'Prof. John Wilson'
  }
];

const mockUsers: User[] = [
  {
    id: 'student1',
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    password: 'demo123',
    role: 'student'
  },
  {
    id: 'student2',
    name: 'Emma Davis',
    email: 'emma.davis@student.edu',
    password: 'demo123',
    role: 'student'
  },
  {
    id: 'teacher1',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@campus.edu',
    password: 'demo123',
    role: 'teacher'
  },
  {
    id: 'teacher2',
    name: 'Prof. John Wilson',
    email: 'john.wilson@campus.edu',
    password: 'demo123',
    role: 'teacher'
  },
  {
    id: 'admin1',
    name: 'Michael Brown',
    email: 'michael.brown@campus.edu',
    password: 'admin123',
    role: 'admin'
  }
];

const mockAttendance: AttendanceRecord[] = [
  {
    id: '1',
    studentId: 'student1',
    classId: 'class1',
    className: 'Mathematics 101',
    date: '2024-02-15',
    time: '09:00',
    status: 'present',
    method: 'qr',
    location: 'Room 101'
  },
  {
    id: '2',
    studentId: 'student1',
    classId: 'class2',
    className: 'Physics 201',
    date: '2024-02-15',
    time: '14:00',
    status: 'present',
    method: 'proximity'
  }
];

const mockStudentPreferences: StudentPreferences[] = [
  {
    studentId: 'student1',
    interests: ['Mathematics', 'Computer Science', 'Physics'],
    strengths: ['Problem Solving', 'Logical Thinking', 'Analysis'],
    careerGoals: ['Software Engineer', 'Data Scientist'],
    learningStyle: 'visual',
    preferredTaskTypes: ['practice', 'project']
  }
];

const mockAcademicTasks: AcademicTask[] = [
  {
    id: '1',
    title: 'Advanced Calculus Practice',
    description: 'Complete practice problems on derivatives and integrals',
    subject: 'Mathematics',
    difficulty: 'medium',
    estimatedTime: '45 minutes',
    type: 'practice',
    tags: ['calculus', 'derivatives', 'integrals']
  },
  {
    id: '2',
    title: 'Python Programming Tutorial',
    description: 'Learn object-oriented programming concepts',
    subject: 'Computer Science',
    difficulty: 'easy',
    estimatedTime: '30 minutes',
    type: 'reading',
    tags: ['python', 'oop', 'programming']
  },
  {
    id: '3',
    title: 'Data Structures Project',
    description: 'Implement a binary search tree in your preferred language',
    subject: 'Computer Science',
    difficulty: 'hard',
    estimatedTime: '2 hours',
    type: 'project',
    tags: ['data-structures', 'algorithms', 'coding'],
    dueDate: '2024-02-20'
  }
];

const mockClassSessions: ClassSession[] = [
  {
    id: 'class1',
    name: 'Mathematics 101',
    subject: 'Mathematics',
    teacherId: 'teacher1',
    date: '2024-02-15',
    startTime: '09:00',
    endTime: '10:00',
    room: 'Room 101',
    qrCode: 'MATH101_20240215_0900',
    attendanceOpen: true
  },
  {
    id: 'class2',
    name: 'Physics 201',
    subject: 'Physics',
    teacherId: 'teacher2',
    date: '2024-02-15',
    startTime: '14:00',
    endTime: '15:00',
    room: 'Room 203',
    qrCode: 'PHYS201_20240215_1400',
    attendanceOpen: false
  }
];

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentView, setCurrentView] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [tests, setTests] = useState<Test[]>(mockTests);
  const [exams, setExams] = useState<Exam[]>(mockExams);
  const [users, setUsers] = useState<User[]>(mockUsers);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(mockAttendance);
  const [studentPreferences, setStudentPreferences] = useState<StudentPreferences[]>(mockStudentPreferences);
  const [academicTasks, setAcademicTasks] = useState<AcademicTask[]>(mockAcademicTasks);
  const [classSessions, setClassSessions] = useState<ClassSession[]>(mockClassSessions);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const authenticateUser = (email: string, password: string): User | null => {
    const foundUser = users.find(u => u.email === email && u.password === password);
    return foundUser || null;
  };

  const markAttendance = (studentId: string, classId: string, method: string) => {
    const classSession = classSessions.find(c => c.id === classId);
    if (!classSession || !classSession.attendanceOpen) return;

    const newRecord: AttendanceRecord = {
      id: Date.now().toString(),
      studentId,
      classId,
      className: classSession.name,
      date: classSession.date,
      time: classSession.startTime,
      status: 'present',
      method: method as any,
      location: classSession.room
    };

    setAttendance(prev => [...prev, newRecord]);
  };

  const getPersonalizedTasks = (studentId: string): AcademicTask[] => {
    const prefs = studentPreferences.find(p => p.studentId === studentId);
    if (!prefs) return academicTasks.slice(0, 3);

    return academicTasks
      .filter(task => 
        prefs.interests.includes(task.subject) || 
        prefs.preferredTaskTypes.includes(task.type) ||
        task.tags.some(tag => prefs.interests.some(interest => 
          interest.toLowerCase().includes(tag.toLowerCase())
        ))
      )
      .slice(0, 5);
  };

  const getDailyRoutine = (studentId: string, date: string): DailyRoutineItem[] => {
    const classesForDay = classSessions.filter(c => c.date === date);
    const personalizedTasks = getPersonalizedTasks(studentId);
    
    const routine: DailyRoutineItem[] = [];

    // Add classes
    classesForDay.forEach(cls => {
      routine.push({
        id: cls.id,
        type: 'class',
        title: cls.name,
        startTime: cls.startTime,
        endTime: cls.endTime,
        subject: cls.subject,
        description: `${cls.room} with ${users.find(u => u.id === cls.teacherId)?.name}`,
        priority: 'high'
      });
    });

    // Add personalized tasks for free periods
    personalizedTasks.slice(0, 2).forEach((task, index) => {
      routine.push({
        id: `task-${task.id}`,
        type: 'task',
        title: task.title,
        startTime: index === 0 ? '11:00' : '16:00',
        endTime: index === 0 ? '11:45' : '16:30',
        subject: task.subject,
        description: task.description,
        priority: 'medium'
      });
    });

    // Add goal-related activities
    routine.push({
      id: 'goal-1',
      type: 'goal',
      title: 'Career Development Reading',
      startTime: '19:00',
      endTime: '19:30',
      description: 'Read about software engineering best practices',
      priority: 'medium'
    });

    return routine.sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setCurrentView('login');
  };

  const handleLogin = (userData: User) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setSelectedRole(null);
    setCurrentView('landing');
  };

  const contextValue: AppContextType = {
    user,
    setUser,
    theme,
    toggleTheme,
    tests,
    setTests,
    exams,
    setExams,
    users,
    setUsers,
    authenticateUser,
    attendance,
    setAttendance,
    studentPreferences,
    setStudentPreferences,
    academicTasks,
    setAcademicTasks,
    classSessions,
    setClassSessions,
    markAttendance,
    getPersonalizedTasks,
    getDailyRoutine
  };

  const renderDashboard = () => {
    if (!user) return null;
    
    switch (user.role) {
      case 'student':
        return <StudentDashboard onLogout={handleLogout} />;
      case 'teacher':
        return <TeacherDashboard onLogout={handleLogout} />;
      case 'admin':
        return <AdminDashboard onLogout={handleLogout} />;
      default:
        return null;
    }
  };

  return (
    <AppContext.Provider value={contextValue}>
      <div className={`min-h-screen bg-background transition-colors duration-300 ${theme === 'dark' ? 'dark' : ''}`}>
        {/* Theme Toggle */}
        <div className="fixed top-4 right-4 z-50">
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="w-10 h-10 p-0"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </Button>
        </div>

        {currentView === 'landing' && (
          <LandingPage onRoleSelect={handleRoleSelect} />
        )}

        {currentView === 'login' && selectedRole && (
          <LoginForm 
            role={selectedRole} 
            onLogin={handleLogin}
            onBack={() => setCurrentView('landing')}
          />
        )}

        {currentView === 'dashboard' && renderDashboard()}
      </div>
    </AppContext.Provider>
  );
}