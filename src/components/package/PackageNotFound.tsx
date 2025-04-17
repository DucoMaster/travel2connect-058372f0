
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';

const PackageNotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-travel-50 to-travel-100">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-travel-800">Package Not Found</h2>
          <p className="mt-2 text-travel-600">The package you're looking for doesn't exist or has been removed.</p>
          <Button className="mt-6 bg-travel-500 hover:bg-travel-600" asChild>
            <Link to="/">Return to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  );
};

export default PackageNotFound;
