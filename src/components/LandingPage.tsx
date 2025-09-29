import React from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { GraduationCap, BookOpen, Shield, Users, Calendar, BarChart3 } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'student' | 'teacher' | 'admin') => void;
}

export function LandingPage({ onRoleSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SmartCampus
            </h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Streamline campus operations with intelligent attendance tracking, 
            personalized learning, and comprehensive administration tools.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <Users className="w-8 h-8 text-blue-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Smart Attendance</h3>
              <p className="text-sm text-muted-foreground">
                Quick tap-to-mark attendance with real-time tracking and analytics
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <Calendar className="w-8 h-8 text-purple-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Personalized Learning</h3>
              <p className="text-sm text-muted-foreground">
                AI-powered task suggestions and daily routine optimization
              </p>
            </CardContent>
          </Card>
          
          <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
            <CardContent className="pt-6">
              <BarChart3 className="w-8 h-8 text-green-600 mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Advanced Analytics</h3>
              <p className="text-sm text-muted-foreground">
                Comprehensive insights and reporting for informed decisions
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Role Selection */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center mb-8">Choose Your Role</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {/* Student Card */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                  <GraduationCap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-600">Student</CardTitle>
                <CardDescription>
                  Track your attendance, view assignments, and manage your academic routine
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  onClick={() => onRoleSelect('student')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                >
                  Login as Student
                </Button>
              </CardContent>
            </Card>

            {/* Teacher Card */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/50 transition-colors">
                  <BookOpen className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-600">Teacher</CardTitle>
                <CardDescription>
                  Mark attendance, manage classes, and create personalized learning plans
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  onClick={() => onRoleSelect('teacher')}
                  className="w-full bg-purple-600 hover:bg-purple-700"
                >
                  Login as Teacher
                </Button>
              </CardContent>
            </Card>

            {/* Admin Card */}
            <Card className="cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group border-0 shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 dark:group-hover:bg-green-800/50 transition-colors">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-600">Admin</CardTitle>
                <CardDescription>
                  Manage users, classes, schedules, and oversee campus operations
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <Button 
                  onClick={() => onRoleSelect('admin')}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  Login as Admin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}