import React, { useState } from 'react';
import { useGetRecommendationMutation } from '@/features/api/recommendationApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

export default function CourseRecommendationForm() {
  const [formData, setFormData] = useState({
    age: '',
    major: '',
    gradeLevel: '',
    mathExperience: '',
    problemSolving: '',
    englishLevel: '',
    programmingExperience: '',
    creativeInterest: '',
    studyTime: '',
    learningStyle: '',
    workPreference: '',
    interests: [],
    careerGoals: '',
    priorExperience: '',
    preferredTechnology: '',
    projectScope: ''
  });

  const [getRecommendation, { isLoading }] = useGetRecommendationMutation();
  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleMultiSelect = (name, value) => {
    setFormData(prev => {
      const currentValues = prev[name] || [];
      if (currentValues.includes(value)) {
        return { ...prev, [name]: currentValues.filter(v => v !== value) };
      }
      return { ...prev, [name]: [...currentValues, value] };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await getRecommendation(formData).unwrap();
      setRecommendation(result);
      toast.success('Recommendation generated successfully!');
    } catch (err) {
      console.error('Recommendation fetch failed:', err);
      toast.error('Failed to get recommendation. Please try again.');
    }
  };

  const selectOptions = {
    age: ['Under 20', '20–25', 'Over 25'],
    gradeLevel: ['First Year', 'Second Year', 'Third Year', 'Final Year', 'Graduate'],
    mathExperience: ['Yes', 'No'],
    problemSolving: ['Yes', 'No'],
    englishLevel: ['Excellent', 'Good', 'Average', 'Poor'],
    programmingExperience: ['Yes', 'No'],
    creativeInterest: ['Yes', 'No'],
    studyTime: ['Low', 'Medium', 'High'],
    learningStyle: ['Videos', 'Text', 'Hands-on'],
    workPreference: ['Independently', 'Teams'],
    interests: ['Data Analysis', 'Visual Design', 'System Architecture', 'Security', 'Mobile Apps', 'Web Development'],
    careerGoals: ['Research and Analytics', 'Software Architecture', 'Product Design', 'System Administration', 'Mobile Development'],
    priorExperience: ['None', 'Design Tools', 'Programming', 'Data Analysis', 'System Administration'],
    preferredTechnology: ['Web Technologies', 'Mobile Development', 'Cloud Services', 'Data Tools', 'Design Software'],
    projectScope: ['End-to-End Solutions', 'User Interface', 'Backend Systems', 'Data Analysis', 'Infrastructure']
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            🎯 Find Your Best Learning Track
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['age', 'gradeLevel'].map((name) => (
          <div key={name}>
                    <Label className="block font-medium capitalize mb-2 text-gray-900 dark:text-gray-100">
              {name.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Select
              value={formData[name]}
                      onValueChange={(value) => handleChange(name, value)}
                    >
                      <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {selectOptions[name].map(opt => (
                            <SelectItem 
                              key={opt} 
                              value={opt}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {opt}
                            </SelectItem>
              ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
          </div>
        ))}
        <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">
            Your major or field of study
                  </Label>
                  <Input
            type="text"
            value={formData.major}
                    onChange={(e) => handleChange('major', e.target.value)}
            required
                    className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Skills and Experience */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Skills and Experience</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['mathExperience', 'problemSolving', 'englishLevel', 'programmingExperience', 'creativeInterest'].map((name) => (
                  <div key={name}>
                    <Label className="block font-medium capitalize mb-2 text-gray-900 dark:text-gray-100">
                      {name.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Select
                      value={formData[name]}
                      onValueChange={(value) => handleChange(name, value)}
                    >
                      <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {selectOptions[name].map(opt => (
                            <SelectItem 
                              key={opt} 
                              value={opt}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Learning Preferences */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Learning Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['studyTime', 'learningStyle', 'workPreference'].map((name) => (
                  <div key={name}>
                    <Label className="block font-medium capitalize mb-2 text-gray-900 dark:text-gray-100">
                      {name.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Select
                      value={formData[name]}
                      onValueChange={(value) => handleChange(name, value)}
                    >
                      <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {selectOptions[name].map(opt => (
                            <SelectItem 
                              key={opt} 
                              value={opt}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Career and Technology Preferences */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Career and Technology Preferences</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {['careerGoals', 'priorExperience', 'preferredTechnology', 'projectScope'].map((name) => (
                  <div key={name}>
                    <Label className="block font-medium capitalize mb-2 text-gray-900 dark:text-gray-100">
                      {name.replace(/([A-Z])/g, ' $1')}
                    </Label>
                    <Select
                      value={formData[name]}
                      onValueChange={(value) => handleChange(name, value)}
                    >
                      <SelectTrigger className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {selectOptions[name].map(opt => (
                            <SelectItem 
                              key={opt} 
                              value={opt}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {opt}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Interests (Multi-select) */}
            <div>
              <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">Areas of Interest</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {selectOptions.interests.map((interest) => (
                  <div key={interest} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={interest}
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleMultiSelect('interests', interest)}
                      className="rounded border-gray-300 dark:border-gray-700 text-[hsl(231,53%,55%)] dark:text-[hsl(231,33%,45%)]"
                    />
                    <label htmlFor={interest} className="text-sm text-gray-900 dark:text-gray-100">
                      {interest}
                    </label>
                  </div>
                ))}
              </div>
        </div>

            <div className="text-center mt-8">
              <Button
            type="submit"
                disabled={isLoading}
                className="bg-[hsl(231,53%,55%)] dark:bg-[hsl(231,33%,45%)] text-white hover:bg-[hsl(231,53%,45%)] dark:hover:bg-[hsl(231,33%,55%)] transition-colors"
          >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Getting Recommendation...
                  </>
                ) : (
                  'Get My Recommendation'
                )}
              </Button>
        </div>
      </form>

      {recommendation && (
            <div className="mt-8 space-y-4">
              <div className="p-6 bg-green-100 dark:bg-green-900/20 rounded-lg border-l-4 border-green-500">
                <h3 className="text-xl font-bold text-green-800 dark:text-green-200 mb-2">
                  🎯 Recommended Track: {recommendation.track}
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  {recommendation.description}
                </p>
                <div>
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Learning Path:</h4>
                  <ul className="list-disc list-inside text-green-700 dark:text-green-300">
                    {recommendation.learningPath.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              </div>
        </div>
      )}
        </CardContent>
      </Card>
    </div>
  );
}
