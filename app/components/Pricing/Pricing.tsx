"use client"
import React from "react";
import { useRouter } from 'next/navigation';
import { Lock } from "lucide-react";

interface PricingPlan {
    title: string;
    price: string;
    features: { label: string; locked: boolean }[];
    buttonLabel: string;
    highlight?: boolean;
}

const pricingData: PricingPlan[] = [
    {
        title: "Free Plan",
        price: "₹0",
        features: [
            { label: "Rank Filter", locked: false },
            { label: "Gender Filter", locked: false },
            { label: "Category Filter", locked: false },
            { label: "Percentile Filter", locked: true },
            { label: "CAP Round Filter", locked: true },
            { label: "Branch Filter", locked: true },
            { label: "College Filter", locked: true },
            { label: "Defence Candidate", locked: true },
            { label: "Orphan Candidate", locked: true },
            { label: "PWD Candidate", locked: true },
            { label: "Home University Quota", locked: true },
            { label: "State/AI Quota", locked: true },
        ],
        buttonLabel: "Get Started"
    },
    {
        title: "Starter Plan",
        price: "₹49",
        features: [
            { label: "All Free Plan Features", locked: false },
            { label: "Percentile Filter", locked: false },
            { label: "CAP Round Filter", locked: false },
            { label: "Branch Filter", locked: false },
            { label: "College Filter", locked: false },
            { label: "Defence Candidate", locked: true },
            { label: "Orphan Candidate", locked: true },
            { label: "PWD Candidate", locked: true },
            { label: "Home University Quota", locked: true },
            { label: "State/AI Quota", locked: true },
        ],
        buttonLabel: "Start Now",
        highlight: true
    },
    {
        title: "Pro Plan",
        price: "₹99",
        features: [
            { label: "All Starter Plan Features", locked: false },
            { label: "Defence Candidate", locked: false },
            { label: "Orphan Candidate", locked: false },
            { label: "PWD Candidate", locked: false },
            { label: "Home University Quota", locked: false },
            { label: "State/AI Quota", locked: false },
            
        ],
        buttonLabel: "Upgrade to Pro"
    }
];

export default function PricingSection() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/collegesearch');
    };

    const handleClickStarterPlan = () => {
        router.push('/StarterPlan');
    };

    const handleClickProPlan = () => {
        router.push('/ProPlan');
    };

    return (
        <div id="plans-section" className="mx-auto max-w-2xl pb-4 px-4 sm:py-20 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mx-auto max-w-7xl px-4 pt-16 pb-32 sm:pt-32 lg:px-8">
                <div className="text-center pb-12">
                    <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg font-medium">
                        Affordable pricing options for every learner.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pricingData.map((plan, index) => (
                        <div
                            key={index}
                            className={`p-8 text-center rounded-lg bg-white shadow-lg transition-all duration-300 ${
                                plan.highlight ? "border-4 border-purple scale-[1.02]" : ""
                            }`}
                        >
                            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h3>
                            <p className="text-3xl font-extrabold text-purple mb-6">{plan.price}</p>
                            <ul className="mb-6 space-y-2 text-gray-700 text-left">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center gap-2">
                                        <span>{feature.locked ? '🔒' : '✅'}</span>
                                        <span>{feature.label}</span>
                                    </li>
                                ))}
                            </ul>
                            <button
                                onClick={plan.price =="₹0" ?handleClick:plan.price =="₹49"? handleClickStarterPlan : handleClickProPlan }
                                className="bg-purple text-white font-semibold py-3 px-6 rounded hover:bg-pruple w-full"
                            >
                                {plan.buttonLabel}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
