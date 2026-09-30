import "./birds.css";

// y = height in the hero, s = size (smaller reads as further away), t = seconds to cross, d = start offset (negative = already in flight), f = wingbeat
const flock = [
  { y: "9%", s: 1, t: 34, d: -6, f: "0.85s" },
  { y: "13%", s: 0.8, t: 34, d: -7.2, f: "0.95s" },
  { y: "6%", s: 0.7, t: 34, d: -8.3, f: "0.8s" },
  { y: "27%", s: 0.6, t: 46, d: -22, f: "1s" },
  { y: "31%", s: 0.5, t: 46, d: -23.4, f: "0.9s" },
];

const UP = "M2 12 Q9 1 16 12 Q23 1 30 12";
const MID = "M2 12 Q9 8 16 12 Q23 8 30 12";
const DOWN = "M2 12 Q9 21 16 12 Q23 21 30 12";

export default function Birds() {
  return (
    <div className="birds" aria-hidden="true">
      {flock.map((b, i) => (
        <svg
          key={i}
          className="bird"
          viewBox="0 0 32 24"
          style={{
            ["--y" as string]: b.y,
            ["--s" as string]: b.s,
            ["--t" as string]: `${b.t}s`,
            ["--d" as string]: `${b.d}s`,
          }}
        >
          <path
            d={UP}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="d"
              dur={b.f}
              repeatCount="indefinite"
              values={`${UP};${MID};${DOWN};${MID};${UP}`}
            />
          </path>
          <circle cx="16" cy="12" r="1.7" fill="currentColor" />
        </svg>
      ))}
    </div>
  );
}
