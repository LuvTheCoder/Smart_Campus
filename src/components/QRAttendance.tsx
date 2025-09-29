import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { QrCode, Camera, Wifi, Users, CheckCircle, XCircle, Clock } from 'lucide-react';
import { useApp } from '../App';

interface QRAttendanceProps {
  studentId: string;
}

export function QRAttendance({ studentId }: QRAttendanceProps) {
  const { classSessions, markAttendance, attendance } = useApp();
  const [scanning, setScanning] = useState(false);
  const [scanMethod, setScanMethod] = useState<'qr' | 'proximity' | 'face'>('qr');
  const [lastScanResult, setLastScanResult] = useState<string | null>(null);

  const todaysClasses = classSessions.filter(cls => 
    cls.date === new Date().toISOString().split('T')[0]
  );

  const getAttendanceStatus = (classId: string) => {
    return attendance.find(a => a.studentId === studentId && a.classId === classId);
  };

  const handleScan = (classId: string) => {
    setScanning(true);
    
    // Simulate scanning process
    setTimeout(() => {
      markAttendance(studentId, classId, scanMethod);
      setLastScanResult(classId);
      setScanning(false);
    }, 2000);
  };

  const handleProximityDetection = (classId: string) => {
    // Simulate proximity detection
    markAttendance(studentId, classId, 'proximity');
    setLastScanResult(classId);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Smart Attendance
          </CardTitle>
          <CardDescription>
            Mark your attendance using QR codes, proximity detection, or face recognition
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <Button
              variant={scanMethod === 'qr' ? 'default' : 'outline'}
              onClick={() => setScanMethod('qr')}
              className="flex items-center gap-2"
            >
              <QrCode className="w-4 h-4" />
              QR Code
            </Button>
            <Button
              variant={scanMethod === 'proximity' ? 'default' : 'outline'}
              onClick={() => setScanMethod('proximity')}
              className="flex items-center gap-2"
            >
              <Wifi className="w-4 h-4" />
              Proximity
            </Button>
            <Button
              variant={scanMethod === 'face' ? 'default' : 'outline'}
              onClick={() => setScanMethod('face')}
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              Face Recognition
            </Button>
          </div>

          {scanMethod === 'qr' && (
            <div className="mb-6 p-6 border-2 border-dashed border-muted-foreground rounded-lg text-center">
              <QrCode className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                {scanning ? 'Scanning QR code...' : 'Point camera at QR code to mark attendance'}
              </p>
            </div>
          )}

          {scanMethod === 'proximity' && (
            <div className="mb-6 p-6 border-2 border-dashed border-blue-200 dark:border-blue-800 rounded-lg text-center bg-blue-50 dark:bg-blue-900/20">
              <Wifi className="w-12 h-12 mx-auto mb-4 text-blue-600" />
              <p className="text-sm text-blue-700 dark:text-blue-300">
                Proximity detection active - you'll be automatically marked present when near the classroom
              </p>
            </div>
          )}

          {scanMethod === 'face' && (
            <div className="mb-6 p-6 border-2 border-dashed border-purple-200 dark:border-purple-800 rounded-lg text-center bg-purple-50 dark:bg-purple-900/20">
              <Camera className="w-12 h-12 mx-auto mb-4 text-purple-600" />
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Face recognition ready - look at the camera to mark attendance
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Today's Classes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {todaysClasses.map((cls) => {
              const attendanceRecord = getAttendanceStatus(cls.id);
              const canMarkAttendance = cls.attendanceOpen && !attendanceRecord;
              
              return (
                <div key={cls.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">{cls.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {cls.startTime} - {cls.endTime} • {cls.room}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {attendanceRecord ? (
                      <Badge variant="default" className="flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Present
                      </Badge>
                    ) : cls.attendanceOpen ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">Open</Badge>
                        {scanMethod === 'proximity' ? (
                          <Button 
                            size="sm" 
                            onClick={() => handleProximityDetection(cls.id)}
                            disabled={scanning}
                          >
                            Mark Present
                          </Button>
                        ) : (
                          <Button 
                            size="sm" 
                            onClick={() => handleScan(cls.id)}
                            disabled={scanning}
                          >
                            {scanning ? 'Scanning...' : 'Scan'}
                          </Button>
                        )}
                      </div>
                    ) : (
                      <Badge variant="outline" className="flex items-center gap-1">
                        <XCircle className="w-3 h-3" />
                        Closed
                      </Badge>
                    )}
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