import React, { useState } from 'react';
import { useGetRecommendationMutation } from '@/features/api/recommendationApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';

export default function CourseRecommendationForm() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    major: '',
    grade: '',
    mathTopics: [],
    problemSolving: '',
    programmingLanguages: [],
    otherSkills: [],
    workExperience: '',
    englishProficiency: '',
    studyTime: '',
    interests: [],
    completed: [],
    selfStudy: '',
    usesSocial: '',
    comfortVirtual: '',
    aspirations: [],
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
    age: ['Under 18', '18-24', '25-34', '35-44', '45+'],
    gender: ['Male', 'Female', 'Other', 'Prefer not to say'],
    grade: ['Undergraduate', 'First Year', 'Second Year', 'Third Year', 'Final Year', 'Graduate'],
    mathTopics: [
      'Boolean Algebra',
      'Discrete Mathematics',
      'Linear Algebra',
      'Probability',
      'Statistics',
      'Number Theory',
      'Graph Theory',
      'Combinatorics'
    ],
    problemSolving: ['Beginner', 'Intermediate', 'Advanced'],
    programmingLanguages: [
      'Python',
      'JavaScript',
      'Java',
      'C++',
      'C',
      'C#',
      'Swift',
      'Kotlin',
      'Rust',
      'Go',
      'TypeScript',
      'PHP',
      'Ruby',
      'Assembly',
      'MATLAB',
      'R'
    ],
    otherSkills: [
      'Project Management',
      'Team Leadership',
      'Technical Writing',
      'Public Speaking',
      'Data Analysis',
      'Research',
      'Problem Analysis',
      'Critical Thinking',
      'Creative Design',
      'User Research',
      'Quality Assurance',
      'Documentation',
      'Teaching/Training',
      'Customer Support',
      'System Administration',
      'Network Management',
      'Hardware Repair',
      'Electronics',
      'Mathematics',
      'Physics',
      'Business Analysis',
      'Marketing',
      'Content Creation',
      'Graphic Design',
      'Video Editing',
      '3D Modeling',
      'Game Design',
      'Sound Design',
      'Animation',
      'Architecture',
      'Engineering',
      'Scientific Research',
      'Healthcare',
      'Finance',
      'Education'
    ],
    workExperience: [
      'No Experience',
      'Student',
      'Entry Level',
      '1-3 years',
      '3-5 years',
      '5-10 years',
      '10+ years'
    ],
    englishProficiency: ['Excellent', 'Good', 'Average', 'Poor'],
    studyTime: ['1-5 hours/week', '6-10 hours/week', '11-15 hours/week', '15+ hours/week'],
    interests: [
      'Web Development',
      'Mobile Development',
      'Game Development',
      'DevOps',
      'Cybersecurity',
      'Cloud Computing',
      'Big Data',
      'Software Engineering',
      'IoT',
      'Data Science',
      'Artificial Intelligence',
      'Machine Learning',
      'Deep Learning',
      'Natural Language Processing',
      'Computer Vision',
      'UI/UX Design',
      'Blockchain',
      'Robotics',
      'Embedded Systems',
      'System Programming',
      'Real-time Systems',
      'Hardware Programming'
    ],
    completed: [
      'Intro to Programming',
      'Data Structures & Algorithms',
      'Database Systems',
      'Web Development Basics',
      'Mobile Development Basics',
      'Game Development Basics',
      'DevOps Basics',
      'Cybersecurity Basics',
      'Cloud Computing Basics',
      'Big Data Basics',
      'Software Engineering Basics',
      'IoT Basics',
      'Machine Learning Basics',
      'Deep Learning Basics',
      'Computer Vision Basics',
      'NLP Basics',
      'UI/UX Design Basics',
      'Blockchain Basics',
      'Robotics Basics',
      'Embedded Systems Basics',
      'Operating Systems',
      'Computer Architecture',
      'Digital Electronics',
      'Microcontrollers',
      'Real-time Systems',
      'Network Security',
      'System Administration',
      'Cloud Architecture',
      'Data Engineering',
      'Software Architecture'
    ],
    selfStudy: ['Yes', 'No'],
    usesSocial: ['Yes', 'No'],
    comfortVirtual: ['Yes', 'No'],
    aspirations: [
      'Build innovative AI solutions',
      'Create impactful web applications',
      'Develop cutting-edge mobile apps',
      'Design intuitive user experiences',
      'Solve complex data problems',
      'Work on autonomous systems',
      'Contribute to open source',
      'Start a tech startup',
      'Work in research',
      'Teach others',
      'Work remotely',
      'Work in a tech company',
      'Work in healthcare tech',
      'Work in fintech',
      'Work in gaming industry'
    ]
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <Card className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100">
            🎯 Not sure which track to choose? Get a personalized course recommendation!
          </CardTitle>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            This form is for students who are unsure about the best track to take. Answer a few questions about your background and interests, and we'll recommend a suitable course for your knowledge level.
          </p>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-500">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Note:</strong> For certain tracks (like UI/UX Design, Technical Writing, and Customer-facing roles), 
              you'll need at least an average level of English proficiency to perform well. The recommendation system will 
              take this into account when suggesting tracks.
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Basic Information</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Name</Label>
                  <Input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Gender</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.gender.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="gender"
                          value={opt}
                          checked={formData.gender === opt}
                          onChange={() => handleChange('gender', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Age Group</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.age.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="age"
                          value={opt}
                          checked={formData.age === opt}
                          onChange={() => handleChange('age', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Current Field of Study or Work</Label>
                  <Input
                    type="text"
                    value={formData.major}
                    onChange={(e) => handleChange('major', e.target.value)}
                    placeholder="e.g., Computer Science, Business, etc."
                    required
                    className="w-full bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700"
                  />
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Grade</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.grade.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="grade"
                          value={opt}
                          checked={formData.grade === opt}
                          onChange={() => handleChange('grade', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Skills & Experience */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Skills & Experience</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Work Experience</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.workExperience.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="workExperience"
                          value={opt}
                          checked={formData.workExperience === opt}
                          onChange={() => handleChange('workExperience', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Problem Solving Skills</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    How would you rate your general problem-solving abilities? This includes solving puzzles, fixing things, or finding solutions to everyday challenges.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.problemSolving.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="problemSolving"
                          value={opt}
                          checked={formData.problemSolving === opt}
                          onChange={() => handleChange('problemSolving', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">English Proficiency</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Your English proficiency level is important for certain tracks. Please be honest in your assessment.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.englishProficiency.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="englishProficiency"
                          value={opt}
                          checked={formData.englishProficiency === opt}
                          onChange={() => handleChange('englishProficiency', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Mathematics Topics</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {selectOptions.mathTopics.map((topic) => (
                      <div key={topic} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={topic}
                          checked={formData.mathTopics.includes(topic)}
                          onChange={() => handleMultiSelect('mathTopics', topic)}
                          className="rounded border-gray-300 dark:border-gray-700"
                        />
                        <label htmlFor={topic} className="text-sm text-gray-900 dark:text-gray-100">
                          {topic}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Programming Languages Experience</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Select any programming languages you have experience with. Don't worry if you don't have any - this is just one aspect of many skills we consider.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectOptions.programmingLanguages.map((lang) => (
                      <div key={lang} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={lang}
                          checked={formData.programmingLanguages.includes(lang)}
                          onChange={() => handleMultiSelect('programmingLanguages', lang)}
                          className="rounded border-gray-300 dark:border-gray-700"
                        />
                        <label htmlFor={lang} className="text-sm text-gray-900 dark:text-gray-100">
                          {lang}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Other Relevant Skills</Label>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Select any other skills you have that might be relevant. These could be from work, hobbies, or other areas of study.
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectOptions.otherSkills.map((skill) => (
                      <div key={skill} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={skill}
                          checked={formData.otherSkills.includes(skill)}
                          onChange={() => handleMultiSelect('otherSkills', skill)}
                          className="rounded border-gray-300 dark:border-gray-700"
                        />
                        <label htmlFor={skill} className="text-sm text-gray-900 dark:text-gray-100">
                          {skill}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Learning Preferences */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Learning Preferences</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Weekly Study Time</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.studyTime.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="studyTime"
                          value={opt}
                          checked={formData.studyTime === opt}
                          onChange={() => handleChange('studyTime', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Self-Study</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.selfStudy.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="selfStudy"
                          value={opt}
                          checked={formData.selfStudy === opt}
                          onChange={() => handleChange('selfStudy', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Uses Social Learning</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.usesSocial.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="usesSocial"
                          value={opt}
                          checked={formData.usesSocial === opt}
                          onChange={() => handleChange('usesSocial', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Comfortable with Virtual Learning</Label>
                  <div className="flex flex-wrap gap-4">
                    {selectOptions.comfortVirtual.map(opt => (
                      <label key={opt} className="flex items-center space-x-2">
                        <input
                          type="radio"
                          name="comfortVirtual"
                          value={opt}
                          checked={formData.comfortVirtual === opt}
                          onChange={() => handleChange('comfortVirtual', opt)}
                        />
                        <span>{opt}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Interests & Completed */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Interests & Completed Courses</h3>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Interests</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectOptions.interests.map((interest) => (
                      <div key={interest} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={interest}
                          checked={formData.interests.includes(interest)}
                          onChange={() => handleMultiSelect('interests', interest)}
                          className="rounded border-gray-300 dark:border-gray-700"
                        />
                        <label htmlFor={interest} className="text-sm text-gray-900 dark:text-gray-100">
                          {interest}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="block font-medium mb-2 text-gray-900 dark:text-gray-100">Completed Courses/Skills</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {selectOptions.completed.map((item) => (
                      <div key={item} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={item}
                          checked={formData.completed.includes(item)}
                          onChange={() => handleMultiSelect('completed', item)}
                          className="rounded border-gray-300 dark:border-gray-700"
                        />
                        <label htmlFor={item} className="text-sm text-gray-900 dark:text-gray-100">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            {/* Aspirations */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Aspirations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectOptions.aspirations.map((item) => (
                  <div key={item} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={item}
                      checked={formData.aspirations.includes(item)}
                      onChange={() => handleMultiSelect('aspirations', item)}
                      className="rounded border-gray-300 dark:border-gray-700"
                    />
                    <label htmlFor={item} className="text-sm text-gray-900 dark:text-gray-100">
                      {item}
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
                    {(recommendation?.learningPath || []).map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">Track Points:</h4>
                  <ul className="text-green-700 dark:text-green-300">
                    {Object.entries(recommendation.points).map(([track, points]) => (
                      <li key={track}>{track}: {points} points</li>
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
