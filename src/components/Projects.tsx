
import React, { useState } from 'react';
import Section from '@/components/ui/Section';
import { ArrowRight } from 'lucide-react';
import Button from './ui/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Brain, Network, BookOpen } from 'lucide-react';

const Projects = () => {
  const [activeTab, setActiveTab] = useState('ai');

  const projects = {
    ai: {
      title: "Optimizing Investment Strategies with Deep Reinforcement Learning",
      subtitle: "Master Thesis in Artificial Intelligence",
      description: `
        This research project focused on the development of an advanced deep reinforcement learning 
        system that can extract valuable signals from corporate earnings conference calls and use 
        them to optimize investment strategies.
      `,
      methodology: [
        "Natural Language Processing for text analysis of conference calls",
        "Feature extraction and sentiment analysis",
        "Implementation of DQN and A2C reinforcement learning algorithms",
        "Optimization of risk-adjusted returns using custom reward functions",
        "Backtesting against traditional financial models"
      ],
      results: "The developed model demonstrated a 23% improvement in risk-adjusted returns over traditional strategies, with significantly reduced drawdowns during market volatility.",
      technologies: ["TensorFlow", "PyTorch", "NLP", "DQN", "A2C", "Financial Modeling"],
      icon: <Brain className="h-6 w-6" />
    },
    telecom: {
      title: "Deep Reinforcement Learning for Cell-Free Massive MIMO Networks",
      subtitle: "Master Thesis in Telecommunications Engineering",
      description: `
        This project explored the application of deep reinforcement learning to optimize resource 
        allocation in Cell-Free Massive MIMO networks, an emerging architecture for beyond 5G 
        systems.
      `,
      methodology: [
        "Development of a realistic Cell-Free Massive MIMO network simulation",
        "Implementation of multi-agent reinforcement learning approach",
        "Dynamic optimization of user association and power allocation",
        "Comparative analysis with centralized optimization methods",
        "Evaluation of network throughput, fairness, and energy efficiency"
      ],
      results: "The proposed solution achieved 35% higher network throughput while maintaining fairness among users and reducing energy consumption by 27% compared to baseline approaches.",
      technologies: ["Deep Learning", "Reinforcement Learning", "5G Networks", "MIMO", "Network Optimization"],
      icon: <Network className="h-6 w-6" />
    }
  };

  const activeProject = activeTab === 'ai' ? projects.ai : projects.telecom;

  return (
    <Section id="projects">
      <div className="pill mb-4">Research Projects</div>
      <h2 className="heading-lg mb-8">
        Featured <span className="text-gradient">Research</span>
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Project Tabs */}
        <div className="lg:w-1/4">
          <div className="sticky top-24 space-y-4">
            <h3 className="text-lg font-medium mb-4">Project Categories</h3>
            
            <button
              className={`flex items-center gap-3 w-full rounded-lg p-4 transition-all text-left ${
                activeTab === 'ai' 
                  ? 'bg-navy text-white' 
                  : 'bg-secondary/70 text-foreground hover:bg-secondary'
              }`}
              onClick={() => setActiveTab('ai')}
            >
              <Brain className="h-5 w-5" />
              <div>
                <p className="font-medium">AI Research</p>
                <p className="text-sm opacity-80">Finance & RL</p>
              </div>
            </button>
            
            <button
              className={`flex items-center gap-3 w-full rounded-lg p-4 transition-all text-left ${
                activeTab === 'telecom' 
                  ? 'bg-navy text-white' 
                  : 'bg-secondary/70 text-foreground hover:bg-secondary'
              }`}
              onClick={() => setActiveTab('telecom')}
            >
              <Network className="h-5 w-5" />
              <div>
                <p className="font-medium">Telecom Research</p>
                <p className="text-sm opacity-80">5G Networks</p>
              </div>
            </button>
          </div>
        </div>
        
        {/* Project Content */}
        <div className="lg:w-3/4">
          <Card className="overflow-hidden border-none shadow-lg">
            <div className="relative h-40 bg-gradient-to-r from-navy to-navy/70">
              <div className="absolute inset-0 flex items-center px-8 text-white">
                <div>
                  <div className="pill bg-white/20 text-white mb-2">Research Project</div>
                  <h3 className="text-2xl font-semibold">{activeProject.title}</h3>
                </div>
              </div>
            </div>
            
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center text-navy">
                  {activeProject.icon}
                </div>
                <div>
                  <CardTitle>{activeProject.subtitle}</CardTitle>
                  <CardDescription>Advanced Research Project</CardDescription>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div>
                <h4 className="font-medium mb-2">Project Overview</h4>
                <p className="text-muted-foreground">{activeProject.description}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Methodology</h4>
                <ul className="space-y-2">
                  {activeProject.methodology.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <ArrowRight className="h-4 w-4 text-navy shrink-0 mt-1" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Key Results</h4>
                <p className="text-muted-foreground">{activeProject.results}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Technologies</h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.technologies.map((tech, index) => (
                    <div key={index} className="pill">{tech}</div>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4">
              <Button 
                variant="secondary" 
                className="ml-auto"
                onClick={() => window.open('#', '_blank')}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                View Research Paper
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </Section>
  );
};

export default Projects;
