import React from 'react';
import { Link, useNavigate, useRouteError } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, RefreshCcw } from 'lucide-react';

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <motion.div 
        className="text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div 
          className="relative"
          variants={itemVariants}
        >
          <h1 className="text-9xl font-bold text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,45%)] opacity-10">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)]">Oops!</h2>
          </div>
        </motion.div>

        <motion.p 
          className="mt-6 text-xl text-gray-600 dark:text-gray-300"
          variants={itemVariants}
        >
          {error?.message || "Sorry, the page you are looking for doesn't exist."}
        </motion.p>

        <motion.p 
          className="mt-2 text-gray-500 dark:text-gray-400 max-w-md mx-auto"
          variants={itemVariants}
        >
          Don't worry, you can find plenty of other things on our homepage.
        </motion.p>

        <motion.div 
          className="mt-8 space-x-4"
          variants={itemVariants}
        >
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Go Back
          </Button>

          <Button
            onClick={() => window.location.reload()}
            variant="outline"
            className="bg-white hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,55%)]"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Retry
          </Button>

          <Button
            asChild
            className="bg-[hsl(231,53%,55%)] hover:bg-[hsl(231,53%,45%)] dark:bg-[hsl(231,33%,45%)] dark:hover:bg-[hsl(231,33%,55%)] text-white"
          >
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Homepage
      </Link>
          </Button>
        </motion.div>

        <motion.div 
          className="mt-8 text-sm text-gray-500 dark:text-gray-400"
          variants={itemVariants}
        >
          <p>If you believe this is an error, please contact support.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
