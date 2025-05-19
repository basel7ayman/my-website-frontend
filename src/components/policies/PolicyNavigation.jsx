import React from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';

const PolicyNavigation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex gap-4 mb-6">
      <Button
        variant="outline"
        onClick={() => navigate(-1)}
        className="flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Go Back
      </Button>
      <Button
        variant="outline"
        onClick={() => navigate('/')}
        className="flex items-center gap-2"
      >
        <Home className="h-4 w-4" />
        Home
      </Button>
    </div>
  );
};

export default PolicyNavigation; 