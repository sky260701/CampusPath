'use client'

import { useState } from 'react';

const FreeTrialPage = () => {
  const [formData, setFormData] = useState({
    rank: '',
    gender: '',
    category: '',
  });

  const [colleges, setColleges] = useState<any[]>([]); // Store result data
  const [showColleges, setShowColleges] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch('/api/getColleges', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log("API Response:", data);
      if (Array.isArray(data.colleges)) {
        setColleges(data.colleges);
      } else {
        console.error("API did not return a colleges array");
      }      // 👈 set the result here
      setShowColleges(true);   // 👈 display section
    } catch (error) {
      console.error('Error fetching colleges:', error);
    }
  };
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };



  const CollegeCard = ({
    name,
    round,
    location,
    chance,
    branch,
    rank,
    percentile,
    seatType
  }: {
    name: string;
    round: string;
    location: string;
    chance: 'High' | 'Low';
    branch: string;
    rank: number;
    percentile: string;
    seatType: string;
  }) => {
    const chanceStyles =
      chance === 'High'
        ? 'bg-green text-green-800'
        : 'bg-orange text-orange-800';
  
    return (
      <div className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] p-6 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1rem)] mx-2 mb-6 transition-transform hover:-translate-y-1">
        {/* Tag */}
        <div className="flex justify-between">
        <span className={`text-xs font-semibold px-3 py-1 rounded-full`}>
          Cap Round :  {round} 
          </span>
          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${chanceStyles}`}>
            {chance} Chance
          </span>
        </div>
  
        {/* Info */}
        <div className="mt-3">
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <div className='flex justify-between'>
            <div>
          <p className="text-sm text-gray-600">Location :{location}</p>
          <p className="text-sm text-green-700">Branch :{branch}</p>
          </div>
          <div>
          <p className="text-sm text-green-700">Rank : {rank}</p>
          <p className="text-sm text-green-700"> Percentile : {percentile}</p>
          </div>
          </div>
        </div>
  
        {/* Button */}
        <button className="mt-5 w-full bg-purple text-white py-2 rounded-md text-sm font-medium hover:bg-purple-dark transition">
          SeatType : {seatType}
        </button>
      </div>
    );
  };
  
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Form Card */}
        <div className="bg-white rounded-2xl lg:shadow-xl px-10 py-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 sm:text-md text-grey-500">🎯 Free Plan College Predictor</h1>
            <p className="mt-2 text-gray-600 text-sm">Enter your MHT-CET details to see top predicted colleges.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="rank" className="block text-sm font-medium text-gray-700">MHT-CET Rank</label>
              <input
                id="rank"
                name="rank"
                type="number"
                required
                onChange={handleChange}
                value={formData.rank}
                placeholder="Enter your rank"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple focus:border-purple sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700">Gender</label>
              <select
                id="gender"
                name="gender"
                required
                onChange={handleChange}
                value={formData.gender}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple focus:border-purple sm:text-sm"
              >
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category Code</label>
              <input
                id="category"
                name="category"
                type="text"
                required
                onChange={handleChange}
                value={formData.category}
                placeholder="E.g., OPEN, SC, ST"
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-purple focus:border-purple sm:text-sm"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 px-4 bg-purple text-white text-sm font-semibold rounded-md hover:bg-purple-dark shadow-sm"
            >
              🔍 Show My Colleges
            </button>
          </form>

          {/* Premium Plans */}
          <div className="mt-8 text-sm text-gray-700 bg-gray-100 rounded-lg p-4">
            <p className="font-medium mb-2">Want More?</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>₹49 Plan:</strong> Unlock branch/location preferences, home university filter, defense quota & more.</li>
              <li><strong>₹99 Plan:</strong> Includes all above + call for support and expert guidance.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* College Cards Section */}
      {showColleges && (
  <div className="mt-12">
    { colleges.length != 0? <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Top Predicted Colleges</h2> :<h2 className="text-2xl font-bold text-center text-red mb-6">Sorry, No Colleges Found.Try Changing Inputs</h2>  }
    <div className="flex flex-wrap justify-center">
      { colleges!= null && colleges.map((college, index) => (
        <CollegeCard
          key={index}
          round = {college.round}
          name={college.name}
          location={college.location || 'Maharashtra'}
          branch={college.branch}
          chance={college.rank - Number(formData.rank)  >1000?"High":"Low"}
          rank={college.rank}
          percentile = {college.percentile}
          seatType= {college.seatType}
        />
      ))}
    </div>
  </div>
)}


    </div>
  );
};

export default FreeTrialPage;
