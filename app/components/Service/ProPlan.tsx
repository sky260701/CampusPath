'use client';

import { useState } from 'react';

const ProPlanPage = () => {
  const [formData, setFormData] = useState({
    rank: '',
    percentile: '',
    gender: '',
    category: '',
    capRound: 'ALL',
    branch: 'ALL',
    college: 'ALL',
    defence: 'no',
    orphan: 'no',
    pwd: 'no',
    homeUniversity: 'no',
    quota: 'State',
  });

  const [useRank, setUseRank] = useState(true);
  const [branchSuggestions, setBranchSuggestions] = useState<{ code: string, name: string }[]>([]);
  const [collegeSuggestions, setCollegeSuggestions] = useState<{ code: string, name: string }[]>([]);
  const [colleges, setColleges] = useState<any[]>([]);
  const [showColleges, setShowColleges] = useState(false);

  const fetchSuggestions = async (query: string, type: 'branch' | 'college') => {
    if (!query) {
      if (type === 'branch') setBranchSuggestions([]);
      else setCollegeSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/getSuggestions?query=${encodeURIComponent(query)}&type=${type}`);
      const data = await res.json();
      if (type === 'branch') setBranchSuggestions(data.suggestions || []);
      else setCollegeSuggestions(data.suggestions || []);
    } catch (error) {
      console.error(`Error fetching ${type} suggestions:`, error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'branch') fetchSuggestions(value, 'branch');
    if (name === 'college') fetchSuggestions(value, 'college');
  };

  const handleSuggestionClick = (type: 'branch' | 'college', name: string) => {
    setFormData((prev) => ({ ...prev, [type]: name }));
    if (type === 'branch') setBranchSuggestions([]);
    else setCollegeSuggestions([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting form:', formData);

    const res = await fetch('/api/ProPlan', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });

    const data = await res.json();
    console.log('API response:', data);
    console.log(Number(formData.rank));
    // Handle display logic here
    if (Array.isArray(data.colleges)) {
      setColleges(data.colleges);
    } else {
      console.error("API did not return a colleges array");
    }      // 👈 set the result here
    setShowColleges(true);   // 👈 display section
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
    <div className='lg:font-medium'  >
    <div className="w-full mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">🚀 Pro Plan - College Predictor</h2>
      <form onSubmit={handleSubmit} className=" space-y-6 bg-lightpink p-8 rounded-2xl shadow-lg">

        {/* Toggle Rank/Percentile */}
        <div className="flex items-center justify-between">
          <label className="block text-sm font-medium text-gray-900 mr-4">Use Rank / Percentile</label>
          <div className="flex items-center space-x-3">
            <span className="text-sm">Rank</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={!useRank}
                onChange={() => setUseRank(!useRank)}
              />
              <div className="bg-grey500 rounded-full-purple w-11 h-6 bg-gray-200 peer-focus:outline-purple peer-focus:ring-2 peer-focus:ring-purple rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-purple after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-purple after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
            </label>
            <span className="text-sm">Percentile</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:grid-cols-3 gap-2">

        {useRank ? (
          <div>
            <label className="block text-sm font-medium text-gray-700">MHT-CET Rank</label>
            <input
              name="rank"
              type="number"
              value={formData.rank}
              onChange={handleChange}
              required={useRank}
              placeholder="Enter your rank"
              className="mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:ring-purple focus:border-purple"
            />
          </div>
        ) : (
          <div>
            <label className="block text-sm font-medium text-gray-700">MHT-CET Percentile</label>
            <input
              name="percentile"
              type="text"
              value={formData.percentile}
              onChange={handleChange}
              required={!useRank}
              placeholder="Enter your percentile"
              className="mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:ring-purple focus:border-purple"
            />
          </div>
        )}

        {/* RADIO 1 */}
        <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
    Are you a Defence candidate?
  </label>
  <div className="flex space-x-4">
    {['yes', 'no'].map((opt) => (
      <label
        key={opt}
        htmlFor={`defence-${opt}`}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200 cursor-pointer"
      >
        <input
          type="radio"
          id={`defence-${opt}`}
          name="defence"
          value={opt}
          checked={formData.defence === opt}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span className="ml-2 capitalize">{opt}</span>
      </label>
    ))}
  </div>
</div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
            className="mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:ring-purple focus:border-purple"
          >
            <option value="">Select gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* RADIO 2 */}
        <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
    Are you an Orphan?
  </label>
  <div className="flex space-x-4">
    {['yes', 'no'].map((opt) => (
      <label
        key={opt}
        htmlFor={`orphan-${opt}`}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200 cursor-pointer"
      >
        <input
          type="radio"
          id={`orphan-${opt}`}
          name="orphan"
          value={opt}
          checked={formData.orphan === opt}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span className="ml-2 capitalize">{opt}</span>
      </label>
    ))}
  </div>
</div>


        <div>
          <label className="block text-sm font-medium text-gray-700">Category Code</label>
          <input
            name="category"
            type="text"
            value={formData.category}
            onChange={handleChange}
            required
            placeholder="E.g., OPEN, SC, ST"
            className="mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:ring-purple focus:border-purple"
          />
        </div>

        {/* RADIO 3 */}
        <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
    Are you a PWD candidate?
  </label>
  <div className="flex space-x-4">
    {['yes', 'no'].map((opt) => (
      <label
        key={opt}
        htmlFor={`pwd-${opt}`}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200 cursor-pointer"
      >
        <input
          type="radio"
          id={`pwd-${opt}`}
          name="pwd"
          value={opt}
          checked={formData.pwd === opt}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span className="ml-2 capitalize">{opt}</span>
      </label>
    ))}
  </div>
</div>


        <div>
          <label className="block text-sm font-medium text-gray-700">CAP Round</label>
          <select
            name="capRound"
            value={formData.capRound}
            onChange={handleChange}
            className="mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:ring-purple focus:border-purple"
          >
            <option value="ALL">All</option>
            <option value="1">Round 1</option>
            <option value="2">Round 2</option>
            <option value="3">Round 3</option>
          </select>
        </div>

        {/* RADIO 4 */}
        <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
    Do you belong to Home University?
  </label>
  <div className="flex space-x-6">
    {['yes', 'no'].map((opt) => (
      <label
        key={opt}
        htmlFor={`homeUniversity-${opt}`}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200 cursor-pointer"
      >
        <input
          type="radio"
          id={`homeUniversity-${opt}`}
          name="homeUniversity"
          value={opt}
          checked={formData.homeUniversity === opt}
          onChange={handleChange}
          className="lg:w-6 w-4 h-4 "
        />
        <span className="ml-2 capitalize">{opt}</span>
      </label>
    ))}
  </div>
</div>


        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">Branch</label>
          <input
            name="branch"
            type="text"
            value={formData.branch}
            onChange={handleChange}
            placeholder="Search branch"
            className="mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:ring-purple focus:border-purple"
          />
          {branchSuggestions.length > 0 && (
            <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-auto z-10 rounded-md shadow">
              {branchSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-100"
                  onClick={() => handleSuggestionClick('branch', s.name)}
                >
                  {s.name} ({s.code})
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* RADIO 5 */}
        <div>
  <label className="block text-sm font-medium text-gray-700 dark:text-white mb-2">
    Admission Quota
  </label>
  <div className="flex space-x-4">
    {['State', 'AI'].map((opt) => (
      <label
        key={opt}
        htmlFor={`quota-${opt}`}
        className="flex items-center px-4 py-2 border border-gray-300 rounded-md bg-white dark:bg-gray-800 dark:border-gray-600 text-gray-900 dark:text-gray-200 cursor-pointer"
      >
        <input
          type="radio"
          id={`quota-${opt}`}
          name="quota"
          value={opt.toLowerCase()}
          checked={formData.quota === opt.toLowerCase()}
          onChange={handleChange}
          className="w-4 h-4"
        />
        <span className="ml-2">{opt}</span>
      </label>
    ))}
  </div>
</div>

        <div className="relative">
          <label className="block text-sm font-medium text-gray-700">College</label>
          <input
            name="college"
            type="text"
            value={formData.college}
            onChange={handleChange}
            placeholder="Search college"
            className="mt-1 w-full px-4 py-3 border rounded-md shadow-sm focus:ring-purple focus:border-purple"
          />
          {collegeSuggestions.length > 0 && (
            <ul className="absolute bg-white border w-full mt-1 max-h-48 overflow-auto z-10 rounded-md shadow">
              {collegeSuggestions.map((s, i) => (
                <li
                  key={i}
                  className="px-4 py-2 cursor-pointer hover:bg-purple-100"
                  onClick={() => handleSuggestionClick('college', s.name)}
                >
                  {s.name} ({s.code})
                </li>
              ))}
            </ul>
          )}
        </div>
        </div>
        
        <div className='flex justify-center'>
        <button
          type="submit"
          className="w-full lg:max-w-xl  py-3 px-4 bg-purple text-white font-semibold rounded-md hover:bg-purple-dark"
        >
          🎯 Predict My Colleges
        </button>
        </div>
      </form>
      </div>
      {!showColleges && (
        <div className='mx-auto my-4'>
          <h3 className='text-center'> <b>Start Character G-General, L-Ladies, End Character H-Home University, O-Other than Home University, S-State Level </b></h3>
          <h3 className='text-center'> <b> Defence Candidate : MHT CET provides a 5% reservation for the children of serving or ex-defence personnel.  </b></h3>
          <h3 className='text-center'> <b> Orphan Candidate : According to the MHT CET reservation policy, 1% of seats will be reserved for Orphan candidates .  </b></h3>
          <h3 className='text-center'> <b> PWD Candidate : Persons with disabilities having 40% and above degree of disability will have a 3% reservation   </b></h3>
          </div>
      )}
      {showColleges && (
  <div id='colleges-section' className=" bg-gray-50  px-4 sm:px-6 lg:px-8">
   { colleges.length != 0? <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Top Predicted Colleges</h2> :<h2 className="text-2xl font-bold text-center text-red mb-6">Sorry, No Colleges Found.Try Changing Inputs</h2>  }
    <div className="flex flex-wrap justify-center">
      { colleges!= null && colleges.map((college, index) => (
        <CollegeCard
          key={index}
          round = {college.round}
          name={college.name}
          location={college.location || 'Maharashtra'}
          branch={college.branch}
          chance={Number(formData.rank) !== 0? (college.rank - Number(formData.rank)  >1000?"High":"Low") :(  Number(formData.percentile) - college.percentile  > 1?"High":"Low")}
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

export default ProPlanPage;
