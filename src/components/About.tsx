
import React from 'react';
import Section from './ui/Section';
import { Book, GraduationCap, Lightbulb, Users, Github, Cloud, Code, Database, Cpu, Server, Activity, Box, Globe } from 'lucide-react';

const About = () => {
  const education = [
    {
      degree: "Master in Artificial Intelligence",
      institution: "Universidad Internacional de La Rioja (UNIR)",
      period: "2024 - 2025"
    },
    {
      degree: "Master in Electronic Systems",
      institution: "Universitat Politècnica de València (UPV)",
      period: "2023 - 2024"
    },
    {
      degree: "Master in Telecommunications Engineering",
      institution: "Universitat Politècnica de València (UPV)",
      period: "2022 - 2024"
    },
    {
      degree: "Bachelor in Telecommunications Engineering",
      institution: "Universitat Politècnica de València (UPV)",
      period: "2018 - 2022"
    }
  ];

  const technologies = [
    { name: "GitHub", icon: <Github className="h-8 w-8" /> },
    { name: "AWS", icon: <Cloud className="h-8 w-8" /> },
    { name: "Python", icon: <Code className="h-8 w-8" /> },
    { name: "MongoDB", icon: <Database className="h-8 w-8" /> },
    { name: "NVIDIA", icon: <Cpu className="h-8 w-8" /> },
    { name: "Flask", icon: <Server className="h-8 w-8" /> },
    { name: "N8N", icon: <Activity className="h-8 w-8" /> },
    { name: "LangChain", icon: <Box className="h-8 w-8" /> },
    { name: "Azure", icon: <Globe className="h-8 w-8" /> },
  ];

  return (
    <Section id="about" className="main-section bg-gradient-to-b from-background to-navy/5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="pill-accent mb-4">About Me</div>
          <h2 className="heading-lg mb-6">
            Bridging Technology, <br />
            <span className="text-gradient">Finance and Sales</span>
          </h2>
          
          <div className="space-y-6 text-muted-foreground">
            <p>
              As a Sales AI Engineer, I operate at the intersection of cutting-edge artificial intelligence, 
              financial analytics, and technology sales. My background combines technical expertise with 
              business acumen, allowing me to develop and implement innovative AI solutions that drive 
              real-world commercial results.
            </p>
            <p>
              My research has focused on applying Deep Reinforcement Learning to financial markets and 
              telecommunications optimization. This expertise transfers seamlessly to my professional role, 
              where I help businesses leverage AI to transform their sales strategies and financial operations.
            </p>
            <p>
              With experience in international sales for IoT and 5G technologies, I bring a unique perspective 
              that bridges the gap between complex technical solutions and business value propositions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-6 mt-10">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-navy" />
                <h3 className="font-medium">Collaborative</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Thrives in cross-functional teams, combining technical and business perspectives
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-navy" />
                <h3 className="font-medium">Innovative</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Develops creative AI applications with practical business applications
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-navy" />
                <h3 className="font-medium">Research-Oriented</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Applies academic rigor to solve complex business challenges
              </p>
            </div>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-navy" />
                <h3 className="font-medium">Continuous Learner</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Constantly expanding knowledge in AI/ML and financial technologies
              </p>
            </div>
          </div>
        </div>
        
        <div>
          <div className="pill-accent mb-4">Education</div>
          <h2 className="heading-md mb-6">Academic Background</h2>
          
          <div className="relative pl-8 border-l border-border">
            {education.map((item, index) => (
              <div 
                key={index} 
                className="mb-10 relative"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute -left-[28px] w-10 h-10 rounded-full flex items-center justify-center bg-secondary">
                  <GraduationCap className="h-4 w-4 text-navy" />
                </div>
                <div className="pill mb-2">{item.period}</div>
                <h3 className="text-lg font-semibold">{item.degree}</h3>
                <p className="text-muted-foreground">{item.institution}</p>
              </div>
            ))}
          </div>
          
          {/* Technologies section with updated techs */}
          <div className="mt-10">
            <div className="pill-accent mb-4">Technologies</div>
            <h2 className="heading-md mb-6">Tools & Platforms</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {technologies.map((tech, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="w-16 h-16 rounded-xl bg-secondary flex items-center justify-center">
                    {tech.icon}
                  </div>
                  <span className="text-sm font-medium">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default About;
