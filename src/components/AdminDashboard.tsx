import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Users, 
  UserPlus, 
  GraduationCap, 
  BookOpen, 
  Calendar, 
  Settings,
  LogOut,
  Shield,
  Trash2,
  Edit,
  Clock
} from 'lucide-react';
import { useApp } from '../App';

interface AdminDashboardProps {
  onLogout: () => void;
}

// Convert users to display format with status
const getUsersWithStatus = (users: any[]) => {
  return users.map(user => ({
    ...user,
    status: 'active' // Default status for all users
  }));
};

const mockClasses = [
  { id: 1, name: 'Mathematics 101', teacher: 'Dr. Sarah Smith', students: 25, schedule: 'Mon, Wed, Fri 9:00 AM' },
  { id: 2, name: 'Advanced Calculus', teacher: 'Dr. Sarah Smith', students: 18, schedule: 'Tue, Thu 10:00 AM' },
  { id: 3, name: 'Physics 201', teacher: 'Prof. John Wilson', students: 22, schedule: 'Mon, Wed 2:00 PM' },
  { id: 4, name: 'Chemistry Lab', teacher: 'Prof. John Wilson', students: 20, schedule: 'Fri 1:00 PM' }
];

const mockSchedules = [
  { id: 1, day: 'Monday', time: '9:00 AM - 10:00 AM', class: 'Mathematics 101', room: 'Room 101' },
  { id: 2, day: 'Monday', time: '2:00 PM - 3:00 PM', class: 'Physics 201', room: 'Room 203' },
  { id: 3, day: 'Tuesday', time: '10:00 AM - 11:00 AM', class: 'Advanced Calculus', room: 'Room 102' },
  { id: 4, day: 'Wednesday', time: '9:00 AM - 10:00 AM', class: 'Mathematics 101', room: 'Room 101' },
  { id: 5, day: 'Friday', time: '1:00 PM - 3:00 PM', class: 'Chemistry Lab', room: 'Lab 301' }
];

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { user, users, setUsers } = useApp();
  const displayUsers = getUsersWithStatus(users);
  const [classes, setClasses] = useState(mockClasses);
  const [schedules, setSchedules] = useState(mockSchedules);
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [isAddClassOpen, setIsAddClassOpen] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const [newClass, setNewClass] = useState({
    name: '',
    teacher: '',
    schedule: ''
  });

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      alert('Please fill in all fields');
      return;
    }

    // Check if email already exists
    if (users.find(u => u.email === newUser.email)) {
      alert('A user with this email already exists');
      return;
    }

    const newUserData = {
      id: Date.now().toString(),
      ...newUser
    };
    setUsers([...users, newUserData]);
    setNewUser({ name: '', email: '', password: '', role: 'student' });
    setIsAddUserOpen(false);
  };

  const handleDeleteUser = (id: string) => {
    if (confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
    }
  };

  const handleAddClass = () => {
    const classData = {
      id: Date.now(),
      ...newClass,
      students: 0
    };
    setClasses([...classes, classData]);
    setNewClass({ name: '', teacher: '', schedule: '' });
    setIsAddClassOpen(false);
  };

  const handleDeleteClass = (id: number) => {
    setClasses(classes.filter(cls => cls.id !== id));
  };

  const getStats = () => {
    const totalStudents = users.filter(u => u.role === 'student').length;
    const totalTeachers = users.filter(u => u.role === 'teacher').length;
    const activeUsers = users.length; // All users are active by default
    const totalClasses = classes.length;

    return { totalStudents, totalTeachers, activeUsers, totalClasses };
  };

  const stats = getStats();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-semibold">Welcome, {user?.name}</h1>
              <p className="text-sm text-muted-foreground">Admin Dashboard</p>
            </div>
          </div>
          <Button variant="outline" onClick={onLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Students</p>
                  <p className="text-2xl font-semibold">{stats.totalStudents}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Teachers</p>
                  <p className="text-2xl font-semibold">{stats.totalTeachers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                  <Users className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-semibold">{stats.activeUsers}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Classes</p>
                  <p className="text-2xl font-semibold">{stats.totalClasses}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="classes">Classes</TabsTrigger>
            <TabsTrigger value="schedules">Schedules</TabsTrigger>
          </TabsList>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>User Management</CardTitle>
                    <CardDescription>Add, edit, or remove students and teachers</CardDescription>
                  </div>
                  <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Add User
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>
                          Create a new student or teacher account with login credentials
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input
                            id="name"
                            value={newUser.name}
                            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                            placeholder="Enter full name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            id="email"
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            id="password"
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                            placeholder="Enter password"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="role">Role</Label>
                          <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value })}>
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="student">Student</SelectItem>
                              <SelectItem value="teacher">Teacher</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddUser} className="w-full">
                          Add User
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {displayUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          user.role === 'student' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'
                        }`}>
                          {user.role === 'student' ? (
                            <GraduationCap className={`w-4 h-4 ${user.role === 'student' ? 'text-blue-600' : 'text-purple-600'}`} />
                          ) : (
                            <BookOpen className={`w-4 h-4 ${user.role === 'student' ? 'text-blue-600' : 'text-purple-600'}`} />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={user.role === 'student' ? 'default' : 'secondary'}>
                          {user.role}
                        </Badge>
                        <Badge variant="default">
                          active
                        </Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Classes Tab */}
          <TabsContent value="classes">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Class Management</CardTitle>
                    <CardDescription>Manage classes and their details</CardDescription>
                  </div>
                  <Dialog open={isAddClassOpen} onOpenChange={setIsAddClassOpen}>
                    <DialogTrigger asChild>
                      <Button>
                        <BookOpen className="w-4 h-4 mr-2" />
                        Add Class
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Class</DialogTitle>
                        <DialogDescription>
                          Create a new class
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="className">Class Name</Label>
                          <Input
                            id="className"
                            value={newClass.name}
                            onChange={(e) => setNewClass({ ...newClass, name: e.target.value })}
                            placeholder="Enter class name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="teacher">Teacher</Label>
                          <Select value={newClass.teacher} onValueChange={(value) => setNewClass({ ...newClass, teacher: value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select teacher" />
                            </SelectTrigger>
                            <SelectContent>
                              {users.filter(u => u.role === 'teacher').map((teacher) => (
                                <SelectItem key={teacher.id} value={teacher.name}>
                                  {teacher.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="schedule">Schedule</Label>
                          <Input
                            id="schedule"
                            value={newClass.schedule}
                            onChange={(e) => setNewClass({ ...newClass, schedule: e.target.value })}
                            placeholder="e.g., Mon, Wed, Fri 9:00 AM"
                          />
                        </div>
                        <Button onClick={handleAddClass} className="w-full">
                          Add Class
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="font-medium">{cls.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {cls.teacher} • {cls.schedule}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{cls.students} students</Badge>
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleDeleteClass(cls.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Schedules Tab */}
          <TabsContent value="schedules">
            <Card>
              <CardHeader>
                <CardTitle>Schedule Management</CardTitle>
                <CardDescription>View and manage class schedules</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schedules.map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                          <Clock className="w-4 h-4 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium">{schedule.class}</p>
                          <p className="text-sm text-muted-foreground">
                            {schedule.day} • {schedule.time} • {schedule.room}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}