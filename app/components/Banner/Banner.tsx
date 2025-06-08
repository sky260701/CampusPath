"use client"
import { useRouter } from 'next/navigation';
import Dropdownone from './Dropdownone';
import Dropdowntwo from './Dropdowntwo';
import { useState } from 'react';


const Banner = () => {

     const router = useRouter();

     const[validation ,setValidation] = useState(false);
     const [course, setCourse] = useState({ name: 'MHT-CET-2025' });
     const [selectedField, setSelectedField] = useState({ name: 'Engineering' });
    
        const handleClick = () => {
            const courseSlug = course.name;
            const fieldParam = selectedField.name;
            console.log(courseSlug ,fieldParam)
            if((fieldParam==='Medical Science' && courseSlug !== 'NEET-2025') || (fieldParam==='Engineering' && courseSlug ==='NEET-2025')){
                setValidation(true)
            }
            else{
            if(courseSlug==='MHT-CET-2025') {
               router.push('/collegesearch'); 
          } else {
               router.push('/WeAreComing'); 
          }
        }
        };
    
    return (
        <main className='banner-image'>
            <div className="relative px-6 lg:px-8">
                <div className="mx-auto max-w-5xl pt-16 sm:pt-40 sm:pb-24">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-75px md:4px">
                        Your Rank, Our Data. <br /> The Right College Awaits
                        </h1>
                        <p className="mt-6 text-lg leading-8 text-black">
                        Stop guessing. Let CampusMarg guide you to the best  colleges you’re eligible for — based on last year&apos;s cutoffs.
                        </p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <div className="hidden sm:block -space-x-2 overflow-hidden">
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="data:image/jpeg;base64,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"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                                <img
                                    className="inline-block h-12 w-12 rounded-full ring-2 ring-white"
                                    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </div>
                            <div className='bannerBorder sm:pl-8'>
                                <div className='flex justify-center sm:justify-start'>
                                    <h3 className='text-2xl font-semibold mr-2'>4.6</h3>
                                    <img src={'/assets/banner/Stars.svg'} alt="stars-icon" />
                                </div>
                                <div>
                                    <h3 className='text-sm'>Rated by 25k on google.</h3>
                                </div>
                            </div>
                        </div>
                    </div>


                    {/* DROPDOWN BUTTONS */}


                    <div className="mx-auto max-w-4xl mt-24 pt-6 pb-8 px-6 lg:max-w-4xl lg:px-8 bg-white rounded-lg boxshadow">
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-8 xl:gap-x-8">
                            <div className="col-span-3">
                            <Dropdownone value={course} onChange={setCourse} />
                            </div>
                            <div className="col-span-3">
                            <Dropdowntwo value={selectedField} onChange={setSelectedField} />
                            </div>
                            <div className="col-span-3 sm:col-span-2 mt-2">
                                <button onClick={handleClick} className="bg-purple w-full hover:bg-pruple text-white font-bold py-4 px-3 rounded">
                                    Start Your Free Trial
                                </button>
                            </div>
                        </div>
                        {validation && (
                            <div>
                                <h4 className='text-red text-center'>You have Entered Wrong Inputs , Please Enter the Correct Ones.</h4>
                            </div>
                        )}
                    </div>

                </div>
            </div>
            
        </main>
    )
}

export default Banner;
