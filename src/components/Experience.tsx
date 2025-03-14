
import React from 'react';
import Section from './ui/Section';
import { Briefcase, Award, Globe, CheckCircle } from 'lucide-react';
import { Card, CardContent } from './ui/Card';

const Experience = () => {
  const achievements = [
    { 
      icon: <Globe className="h-5 w-5" />,
      title: "International Market Expansion",
      description: "Led expansion into 3 new European markets, increasing international revenue by 35%"
    },
    { 
      icon: <CheckCircle className="h-5 w-5" />,
      title: "Agile Implementation",
      description: "Successfully implemented Agile/Scrum methodologies for international sales projects"
    },
    { 
      icon: <Award className="h-5 w-5" />,
      title: "Client Success",
      description: "Managed key accounts resulting in 95% client retention rate and 40% expansion revenue"
    }
  ];

  const skills = [
    "Strategic B2B Sales", "IoT Solutions", "5G Technology", 
    "AI Integration", "Financial Analysis", "Market Research",
    "Sales Pipeline Management", "International Negotiations", "Technical Presentations"
  ];

  return (
    <Section id="experience" className="bg-secondary/50">
      <div className="pill mb-4">Professional Experience</div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <h2 className="heading-lg">
          Fivecomm <span className="text-gradient">Experience</span>
        </h2>
        <div className="pill-accent">2021 - Present</div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="h-full">
            <CardContent className="p-0">
              <div className="relative p-8">
                <div className="pill mb-4">Role</div>
                <h3 className="text-2xl font-semibold mb-4">International Sales</h3>
                <p className="text-muted-foreground mb-6">
                  As part of the International Sales team at Fivecomm, I've been responsible for expanding the company's 
                  IoT and 5G solutions into new European markets. My role combines technical expertise in advanced 
                  telecommunications with strategic sales methodologies.
                </p>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Key Responsibilities:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-navy shrink-0 mt-0.5" />
                      <span>Develop and execute international sales strategies for IoT and 5G solutions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-navy shrink-0 mt-0.5" />
                      <span>Conduct technical demonstrations and proof-of-concept implementations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-navy shrink-0 mt-0.5" />
                      <span>Collaborate with engineering teams to customize solutions for client needs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-navy shrink-0 mt-0.5" />
                      <span>Implement Agile/Scrum methodologies for sales project management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-navy shrink-0 mt-0.5" />
                      <span>Analyze market trends and competitor landscape to refine value propositions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-navy" />
                </div>
                <h3 className="text-lg font-medium">Key Achievements</h3>
              </div>
              
              <div className="space-y-4">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center text-navy shrink-0 mt-0.5">
                      {achievement.icon}
                    </div>
                    <div>
                      <h4 className="font-medium">{achievement.title}</h4>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-navy/10 flex items-center justify-center">
                  <Briefcase className="h-5 w-5 text-navy" />
                </div>
                <h3 className="text-lg font-medium">Skills & Expertise</h3>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-4">
                {skills.map((skill, index) => (
                  <div key={index} className="pill">{skill}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Experience;

import { Trophy } from 'lucide-react';
