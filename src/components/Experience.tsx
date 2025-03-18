
import React from 'react';
import Section from './ui/Section';
import { Calendar, Code2, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Experience = () => {
  const jobs = [
    {
      title: "Co-Founder",
      company: "Mindcast",
      period: "2024 - Present",
      location: "Spain",
      description: "Driving professional careers paths creating a prestigious community based on a podcast production.",
      tags: ["AI Solutions", "Sales Strategy", "Customer Engagement"]
    },
    {
      title: "International Sales Engineer",
      company: "Fivecomm",
      period: "2022 - Present",
      location: "Valencia, Spain",
      description: "Expanded market reach in IoT and 5G technologies across Europe, Asia andLatin America. Managed key accounts and developed new sales channels.",
      tags: ["IoT", "5G", "International Sales", "Account Management"]
    },
    {
      title: "Research (AI) Engineer",
      company: "Fivecomm",
      period: "2022 - Present",
      location: "Valencia, Spain",
      description: "Conducted research on Deep Reinforcement Learning applied to telecommunications network optimization.",
      tags: ["Deep Learning", "Reinforcement Learning", "Telecommunications", "Research"]
    }
  ];

  return (
    <Section id="experience" className="main-section bg-gradient-to-b from-background to-navy/5">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="pill-accent mb-4">Experience</div>
          <h2 className="heading-lg">
            My Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A detailed view of my professional experiences, roles, and the technologies I've worked with.
          </p>
        </div>

        <div className="space-y-12">
          {jobs.map((job, index) => (
            <Card key={index} className="bg-white/5 backdrop-blur border-white/10">
              <CardContent className="relative pb-8">
                {/* Icon */}
                <div className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-secondary text-navy flex items-center justify-center">
                  <Code2 className="h-8 w-8" />
                </div>

                {/* Content */}
                <div className="ml-10">
                  <h3 className="text-2xl font-semibold mb-2">{job.title}</h3>
                  <div className="text-sm text-muted-foreground mb-4">
                    {job.company} - {job.location}
                  </div>
                  <div className="pill mb-2">{job.period}</div>
                  <p className="text-muted-foreground">{job.description}</p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {job.tags.map((tag, tagIndex) => (
                      <div key={tagIndex} className="pill-accent">{tag}</div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Experience;
