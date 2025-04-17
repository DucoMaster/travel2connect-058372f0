import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserRole } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useUser } from '@/context/UserContext';
import { useToast } from '@/hooks/use-toast';

const UserRoleCard = ({ role, title, description, isSelected, onSelect }: { 
  role: UserRole;
  title: string;
  description: string;
  isSelected: boolean;
  onSelect: () => void;
}) => (
  <div 
    className={`p-4 border rounded-lg cursor-pointer transition-all ${
      isSelected ? 'border-travel-500 bg-travel-50' : 'border-gray-200 hover:border-travel-200'
    }`}
    onClick={onSelect}
  >
    {/* Remove RadioGroupItem completely as we're no longer using RadioGroup */}
    <div className="font-medium mb-1">{title}</div>
    <div className="text-sm text-gray-600">{description}</div>
  </div>
);

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userRole, setUserRole] = useState<UserRole>('traveler');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, toast } = useUser();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please make sure your passwords match.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await register(email, password, userRole);
    } catch (error) {
      setIsSubmitting(false);
    }
  };

  // Fix the role selection function to properly handle venue selection
  const handleRoleSelect = (role: UserRole) => {
    // Set the role directly without additional processing that might cause hanging
    setUserRole(role);
    console.log('Selected role:', role);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-travel-100 to-travel-200 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-travel-700">TravelConnect</h1>
          <p className="text-travel-600">Join our community of travelers and guides</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Create your account</CardTitle>
            <CardDescription>Sign up to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">Confirm Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>I am a:</Label>
                  <div className="grid grid-cols-1 gap-3 mt-2">
                    <UserRoleCard 
                      role="traveler"
                      title="Traveler"
                      description="I want to discover and book travel experiences"
                      isSelected={userRole === 'traveler'}
                      onSelect={() => handleRoleSelect('traveler')}
                    />
                    
                    <UserRoleCard 
                      role="guide"
                      title="Travel Guide"
                      description="I want to offer my services as a local guide"
                      isSelected={userRole === 'guide'}
                      onSelect={() => handleRoleSelect('guide')}
                    />
                    
                    <UserRoleCard 
                      role="agent"
                      title="Travel Agent"
                      description="I want to create and publish tour packages"
                      isSelected={userRole === 'agent'}
                      onSelect={() => handleRoleSelect('agent')}
                    />
                    
                    <UserRoleCard 
                      role="venue"
                      title="Venue"
                      description="I represent a club, restaurant or venue"
                      isSelected={userRole === 'venue'}
                      onSelect={() => handleRoleSelect('venue')}
                    />
                  </div>
                </div>
                
                <Button 
                  type="submit" 
                  className="bg-travel-500 hover:bg-travel-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="text-center text-sm">
              Already have an account?{' '}
              <Link to="/login" className="text-travel-600 hover:text-travel-800 font-medium">
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
