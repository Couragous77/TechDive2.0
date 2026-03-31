"use client";  // This line should be at the very top

import { AiFillLinkedin, AiFillMail, AiFillFileText, AiFillMediumSquare } from 'react-icons/ai';
import Link from 'next/link';
import { FaSchool, FaSuitcase, FaLaptop, FaChalkboardTeacher, FaConfluence, FaWindows, FaPen } from "react-icons/fa";
import { SiJira, SiSplunk, SiAwssecretsmanager } from "react-icons/si";
import { TbSettingsAutomation } from "react-icons/tb";
import { SiCyberdefenders } from "react-icons/si";
import { SiJavascript } from "react-icons/si";
import { SiMetasploit } from "react-icons/si";
import { FaGitSquare } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { SiSnort } from "react-icons/si";
import { FaAws } from "react-icons/fa";
import { SiStreamlit } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";
import { VscVscode } from "react-icons/vsc";
import { SiVirustotal } from "react-icons/si";
import { SiWireshark } from "react-icons/si";
import { SiKalilinux } from "react-icons/si";


import React, { useEffect, useState } from 'react';
import Loading from '../components/loading';
import './styles.css';


const Justin = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Simulate loading delay (e.g., 5 seconds)
  useEffect(() => {
      const timer = setTimeout(() => {
          setIsLoading(false);  // Stop loading after 5 seconds
      }, 5000);

      // Cleanup timer
      return () => clearTimeout(timer);
  }, []);

  // Scroll to the top when loading is complete
  useEffect(() => {
      if (!isLoading) {
          window.scrollTo(0, 0);  // Scroll to the top of the page
      }
  }, [isLoading]); // Run this effect when isLoading changes

  // Render the loading component if still loading
  if (isLoading) {
      return <Loading />;
  }

  return (
      <div>
          {/* Profile Section */}
          <div className="flex flex-col justify-center items-center min-h-screen -mt-4">
              <div className="mt-40 w-40 h-40 sm:w-50 sm:h-50 md:w-50 md:h-50 lg:w-60 lg:h-60 rounded-full overflow-hidden border-4 border-white shadow-xl transform transition-all duration-500 ease-in-out animate-fadeAndZoom">
                  <img src="/images/Justin.jpg" alt="Justin" className="w-full h-full" />
              </div>
              <h1 className="mt-1 text-4xl sm:text-5xl md:text-6xl font-bold text-gray-100 animate-fadeAndZoom">Justin Duru</h1>
              <h3 className="mt-2 text-lg sm:text-xl md:text-2xl animate-pulse-fade-scale text-center text-gray-100">
                  SIEM Apprentice Instructor | Security Program Manager
              </h3>
              <p className="mt-2 text-lg sm:text-xl animate-pulse-fade-scale text-center text-gray-100">
                  "Every disappointment is a blessing in disguise"
              </p>

{/* Social Links */}
<div className="flex space-x-4 mt-4">
    <div className="relative group">
        <a href="https://www.linkedin.com/in/justin-duru-97159a250/" target="_blank" rel="noopener noreferrer">
            <AiFillLinkedin size={30} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
        </a>
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
            LinkedIn
        </span>
    </div>

    <div className="relative group">
        <a href="mailto:jduru213@gmail.com" target="_blank" rel="noopener noreferrer">
            <AiFillMail size={30} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
        </a>
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
            Email
        </span>
    </div>

    <div className="relative group">
        <a href="https://docs.google.com/document/d/1iUwZ2TQr1kTolBI_w0LW6pcB979RCPIdV0oST8uvP_Y/edit" target="_blank" rel="noopener noreferrer">
            <AiFillFileText size={30} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
        </a>
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
            Resume
        </span>
    </div>

    <div className="relative group">
        <a href="https://medium.com/@jduru213" target="_blank" rel="noopener noreferrer">
            <AiFillMediumSquare size={30} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
        </a>
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
            Medium
        </span>
    </div>

    <div className="relative group">
        <a href="https://github.com/jduru213-1" target="_blank" rel="noopener noreferrer">
            <FaGithub size={30} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
        </a>
        <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
            GitHub
        </span>
    </div>
</div>


              {/* Profile Description */}
              <h1 className=" mt-40 text-5xl font-extrabold text-gray-100 animate-fadeAndZoom text-center">About Me</h1> {/* Changed mt-6 to mt-2 */}
                <div className="max-w-xl mx-auto px-4">
                  <p className=" flex flex-col items-center justify-center mt-10 text-lg text-gray-100 text-center">
                  SIEM Apprentice Instructor specializing in tools and frameworks such as Splunk, Nessus, Active Directory, Snort, VirusTotal, and Sysmon. This role involves assisting with hands-on training classes at Ellington Cyber Academy, focusing on data ingestion, threat detection, incident response, and cybersecurity best practices.
                  <br /><br />
                  Additionally, in my position as a Security Program Manager Intern, I leveraged Jira and Confluence to improve productivity and streamline project management, strengthening my knowledge in documentation and team collaboration. Being a Co-founder of TechTrek enabled me to dive into coding and design a website from scratch using Node.js, React, Python, and JavaScript while acquiring knowledge of CI/CD processes with Git and Visual Studio Code.
                  <br /><br />
                  Below are key skills developed, recent projects, and a timeline of my professional experience and education. I look forward to connecting soon!
                  </p>
               </div>

             {/* Skills Section */}
<div className="flex flex-wrap justify-center mt-10">
  {/* Skill Icons */}
  <div className="mb-40 flex flex-wrap justify-center mt-10">
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="JavaScript"
    >
      <SiJavascript size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Git"
    >
      <FaGitSquare size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="GitHub"
    >
      <FaGithub size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="HTML5"
    >
      <FaHtml5 size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="CSS3"
    >
      <FaCss3Alt size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="React"
    >
      <FaReact size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Snort"
    >
      <SiSnort size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="AWS"
    >
      <FaAws size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Streamlit"
    >
      <SiStreamlit size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Python"
    >
      <FaPython size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Next.js"
    >
      <RiNextjsFill size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Visual Studio Code"
    >
      <VscVscode size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="VirusTotal"
    >
      <SiVirustotal size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Wireshark"
    >
      <SiWireshark size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Kali Linux"
    >
      <SiKalilinux size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Kali Linux"
    >
      <SiSplunk size={40} className="text-blue-100 hover:text-black" />
    </a>
    <a 
      className="mx-4 mb-4 p-2 border-2 border-gray-300 rounded-lg hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out" 
      aria-label="Snort"
    >
      <SiMetasploit size={40} className="text-blue-100 hover:text-black" />
    </a>
  </div>
</div>
</div>

  
{/* Projects Section */}
<h1 className="text-5xl font-extrabold text-gray-100 animate-fadeAndZoom text-center">Projects</h1>
<p className="mt-0 text-gray-100 animate-fadeAndZoom text-center">
  A display of my most recent works, projects, and developments.
</p>

<div className="flex flex-col justify-center items-center min-h-screen">
  {/* Carousel with Swipe Buttons */}
  <div className="mt-[-250px] relative w-full max-w-4xl flex justify-center">
    {/* Carousel Container */}
    <div className="carousel carousel-horizontal rounded-box h-96 overflow-hidden w-full">
      {/* Carousel items */}

      {/* Project 1 */}
      <div className="carousel-item h-full w-full flex justify-center">
        <div className="m-4 max-w-xs sm:max-w-md md:max-w-lg">
          <div className="card bg-black h-full shadow-xl border-2 border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="card-body flex flex-col items-center justify-center text-center h-full">
              <FaWindows size={80} className="text-blue-100" />
              <h1 className="card-title text-white">Active Directory Detection & Monitoring</h1>
              <p className="text-gray-100">
                Conducted a brute force attack simulation on a Windows machine to assess vulnerability and resilience. Utilized Splunk for in-depth analysis of generated threats, including failed login attempts and unusual access patterns.
              </p>
              <div className="card-actions animate-fadeIn mt-4">
                <Link href="https://medium.com/@jduru213/cybersecurity-homelab-building-an-on-premise-domain-environment-with-splunk-windows-and-active-840ba325f3ee">
                  <button className="btn bg-white text-black hover:bg-black hover:text-white hover:scale-105 transform transition-transform duration-300">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project 2 */}
      <div className="carousel-item h-full w-full flex justify-center">
        <div className="m-4 max-w-xs sm:max-w-md md:max-w-lg">
          <div className="card bg-black h-full shadow-xl border-2 border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="card-body flex flex-col items-center justify-center text-center h-full">
              <SiAwssecretsmanager size={80} className="text-blue-100" />
              <h1 className="card-title text-white">Vulnerability Management</h1>
              <p className="text-gray-100 animate-fadeAndZoom">
                Conducted a vulnerability assessment with Metasploit to identify security weaknesses in target systems. Utilizing the NIST Cybersecurity Framework ensured adherence to industry standards, resulting in a report outlining vulnerabilities and risk levels.
              </p>
              <div className="card-actions mt-4">
                <Link href="https://medium.com/@jduru213/vulnerability-management-lab-using-nessus-nist-framework-012bda6dbfd3">
                  <button className="btn bg-white text-black hover:bg-black hover:text-white hover:scale-105 transform transition-transform duration-300">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project 3 */}
      <div className="carousel-item h-full w-full flex justify-center">
        <div className="m-4 max-w-xs sm:max-w-md md:max-w-lg">
          <div className="card bg-black h-full shadow-xl border-2 border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="card-body flex flex-col items-center justify-center text-center h-full">
              <TbSettingsAutomation size={80} className="text-blue-100" />
              <h1 className="card-title text-white">Automated Threat Detection</h1>
              <p className="text-gray-100 animate-fadeAndZoom">
                Established an automated security environment by creating Splunk alerts sent to my SOAR platform via Tines. Deployed Mimicatz on user machines and used VirusTotal for swift hash investigation.
              </p>
              <div className="card-actions mt-4">
                <Link href="https://your-link-here">
                  <button className="btn bg-white text-black hover:bg-black hover:text-white hover:scale-105 transform transition-transform duration-300">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Project 4 */}
      <div className="carousel-item h-full w-full flex justify-center">
        <div className="m-4 max-w-xs sm:max-w-md md:max-w-lg">
          <div className="card bg-black h-full shadow-xl border-2 border-transparent hover:border-white hover:shadow-2xl hover:scale-105 transform transition-all duration-300">
            <div className="card-body flex flex-col items-center justify-center text-center h-full">
              <SiCyberdefenders size={80} className="text-blue-100" />
              <h1 className="card-title text-white">Cybersecurity Page</h1>
              <p className="text-gray-100 animate-fadeAndZoom">
                Created a page to guide students in cybersecurity through a questionnaire, fundamental cyber tips, project displays in incident response and threat detection, and an escape room for practical scenario testing.
              </p>
              <div className="card-actions mt-4">
                <Link href="/cybersecurity">
                  <button className="btn bg-white text-black hover:bg-black hover:text-white hover:scale-105 transform transition-transform duration-300">
                    Explore
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Swipe Buttons */}
    <button
      className="absolute left-[1rem] md:left-[2rem] top-1/2 transform -translate-y-1/2 bg-white text-black px-6 py-4 rounded-full shadow-lg hover:bg-gray-400 transition-all duration-300 hover:scale-110 hover:rotate-12 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95 active:shadow-none"
      onClick={() => {
        const carousel = document.querySelector('.carousel');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const carouselItem = carouselItems.length > 0 ? carouselItems[0] : null;

        if (carousel && carouselItem) {
          carousel.scrollBy({
            left: -carouselItem.clientWidth,
            behavior: 'smooth',
          });
        }
      }}
    >
      <span className="transform transition-transform duration-200 hover:translate-x-1">◀</span>
    </button>

    <button
      className="absolute right-[1rem] md:right-[2rem] top-1/2 transform -translate-y-1/2 bg-white text-black px-6 py-4 rounded-full shadow-lg hover:bg-gray-400 transition-all duration-300 hover:scale-110 hover:-rotate-12 hover:shadow-2xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 active:scale-95 active:shadow-none"
      onClick={() => {
        const carousel = document.querySelector('.carousel');
        const carouselItems = document.querySelectorAll('.carousel-item');
        const carouselItem = carouselItems.length > 0 ? carouselItems[0] : null;

        if (carousel && carouselItem) {
          carousel.scrollBy({
            left: carouselItem.clientWidth,
            behavior: 'smooth',
          });
        }
      }}
    >
      <span className="transform transition-transform duration-200 hover:-translate-x-1">▶</span>
    </button>
  </div>
</div>

  <h1 className="mb-2 text-5xl font-extrabold text-gray-100 text-center">Education & Experience</h1>
<p className="text-gray-100 text-center">A display of my most recent works, projects, and developments.</p>

<ul className="mt-16 timeline timeline-snap-icon max-md:timeline-compact timeline-vertical flex-auto">
  <li className="transition-transform duration-500">
    <div className="timeline-middle">
    <div className="p-4 rounded-full bg-black transition duration-300 hover:bg-white shadow-lg">
    <FaSchool
      size={110} 
      className="text-white transition-colors duration-300 hover:text-black" 
    />
  </div>
</div>    
    <div className="mt-16 timeline-start ml-20 mb-10 md:text-end border-white p-4 transition-opacity duration-500 hover:opacity-80">
      <img src="/images/fsu.jpg" alt="Frostburg State University" className="w-20 h-20 rounded-full" />
      <p className="font-mono italic text-gray-100 font-bold text-left">August 2023 - Current</p>
      <div className="text-lg font-black text-gray-100 text-left">Frostburg State University</div>
      <p className="text-base text-gray-100 text-left">
        Enrolled at Frostburg State University, pursuing a Bachelors of Science in Cybersecurity and Information Assurance.
      </p>
    </div>
    <hr />
  </li>

  <li className="transition-transform duration-500">
    <hr />
    <div className="timeline-middle">
    <div className="p-4 rounded-full bg-black border-2 border-transparent transition duration-300 hover:bg-white hover:border-black shadow-lg">
  <FaSuitcase
    size={110} 
    className="text-white transition-colors duration-300 hover:text-black" 
  />
</div>

</div>    
    <div className="timeline-end mb-10 border-white p-4 transition-opacity duration-500">
      <img src="/images/twc.jpeg" alt="TWC Internship" className="w-20 h-20 rounded-full" />
      <time className="font-mono italic text-gray-100 font-bold">June - August 2024</time>
      <div className="text-lg font-black text-gray-100">Student Intern - The Washington Center</div>
      <p className="text-base text-gray-100">Researched the cybersecurity field and explored various career paths by reaching out to industry professionals and conducting informational interviews throughout my time in Washington, D.C. Developed skills in effective communication, networking, and teamwork through hands-on experience in a dynamic environment.</p>
      <div className="flex justify-center mt-3">
  <div className="mx-4 mb-4 p-2 border-2 rounded-lg border-gray-300 group hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out">
    <FaPen size={30} className="text-white group-hover:text-black transition duration-300 ease-in-out" />
  </div>
</div>

    </div>
    <hr />
  </li>

  <li className="transition-transform duration-500 ">
    <hr />
    <div className="timeline-middle">
    <div className="flex items-center justify-center p-4 transition-transform duration-300 hover:scale-105">
  <div className="p-4 rounded-full bg-black transition duration-300 hover:bg-white shadow-lg">
    <FaLaptop 
      size={110} 
      className="text-white transition-colors duration-300 hover:text-black" 
    />
  </div>
</div>
    </div>
    <div className="timeline-start ml-20 mb-10 border-white p-4 transition-opacity duration-500 hover:opacity-80">
  <Link href="https://kenneth-ellington.mykajabi.com/">
    <img src="/images/eca.png" alt="Ellington Cyber Academy" className="w-20 h-20 rounded-full" />
  </Link>

  <time className="font-mono italic text-gray-100 font-bold">June - August 2024</time>
<div className="text-lg font-black text-gray-100">Security Program Manager Intern - Ellington Cyber Academy</div>
<p className="text-base text-gray-100">
  Led the migration and management of cybersecurity projects using Jira and Confluence. Optimized workflows and enhanced project efficiency with these tools to streamline collaboration and drive innovative security solutions.
</p>
<div className="flex justify-center mt-2 space-x-4">
  <div className="p-2 border-2 rounded-lg border-gray-300 group hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out">
    <SiJira size={30} className="text-blue-100 group-hover:text-black transition duration-300 ease-in-out" />
  </div>
  <div className="p-2 border-2 rounded-lg border-gray-300 group hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out">
    <FaConfluence size={30} className="text-blue-100 group-hover:text-black transition duration-300 ease-in-out" />
  </div>
</div>

    </div>
    <hr />
  </li>

  <li className="transition-transform duration-500">
    <hr />
    <div className="timeline-middle">
    <div className="p-4 rounded-full bg-black transition duration-300 hover:bg-white shadow-lg">
    <FaChalkboardTeacher
      size={110} 
      className="text-white transition-colors duration-300 hover:text-black" 
    />
  </div>
</div>   
<div className="timeline-end mb-10 md:text-end border-white p-4 transition-opacity duration-500 hover:opacity-80">
<Link href="https://kenneth-ellington.mykajabi.com/">
    <img src="/images/eca.png" alt="Ellington Cyber Academy" className="w-20 h-20 rounded-full" />
  </Link>
  <p className="font-mono italic text-gray-100 font-bold text-left">Current - 2024</p>
  <div className="text-lg font-black text-gray-100 text-left">SIEM Instructor - Ellington Cyber Academy</div>
  <p className="text-base text-gray-100 text-left">
    Delivered hands-on training in Security Information and Event Management (SIEM) systems with a focus on Splunk. Provided in-depth instruction on threat detection, incident response, and real-world applications using Splunk Enterprise, enhancing technical proficiency and practical skills.
  </p>
  <div className="flex justify-center mt-2">
    <div className="p-2 border-2 rounded-lg border-gray-300 group hover:border-black hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out">
      <SiSplunk size={70} className="text-blue-100 group-hover:text-black transition duration-300 ease-in-out" />
    </div>
  </div>
</div>

  </li>
</ul>
{/* Social Links */}
<div className="flex justify-center items-center">
  <div className="flex space-x-4 mt-4">
    <div className="relative group">
      <a href="https://www.linkedin.com/in/justin-duru-97159a250/" target="_blank" rel="noopener noreferrer">
        <AiFillLinkedin size={20} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
      </a>
      <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
        LinkedIn
      </span>
    </div>

    <div className="relative group">
      <a href="mailto:jduru213@gmail.com" target="_blank" rel="noopener noreferrer">
        <AiFillMail size={20} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
      </a>
      <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
        Email
      </span>
    </div>

    <div className="relative group">
      <a href="https://docs.google.com/document/d/1iUwZ2TQr1kTolBI_w0LW6pcB979RCPIdV0oST8uvP_Y/edit" target="_blank" rel="noopener noreferrer">
        <AiFillFileText size={20} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
      </a>
      <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
        Resume
      </span>
    </div>

    <div className="relative group">
      <a href="https://medium.com/@jduru213" target="_blank" rel="noopener noreferrer">
        <AiFillMediumSquare size={20} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
      </a>
      <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
        Medium
      </span>
    </div>

    <div className="relative group">
      <a href="https://github.com/jduru213-1" target="_blank" rel="noopener noreferrer">
        <FaGithub size={20} className="text-blue-100 hover:text-blue-800 transition-colors duration-300" />
      </a>
      <span className="absolute top-10 left-1/2 transform -translate-x-1/2 w-max opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-black text-sm px-2 py-1 rounded shadow-lg">
        GitHub
      </span>
    </div>
  </div>
</div>

<footer className="flex justify-center items-center mt-10 text-white py-4 text-sm">
        <p>&copy; 2024 TechTrek</p>
      </footer>
</div>
  
  );
};

export default Justin;
