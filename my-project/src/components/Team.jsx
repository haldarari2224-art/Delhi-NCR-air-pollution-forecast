export default function OurTeam() {
  const team = [
    {
      name: "Vinita Debnath",
      role: "Frontend Developer",
      bio: "Environment Enthusiast | Developer | Learner",
      initials: "VD",
    },
    {
      name: "Teammate Name",
      role: "Designer",
      bio: "Passionate about clean, human-centered design.",
      initials: "TN",
    },
    {
      name: "Teammate Name",
      role: "Researcher",
      bio: "Digs into data so the rest of us don't have to.",
      initials: "TN",
    },
    {
      name: "Teammate Name",
      role: "Content Writer",
      bio: "Turns complex pollution science into plain language.",
      initials: "TN",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Header */}
      <p className="text-green-700 text-sm font-semibold uppercase tracking-wide mb-2 text-center">
        Our Team
      </p>
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-center">
        Meet the People Behind Cleaner Tomorrow
      </h1>
      <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto mb-14">
        A small team united by one goal — helping people understand and act
        on the air they breathe.
      </p>

      {/* Team Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
        {team.map((member, i) => (
          <div
            key={i}
            className="text-center p-6 border border-gray-200 rounded-2xl hover:shadow-md transition"
          >
            <div className="w-20 h-20 mx-auto rounded-full bg-green-700 text-white flex items-center justify-center text-xl font-bold mb-4">
              {member.initials}
            </div>
            <h3 className="font-bold text-gray-900">{member.name}</h3>
            <p className="text-green-700 text-sm font-medium mb-2">
              {member.role}
            </p>
            <p className="text-gray-500 text-sm">{member.bio}</p>
          </div>
        ))}
      </div>

      {/* Team / Org note */}
      <div className="text-center border-t border-gray-200 pt-10">
        <h3 className="font-bold text-gray-900 mb-2">MindMesh</h3>
        <p className="text-gray-600 max-w-xl mx-auto">
          We're a small team of students and developers passionate about
          using technology to solve real environmental problems — built as
          part of our journey to create a cleaner, more informed tomorrow.
        </p>
      </div>
    </div>
  );
}