import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { ArrowLeft, GraduationCap, BookOpen, Shield, AlertCircle } from 'lucide-react';
import { useApp } from '../App';

interface LoginFormProps {
  role: 'student' | 'teacher' | 'admin';
  onLogin: (user: any) => void;
  onBack: () => void;
}

const mockUsers = {
  student: {
    id: 'student1',
    name: 'Alex Johnson',
    email: 'alex.johnson@student.edu',
    role: 'student' as const
  },
  teacher: {
    id: 'teacher1',
    name: 'Dr. Sarah Smith',
    email: 'sarah.smith@campus.edu',
    role: 'teacher' as const
  },
  admin: {
    id: 'admin1',
    name: 'Michael Brown',
    email: 'michael.brown@campus.edu',
    role: 'admin' as const
  }
};

const roleConfig = {
  student: {
    icon: GraduationCap,
    color: 'blue',
    title: 'Student Login'
  },
  teacher: {
    icon: BookOpen,
    color: 'purple',
    title: 'Teacher Login'
  },
  admin: {
    icon: Shield,
    color: 'green',
    title: 'Admin Login'
  }
};

export function LoginForm({ role, onLogin, onBack }: LoginFormProps) {
  const { authenticateUser, users } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const config = roleConfig[role];
  const Icon = config.icon;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    // Simulate API call delay
    setTimeout(() => {
      const userData = authenticateUser(email, password);
      
      if (userData && userData.role === role) {
        onLogin(userData);
      } else if (userData && userData.role !== role) {
        setError(`This email is registered as a ${userData.role}, not a ${role}.`);
      } else {
        setError('Invalid email or password. Please try again.');
      }
      
      setIsLoading(false);
    }, 1000);
  };

  const fillDemoCredentials = () => {
    const demoUser = users.find(u => u.role === role);
    if (demoUser) {
      setEmail(demoUser.email);
      setPassword(demoUser.password);
    }
  };

  const getDemoCredentials = () => {
    const demoUser = users.find(u => u.role === role);
    return demoUser ? { email: demoUser.email, password: demoUser.password } : null;
  };

  const demoCredentials = getDemoCredentials();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className={`w-16 h-16 bg-${config.color}-100 dark:bg-${config.color}-900/30 rounded-full flex items-center justify-center mx-auto mb-4`}>
              <Icon className={`w-8 h-8 text-${config.color}-600`} />
            </div>
            <CardTitle>{config.title}</CardTitle>
            <CardDescription>
              Enter your credentials to access your dashboard
            </CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                className={`w-full bg-${config.color}-600 hover:bg-${config.color}-700`}
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={fillDemoCredentials}
              >
                Use Demo Credentials
              </Button>
            </form>

            {demoCredentials && (
              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Demo Credentials:</p>
                <p className="text-sm">Email: {demoCredentials.email}</p>
                <p className="text-sm">Password: {demoCredentials.password}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}