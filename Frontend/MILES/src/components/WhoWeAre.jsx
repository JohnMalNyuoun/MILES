import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  BookOpen, 
  Heart, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp,
  Target
} from 'lucide-react';

// Assets
import Project1Image from '../assets/Project1.jpg';
import NyajuitFounderImage from '../assets/NyajuitFounder.png';
import Project3Image from '../assets/Project3.jpg';
import GroupImage from '../assets/Group.jpeg'; // 👈 Updated import

function WhoWeAre() {
  const [showStory, setShowStory] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 text-gray-800 font-sans">
      
      {/* 1. HERO SECTION WITH PROJECT1 BACKGROUND */}
      <div 
        className="relative rounded-2xl overflow-hidden min-h-[260px] md:min-h-[320px] flex items-end p-6 md:p-10 shadow-md"
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.85) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.1) 100%), url(${Project1Image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="space-y-2 text-white">
          <span className="text-xs md:text-sm font-bold tracking-wider uppercase text-emerald-400 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> Refugee-Led &amp; Accountable
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Who We Are
          </h1>
        </div>
      </div>

      {/* FOUNDER & GOVERNANCE SECTION (BELOW THE PICTURE) */}
      <section className="space-y-8">
        <div className="grid md:grid-cols-3 gap-8 items-center">
          <div className="md:col-span-2 space-y-4">
            <p className="text-xl text-gray-600 leading-relaxed">
              MILES is founded and led by people who have lived this reality firsthand. 
              Our founder, <strong className="text-gray-900">Nyajuok Deng</strong>, is a South Sudanese refugee who grew up in Kakuma and serves as a <strong className="text-gray-900">hundrED Ambassador</strong> for youth-led innovation.
            </p>
          </div>

          {/* Founder Image */}
          <div className="w-full">
            <img 
              src={NyajuitFounderImage} 
              alt="Nyajuok Deng - Founder of MILES" 
              className="w-full aspect-square object-cover rounded-2xl border border-gray-100 shadow-sm" 
            />
          </div>
        </div>

        {/* Governance Details */}
        <div className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-600 font-bold">
              <Users className="w-5 h-5" />
              <h3 className="text-lg text-gray-900">Lived Experience at the Core</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Our governance structure directly includes Young Mothers and Young Girls Representatives. The lived experiences of those we serve shape every program we design and run.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-600 font-bold">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-lg text-gray-900">Governance &amp; Safeguarding</h3>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              Operating as a refugee-led CBO pursuing formal Kenyan registration, we maintain a written Constitution, Child Safeguarding Policy, Code of Conduct, and a confidential reporting mechanism.
            </p>
          </div>
        </div>
      </section>

      {/* 2. IMPACT NUMBERS & COMMUNITY TRAINING PHOTO */}
      <section className="space-y-6 py-8 border-y border-gray-200">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold text-gray-900">Our April 2026 Impact</h2>
          <p className="text-gray-600 text-lg">
            Through workshops, peer support, and community engagement, we help girls stay in school and build brighter futures.
          </p>
        </div>

        {/* Community Workshop Banner Image */}
        <div className="my-6">
          <img 
            src={Project3Image} 
            alt="MILES Ambassador Program Training Session in Kakuma" 
            className="w-full aspect-[21/9] min-h-[200px] object-cover rounded-2xl border border-gray-100 shadow-sm"
          />
        </div>

        {/* Metrics Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-2">
          <div>
            <div className="text-4xl font-extrabold text-emerald-700">45</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Total Trained</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-emerald-700">21</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Young Mothers</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-emerald-700">15</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Young Girls</div>
          </div>
          <div>
            <div className="text-4xl font-extrabold text-emerald-700">9</div>
            <div className="text-sm font-medium text-gray-600 mt-1">Boys Participated</div>
          </div>
        </div>
        
        <p className="text-xs text-gray-500 italic">
          Topics covered: Peer pressure, gender equality, gender-based violence (GBV), and early marriage/pregnancy prevention.
        </p>
      </section>

      {/* 3. CASE STUDY / STORY WITH IMAGE */}
      <section className="space-y-6 pl-4 sm:pl-6 border-l-4 border-amber-500">
        <div className="flex items-center gap-2 text-amber-800">
          <Heart className="w-5 h-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Spotlight</span>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">Nyethak's Story: Restoring Education</h2>
            <p className="text-gray-700 leading-relaxed">
              Before becoming pregnant at 17, Nyethak was a student with real promise. When she became pregnant, community beliefs halted her education—not because of a law, but because no structure existed to advocate for her path back to school.
            </p>
          </div>

          {/* Story Image */}
          <div>
            <img 
              src={GroupImage} /* 👈 Updated variable name here */
              alt="Nyethak back in class" 
              className="w-full aspect-[4/3] object-cover rounded-xl border border-gray-100 shadow-sm" 
            />
          </div>
        </div>

        {/* Collapsible Story Details */}
        {showStory && (
          <div className="space-y-4 pt-2 text-gray-700 leading-relaxed text-sm max-w-3xl">
            <p>
              In April, Nyethak attended a MILES Ambassador Program session and found the confidence to share what she had experienced. What followed required very little: a uniform, basic supplies, and a $30 school registration fee.
            </p>
            <p className="font-medium text-gray-900">
              That so little stood between Nyethak and her education is the point. Girls in Kakuma don't lack ambition—they lack the framework to catch them when everything else fails. Today, she is back in class.
            </p>
            <p className="text-xs text-gray-500 italic">
              * Her story is shared here with her informed consent.
            </p>
          </div>
        )}

        <button 
          onClick={() => setShowStory(!showStory)}
          className="inline-flex items-center gap-1 text-sm font-bold text-amber-900 hover:text-amber-700 transition"
        >
          {showStory ? (
            <>Read Less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>Read Full Story <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      </section>

      {/* 4. SUSTAINABILITY & ROADMAP */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <Target className="w-6 h-6 text-emerald-600" /> Sustainability &amp; Looking Ahead
        </h2>
        
        <div className="space-y-4 divide-y divide-gray-100">
          <div className="flex items-start gap-4 pt-2">
            <GraduationCap className="w-6 h-6 text-emerald-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900">E-Learning Platform</h3>
              <p className="text-sm text-gray-600">Building digital modules for remote training and broader accessibility.</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4 pt-4">
            <Users className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900">Alumni Network</h3>
              <p className="text-sm text-gray-600">Graduates mentoring incoming cohorts to create lasting community continuity.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 pt-4">
            <BookOpen className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-gray-900">Local Partnerships</h3>
              <p className="text-sm text-gray-600">Deepening ties with schools, elders, parent volunteers, and healthcare providers.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. RISKS & MITIGATION TABLE */}
      <section className="space-y-6 pt-4">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-600" /> Risks &amp; Mitigation Strategy
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b-2 border-gray-900 text-gray-900 font-bold">
                <th className="py-3 pr-4 w-1/3">Identified Risk</th>
                <th className="py-3 w-2/3">How MILES Mitigates It</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr>
                <td className="py-3 pr-4 font-semibold text-gray-900">Funding gaps or delays</td>
                <td className="py-3 text-gray-600">Phased budgeting and a diversified funding base (grants, partnerships, and income generation).</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-gray-900">Low attendance (distance/childcare)</td>
                <td className="py-3 text-gray-600">Transport support and flexible, childcare-friendly scheduling built into program budgets.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-gray-900">Community resistance</td>
                <td className="py-3 text-gray-600">Direct engagement of local leaders, parent volunteers, elders, boys, and men through Mass Awareness.</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 font-semibold text-gray-900">Safeguarding incidents</td>
                <td className="py-3 text-gray-600">Documented Child Safeguarding Policy, trained facilitators, dedicated focal point, and confidential reporting channels.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default WhoWeAre;