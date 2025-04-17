
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export default function LoginPrompt() {
  return (
    <div className="mt-8 text-center bg-white rounded-xl p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-travel-800">Login Required</h2>
      <p className="mt-2 text-gray-600">Please log in to view your credits and transactions.</p>
      <div className="mt-6 flex flex-col sm:flex-row justify-center gap-4">
        <Button variant="outline" size="lg" asChild>
          <Link to="/login">Log In</Link>
        </Button>
        <Button className="bg-travel-500 hover:bg-travel-600" size="lg" asChild>
          <Link to="/register">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}
