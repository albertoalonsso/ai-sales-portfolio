import React from 'react';
import Section from './ui/Section';
import { Calendar, Code2, Target } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const Experience = () => {
  const jobs = [
    {
      title: "AI Sales Engineer",
      company: "Deep Tech Solutions",
      period: "2023 - Present",
      location: "Valencia, Spain",
      description: "Driving sales growth by integrating AI solutions into existing sales processes. Developing custom AI tools to enhance sales strategies and customer engagement.",
      tags: ["AI Solutions", "Sales Strategy", "Customer Engagement"]
    },
    {
      title: "International Sales Manager",
      company: "Global IoT Connect",
      period: "2021 - 2022",
      location: "Remote",
      description: "Expanded market reach in IoT and 5G technologies across Europe and Latin America. Managed key accounts and developed new sales channels.",
      tags: ["IoT", "5G", "International Sales", "Account Management"]
    },
    {
      title: "Research Engineer",
      company: "UPV Research Group",
      period: "2019 - 2021",
      location: "Valencia, Spain",
      description: "Conducted research on Deep Reinforcement Learning applied to telecommunications network optimization. Published papers in top-tier academic journals.",
      tags: ["Deep Learning", "Reinforcement Learning", "Telecommunications", "Research"]
    }
  ];

  return (
    <Section id="experience">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="pill mb-4">Experience</div>
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
