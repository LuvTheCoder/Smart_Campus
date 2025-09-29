import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Users, UserCheck, UserX, Clock, QrCode } from 'lucide-react';
import { useApp } from '../App';

interface ClassroomDisplayProps {
  classId: string;
  teacherId: string;
}

export function ClassroomDisplay({ classId, teacherId }: ClassroomDisplayProps) {
  const { classSessions, attendance, users } = useApp();
  const [currentTime, setCurrentTime] = useState(new Date());

  const classSession = classSessions.find(c => c.id === classId);
  const classAttendance = attendance.filter(a => a.classId === classId);
  const enrolledStudents = users.filter(u => u.role === 'student'); // In real app, this would be class-specific
  
  const presentStudents = classAttendance.filter(a => a.status === 'present');
  const absentStudents = enrolledStudents.filter(student => 
    !classAttendance.find(a => a.studentId === student.id)
  );

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!classSession) {
    return <div>Class not found</div>;
  }

  const attendanceRate = enrolledStudents.length > 0 
    ? Math.round((presentStudents.length / enrolledStudents.length) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-semibold">{classSession.name}</h1>
            <p className="text-muted-foreground">
              {classSession.room} • {classSession.startTime} - {classSession.endTime}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-mono">{currentTime.toLocaleTimeString()}</p>
            <p className="text-sm text-muted-foreground">{currentTime.toLocaleDateString()}</p>
          </div>
        </div>

        {/* QR Code Display */}
        <div className="flex items-center justify-center mb-6">
          <Card className="p-6">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <QrCode className="w-16 h-16 text-gray-600" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">Scan to mark attendance</p>
              <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                {classSession.qrCode}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {/* Attendance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Students</p>
                <p className="text-2xl font-semibold">{enrolledStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <UserCheck className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Present</p>
                <p className="text-2xl font-semibold">{presentStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <UserX className="w-6 h-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Absent</p>
                <p className="text-2xl font-semibold">{absentStudents.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Rate */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Attendance Rate</h3>
            <Badge variant={attendanceRate >= 80 ? 'default' : attendanceRate >= 60 ? 'secondary' : 'destructive'}>
              {attendanceRate}%
            </Badge>
          </div>
          <div className="w-full bg-muted rounded-full h-4">
            <div 
              className={`h-4 rounded-full transition-all duration-500 ${
                attendanceRate >= 80 ? 'bg-green-500' : 
                attendanceRate >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${attendanceRate}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Student Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Present Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <UserCheck className="w-5 h-5" />
              Present Students ({presentStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {presentStudents.map((record) => {
                const student = users.find(u => u.id === record.studentId);
                return (
                  <div key={record.id} className="flex items-center justify-between p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div>
                      <p className="font-medium">{student?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Marked at {record.time} via {record.method.toUpperCase()}
                      </p>
                    </div>
                    <Badge variant="default" className="bg-green-600">
                      Present
                    </Badge>
                  </div>
                );
              })}
              {presentStudents.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  No students marked present yet
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Absent Students */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-600">
              <UserX className="w-5 h-5" />
              Absent Students ({absentStudents.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {absentStudents.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-muted-foreground">{student.email}</p>
                  </div>
                  <Badge variant="outline" className="border-orange-600 text-orange-600">
                    Absent
                  </Badge>
                </div>
              ))}
              {absentStudents.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  All students are present! 🎉
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}