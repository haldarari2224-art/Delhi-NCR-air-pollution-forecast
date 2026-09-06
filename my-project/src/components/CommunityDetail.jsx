import { Link } from "react-router-dom";

const communityData = [
  {
    id: 1,
    icon: "🌱",
    title: "Tree Plantation Drives",
    description: "Plant trees to help increase green cover in your community.",
    content:
      "Tree plantation drives help increase Delhi's green cover, which naturally filters pollutants from the air and reduces the urban heat-island effect. Every tree planted absorbs CO₂ and other harmful gases while providing shade that lowers surrounding temperatures.",
    buttonText: "Find Drives",
    details: [
      { icon: "📍", title: "Upcoming Drive", desc: "Community park plantation this Saturday, 8 AM." },
      { icon: "🌳", title: "Why It Helps", desc: "One mature tree can absorb up to 22kg of CO₂ per year." },
      { icon: "🧤", title: "What to Bring", desc: "Gloves, water bottle, and comfortable clothing." },
      { icon: "👥", title: "Volunteers Needed", desc: "Open to individuals, families, and groups." },
    ],
  },
  {
    id: 2,
    icon: "🫁",
    title: "Clean Air Campaigns",
    description: "Be part of awareness campaigns and spread the word.",
    content:
      "Clean air campaigns educate people about air pollution and encourage behavior changes that reduce emissions. From social media awareness drives to community events, these campaigns play a key role in building public pressure for cleaner air.",
    buttonText: "View Campaigns",
    details: [
      { icon: "🎯", title: "Active Campaign", desc: "\"No Crackers This Diwali\" — running now." },
      { icon: "📱", title: "Share Online", desc: "Spread awareness through social media posts." },
      { icon: "🏫", title: "School Sessions", desc: "Organize awareness talks at local schools." },
      { icon: "📊", title: "Past Impact", desc: "Previous campaigns reached over 50,000 people." },
    ],
  },
  {
    id: 3,
    icon: "📋",
    title: "Volunteer",
    description: "Volunteer your time and skills to support clean air initiatives.",
    content:
      "Volunteers are the backbone of every clean-air initiative. Whether you have a few hours a week or want to commit to a long-term role, there's a place for your skills — from fieldwork to digital outreach to data collection.",
    buttonText: "Volunteer Now",
    details: [
      { icon: "🌳", title: "Field Volunteer", desc: "Assist with tree plantation and clean-up drives." },
      { icon: "💻", title: "Digital Volunteer", desc: "Help with social media and content creation." },
      { icon: "📅", title: "Event Coordinator", desc: "Organize and manage local campaigns." },
      { icon: "📈", title: "Data Collector", desc: "Support AQI monitoring and reporting efforts." },
    ],
  },
  {
    id: 4,
    icon: "🏛️",
    title: "Support Green Policies",
    description: "Support policies and actions that promote clean air for all.",
    content:
      "Citizens can influence real change at the policy level. Supporting stricter emission norms, EV adoption incentives, and expanded GRAP measures helps push long-term solutions that individual action alone cannot achieve.",
    buttonText: "Learn More",
    details: [
      { icon: "🚗", title: "Emission Norms", desc: "Support stricter vehicle emission regulations." },
      { icon: "⚡", title: "EV Incentives", desc: "Back subsidies that make EVs more affordable." },
      { icon: "✍️", title: "Sign Petitions", desc: "Add your voice to active clean-air petitions." },
      { icon: "📢", title: "Contact Representatives", desc: "Email local leaders about air quality concerns." },
    ],
  },
]
const CommunityDetail = () => {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Community Details</h1>
      {communityData.map((item) => (
        <div key={item.id} style={{ border: "1px solid #ccc", margin: "10px 0", padding: "10px" }}>
          <h2>{item.icon} {item.title}</h2>
          <p>{item.description}</p>
          <button>{item.buttonText}</button>
        </div>
      ))}
    </div>
  );
};
export default CommunityDetail;