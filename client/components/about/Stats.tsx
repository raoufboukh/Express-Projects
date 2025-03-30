import { about } from "../constants";

const Stats = () => {
  return (
    <div className="container mx-auto lg:px-20 px-4">
      <div className="bg-[#0A1F44] text-white rounded-lg p-10 shadow-md flex flex-col items-center">
        <h3 className="text-4xl font-bold mb-6 text-center">Why Choose Us?</h3>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {about.map(({ label, value, description, color }, index) => {
            const radius = 35;
            const strokeWidth = 6;
            const circumference = 2 * Math.PI * radius;
            const strokeDashoffset =
              circumference - (value / 100) * circumference;

            return (
              <div
                key={index}
                className="flex flex-col items-center text-center"
              >
                <svg width="90" height="90">
                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke="rgba(255,255,255,0.3)"
                    strokeWidth={strokeWidth}
                    fill="none"
                  />

                  <circle
                    cx="45"
                    cy="45"
                    r={radius}
                    stroke={color}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform="rotate(-90 45 45)"
                  />
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".3em"
                    fontSize="16px"
                    fill={color}
                    fontWeight="bold"
                  >
                    {value}%
                  </text>
                </svg>
                <p className="mt-2 font-semibold">{label}</p>
                <p className="text-sm opacity-75">{description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Stats;
