import { Lightbulb, Search, School, Star } from 'lucide-react';

const steps = [
  {
    id: 1,
    icon: <Search className="w-10 h-10 text-purple" />,
    title: 'Enter Your Rank',
    description: 'Input your MHT-CET score or rank to begin.',
  },
  {
    id: 2,
    icon: <Lightbulb className="w-10 h-10 text-purple" />,
    title: 'Set Preferences',
    description: 'Choose college type, branch, location, and more.',
  },
  {
    id: 3,
    icon: <School className="w-10 h-10 text-purple" />,
    title: 'See Eligible Colleges',
    description: 'Based on last year’s cutoffs, view your options.',
  },
  {
    id: 4,
    icon: <Star className="w-10 h-10 text-purple" />,
    title: 'Shortlist & Apply',
    description: 'Compare and select the colleges you like.',
  },
];

const HowItWorks = () => {
  return (
    <div id="how-it-works-section" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-5xl font-bold text-center text-gray-900 mb-12">
        How CampusPath Works
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div key={step.id} className="text-center p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition">
            <div className="mb-4 flex justify-center">{step.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800">{step.title}</h3>
            <p className="mt-2 text-sm text-gray-600">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
