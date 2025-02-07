import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    id: 1,
    title: "STADPASS - Stadium Navigation App",
    image: "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/STADPASS.jpeg?raw=true",
    description: "A mobile app designed to help users navigate stadiums using Bluetooth Low Energy (BLE) technology.",
    features: [
      "Real-time indoor navigation using BLE beacons.",
      "Interactive stadium maps with points of interest.",
      "Seamless integration with ticketing systems.",
      "User-friendly interface for quick wayfinding.",
      "In-app food purchase with real-time booth owner notifications"
    ],
  },
  {
    id: 2,
    title: "Observer KPU - Election Web App with LLM",
    image: "https://github.com/MatthewsWongOfficial/portofolio-images-bucket/blob/main/Observer%20KPU.jpeg?raw=true",
    description: "An all-in-one election news resource with automated web scraping and an AI chatbot tuned with election and candidate data.",
    features: [
      "Automated web scraping for real-time election news.",
      "AI chatbot powered by a fine-tuned Large Language Model (LLM).",
      "Comprehensive candidate and election data analysis.",
      "User-friendly dashboard for election insights.",
    ],
  },
];

const otherProjects = [
  {
    id: 3,
    title: "Credit Risk Analysis and Prediction Modeling with XGBoost",
    description: "Developed a comprehensive credit risk analysis using advanced XGBoost modeling techniques.",
    features: [
      "Built predictive models for risk assessment and mitigation.",
      "Delivered actionable insights through data visualization.",
      "Enhanced financial performance through strategic risk management.",
      "Conducted exploratory data analysis (EDA) to uncover key patterns and trends",
      "Skills: Exploratory Data Analysis, Data Modeling, XGBoost, Python.",
    ],
  },
  {
    id: 4,
    title: "Security Onion - Network Monitoring with Zeek",
    description: "Enhanced network security by deploying and configuring Security Onion for intrusion detection and log management.",
    features: [
      "Deployed Security Onion on a cloud server for network monitoring.",
      "Simulated network attacks (HTTP load tests, SSH brute force, DoS).",
      "Analyzed logs and alerts to identify attack patterns.",
      "Provided actionable insights to strengthen network defenses.",
      "Automated log parsing and Webhook Alert to Discord",
      "Skills: Security Onion, SIEM, Network Traffic Analysis, Log Analysis.",
    ],
  },
];

export default function Project() {
  return (
    <section id="projects" className="min-h-screen py-12 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-purple-500/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900/0 via-slate-900/80 to-slate-900" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#080808_1px,transparent_1px),linear-gradient(to_bottom,#080808_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50" />

      <div className="container mx-auto px-4 relative">
        {/* Section Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold text-center mb-10 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Featured Projects
          </span>
        </motion.h2>

        {/* Featured Projects */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative w-full md:w-4/5 mx-auto group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              {/* Main card container */}
              <div className="relative rounded-xl overflow-hidden bg-slate-900/40 backdrop-blur-md border border-white/10">
                {/* Image container */}
                <div className="relative pb-[150%]">
                  <Image
                    src={project.image}
                    alt={project.title}
                    layout="fill"
                    className="transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                
                {/* Content container */}
                <div className="p-4 relative bg-gradient-to-b from-slate-900/80 to-slate-900/95 backdrop-blur-sm h-[493px] overflow-hidden">
                  {/* Subtle top border */}
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  
                  <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-300 mb-4 text-base leading-relaxed">{project.description}</p>
                  {project.features && (
                    <>
                      <h4 className="text-lg font-semibold mb-2 text-indigo-400">Main Features:</h4>
                      <ul className="list-none text-slate-200 text-base space-y-2">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start hover:text-blue-300 transition-colors duration-300">
                            <span className="text-indigo-400 mr-2">•</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Other Projects */}
        <motion.h3
          className="text-3xl md:text-4xl font-extrabold mb-6 text-center tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
            Other Projects
          </span>
        </motion.h3>
        
        <div className="grid md:grid-cols-2 gap-6">
          {otherProjects.map((project, index) => (
            <motion.div
              key={project.id}
              className="relative w-full md:w-4/5 mx-auto group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur opacity-0 group-hover:opacity-100 transition duration-500"></div>
              
              {/* Card container */}
              <div className="relative rounded-xl bg-slate-900/40 backdrop-blur-md p-4 border border-white/10 h-[520px] overflow-hidden">
                <h3 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-100 leading-tight">
                  {project.title}
                </h3>
                <p className="text-slate-300 mb-4 text-base leading-relaxed">{project.description}</p>
                {project.features && (
                  <>
                    <h4 className="text-lg font-semibold mb-2 text-indigo-400">Key Highlights:</h4>
                    <ul className="list-none text-slate-200 text-base space-y-2">
                      {project.features.map((feature, featureIndex) => (
                        <li 
                          key={featureIndex} 
                          className="flex items-start hover:text-blue-300 transition-colors duration-300"
                        >
                          <span className="text-indigo-400 mr-2">•</span> {feature}
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}