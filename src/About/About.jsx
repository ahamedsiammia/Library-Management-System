import React from 'react';
import { 
  HiOutlineSparkles, 
  HiOutlineRocketLaunch, 
  HiOutlineLightBulb, 
  HiOutlineBookOpen, 
  HiOutlineUsers, 
  HiOutlineShieldCheck,
  HiOutlineDevicePhoneMobile
} from 'react-icons/hi2';
import { FaGithub, FaLinkedin, FaFacebook } from 'react-icons/fa';
import { Link } from 'react-router';

const About = () => {
  // Key Platform Highlights
  const highlights = [
    {
      id: 1,
      title: "ডিজিটাল ক্যাটালগ",
      desc: "এক ক্লিকেই পছন্দসই বই খুঁজে বের করার জন্য দ্রুত ও আধুনিক সার্চ ফিল্টার।",
      icon: <HiOutlineBookOpen className="w-6 h-6 text-[#00BBA6]" />,
      bgColor: "bg-teal-50",
      borderColor: "border-teal-100"
    },
    {
      id: 2,
      title: "সহজ বুক ইস্যু",
      desc: "লাইনে না দাঁড়িয়ে সরাসরি ড্যাশবোর্ড থেকে বইয়ের জন্য রিকোয়েস্ট করার সুবিধা।",
      icon: <HiOutlineRocketLaunch className="w-6 h-6 text-blue-500" />,
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      id: 3,
      title: "যেকোনো ডিভাইসে এক্সেস",
      desc: "মোবাইল, ট্যাবলেট বা ল্যাপটপ—সব ডিভাইস থেকেই ই-বুক পড়ার চমৎকার অভিজ্ঞতা।",
      icon: <HiOutlineDevicePhoneMobile className="w-6 h-6 text-purple-500" />,
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    },
    {
      id: 4,
      title: "নিরাপদ ও আধুনিক",
      desc: "ব্যবহারকারীর ডেটা সুরক্ষা এবং স্মুথ পারফরম্যান্স নিশ্চিত করতে আধুনিক প্রযুক্তি।",
      icon: <HiOutlineShieldCheck className="w-6 h-6 text-emerald-500" />,
      bgColor: "bg-emerald-50",
      borderColor: "border-emerald-100"
    }
  ];

  // Team Members / Developers Data
  const teamMembers = [
    {
      id: 1,
      name: "সিয়াম আহামেদ",
      role: "Lead Full Stack Developer",
      image: "https://i.postimg.cc/52cv17yb/IMG-2400-JPG-Copy-(2).jpg",
      bio: "MERN Stack এবং আধুনিক ওয়েব টেকনোলজিতে বিশেষজ্ঞ। লাইব্রেরি সিস্টেমের মূল আর্কিটেকচার তৈরিতে নিয়োজিত।",
      github: "https://github.com/ahamedsiammia",
      linkedin: "https://www.linkedin.com/in/siam-ahamed/",
      facebook: "https://www.facebook.com/farhan.ahamed.siam.2024"
    },
    {
      id: 2,
      name: "আরাফাত রহমার",
      role: "UI/UX Designer & Frontend Dev",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ইউজার-ফ্রেন্ডলি ইন্টারফেস ও সফট রেসপনসিভ ডিজাইন তৈরিতে আগ্রহী। কাস্টমার এক্সপেরিয়েন্স বাড়াতে কাজ করছেন।",
      github: "#",
      linkedin: "#",
      facebook: "#"
    },
    {
      id: 3,
      name: "রাইহান",
      role: "Designer & cyber Security",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ড্যাশবোর্ড ম্যানেজমেন্ট ও সিকিউর এপিআই ইন্টিগ্রেশনে দক্ষ। ডেটাবেজ অপটিমাইজেশন নিশ্চিত করেন।",
      github: "#",
      linkedin: "#",
      facebook: "#"
    },
    {
      id: 3,
      name: "মুক্তাদীর রহমান",
      role: "Graphic Designer",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ড্যাশবোর্ড ম্যানেজমেন্ট ও সিকিউর এপিআই ইন্টিগ্রেশনে দক্ষ। ডেটাবেজ অপটিমাইজেশন নিশ্চিত করেন।",
      github: "#",
      linkedin: "#",
      facebook: "#"
    },
    {
      id: 3,
      name: "ইসরাত জাহান ইপ্তি",
      role: "Frontend Developer",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "ড্যাশবোর্ড ম্যানেজমেন্ট ও সিকিউর এপিআই ইন্টিগ্রেশনে দক্ষ। ডেটাবেজ অপটিমাইজেশন নিশ্চিত করেন।",
      github: "#",
      linkedin: "#",
      facebook: "#"
    },
    {
      id: 3,
      name: "-",
      role: "-------",
      image: "https://i.postimg.cc/TPKKBBvG/wingtilldie-avatar-1577909.jpg",
      bio: "-",
      github: "#",
      linkedin: "#",
      facebook: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-gray-800 font-sans">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 px-4 max-w-7xl mx-auto overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-teal-200/40 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="text-center max-w-3xl mx-auto space-y-5">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/70 text-[#00BBA6] font-medium text-sm">
            <HiOutlineSparkles className="w-4 h-4" /> ডিজিটাল শিক্ষার নতুন দিগন্ত
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
            জ্ঞানচর্চাকে সহজ ও এক্সেসিবল করতে আমাদের <span className="text-[#00BBA6]">বিশেষ উদ্যোগ</span>
          </h1>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            আমরা একটি আধুনিক ডিজিটাল লাইব্রেরি ম্যানেজমেন্ট প্ল্যাটফর্ম, যা শিক্ষার্থী ও গবেষকদের হাতের নাগালে হাজারো বই ও রিসোর্স পৌঁছে দিতে নিরলস কাজ করে যাচ্ছে।
          </p>
        </div>
      </section>


      {/* 2. MISSION & VISION SECTION */}
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Mission Card */}
          <div className="p-8 rounded-3xl bg-white border border-teal-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center text-[#00BBA6] mb-6">
              <HiOutlineRocketLaunch className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">আমাদের মিশন (Mission)</h2>
            <p className="text-gray-600 leading-relaxed">
              কাগজে-কলমে বই খোঁজার সময় সাশ্রয় করে শিক্ষার্থীদের জন্য একটি স্বাচ্ছন্দ্যময় ও আধুনিক ডিজিটাল লাইব্রেরি তৈরি করা। যেকোনো স্থান থেকে যেন সবাই তথ্য ও জ্ঞান সংগ্রহ করতে পারে তা নিশ্চিত করা।
            </p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
          </div>

          {/* Vision Card */}
          <div className="p-8 rounded-3xl bg-white border border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500 mb-6">
              <HiOutlineLightBulb className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-3">আমাদের ভিশন (Vision)</h2>
            <p className="text-gray-600 leading-relaxed">
              একটি স্মার্ট ও পেপারলেস শিক্ষাব্যবস্থা গড়ে তোলা, যেখানে প্রতিটি শিক্ষা প্রতিষ্ঠান এবং শিক্ষার্থী খুব সহজেই লাইব্রেরি পরিষেবা গ্রহণ, পরিচালনা ও বই বিনিময় করতে পারবে।
            </p>
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
          </div>

        </div>
      </section>


      {/* 3. KEY HIGHLIGHTS / FEATURES */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800">
            কেন আমাদের <span className="text-[#00BBA6]">প্ল্যাটফর্ম আলাদা?</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            আধুনিক সব সুবিধাসমূহ যা আপনার বই পড়ার অভিজ্ঞতাকে আরও চমৎকার করবে।
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item) => (
            <div 
              key={item.id} 
              className={`p-6 rounded-2xl bg-white border ${item.borderColor} shadow-sm hover:-translate-y-1 transition-all duration-300`}
            >
              <div className={`w-12 h-12 rounded-xl ${item.bgColor} flex items-center justify-center mb-4`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>


      {/* 4. STATS SECTION */}
      <section className="py-12 bg-white border-y border-slate-200/60">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00BBA6]">২৫,০০০+</h3>
            <p className="text-gray-600 text-sm mt-1">মোট বইয়ের সংখ্যা</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00BBA6]">১৫,৪০০+</h3>
            <p className="text-gray-600 text-sm mt-1">সক্রিয় পাঠক</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00BBA6]">৮,২০০+</h3>
            <p className="text-gray-600 text-sm mt-1">ডিজিটাল ই-বুক</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-[#00BBA6]">১০০%</h3>
            <p className="text-gray-600 text-sm mt-1">অটোমেটেড প্রসেস</p>
          </div>
        </div>
      </section>


      {/* 5. MEET OUR TEAM / DEVELOPERS */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="text-[#00BBA6] font-semibold text-sm tracking-wider uppercase">Our Creators</span>
          <h2 className="text-3xl font-bold text-gray-800 mt-1">
            পিছনে রয়েছে যাদের <span className="text-[#00BBA6]">ক্লান্তহীন শ্রম</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            আমাদের দক্ষ এবং নিবেদিতপ্রাণ ডেভেলপার টিম।
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <div 
              key={member.id}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 text-center flex flex-col items-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mb-4 border-4 border-teal-50 shadow-inner">
                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
              <p className="text-[#00BBA6] text-sm font-medium mb-3">{member.role}</p>
              <p className="text-gray-600 text-sm leading-relaxed mb-6">
                {member.bio}
              </p>

              {/* Social Icons */}
              <div className="flex justify-center items-center gap-4 text-gray-400 mt-auto">
                <a href={member.github} target='_blank' className="hover:text-[#00BBA6] transition-colors"><FaGithub className="w-5 h-5" /></a>
                <a href={member.linkedin} target='_blank' className="hover:text-[#00BBA6] transition-colors"><FaLinkedin className="w-5 h-5" /></a>
                <a href={member.facebook} target='_blank' className="hover:text-[#00BBA6] transition-colors"><FaFacebook className="w-5 h-5" /></a>
              </div>
            </div>
          ))}
        </div>
      </section>


      {/* 6. CALL TO ACTION (CTA) */}
      <section className="pb-20 px-4 max-w-5xl mx-auto">
        <div className="bg-gradient-to-r from-teal-500 to-[#00BBA6] rounded-3xl p-10 text-center text-white shadow-xl relative overflow-hidden">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            আজই যুক্ত হন আমাদের ডিজিটাল লাইব্রেরিতে!
          </h2>
          <p className="text-teal-50 text-base md:text-lg max-w-2xl mx-auto mb-8">
            আপনার পছন্দের বইটি রিকোয়েস্ট করুন এবং পড়ালেখার অভিজ্ঞতাকে করে তুলুন আরও সহজ ও আনন্দদায়ক।
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to={"/register"} className="px-8 py-3.5 bg-white text-[#00BBA6] font-bold rounded-xl shadow-md hover:bg-slate-100 transition-all">
              একাউন্ট তৈরি করুন
            </Link>
            <button className="px-8 py-3.5 bg-teal-600/50 text-white font-semibold rounded-xl border border-teal-300 hover:bg-teal-600/70 transition-all">
              ক্যাটালগ দেখুন
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;