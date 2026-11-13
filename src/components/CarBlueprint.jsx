export default function CarBlueprint({ className = '' }) {
  const wheels = [240, 700]

  return (
    <svg
      viewBox="0 0 900 330"
      className={className}
      role="img"
      aria-labelledby="blueprint-title"
      preserveAspectRatio="xMidYMid meet"
    >
      <title id="blueprint-title">
        Side elevation of a low pinewood derby car, with weight pockets at the rear, polished
        wheels and a centre-of-mass mark just ahead of the rear axle.
      </title>

      <defs>
        <linearGradient id="bp-wood" x1="0" y1="0" x2="0.25" y2="1">
          <stop offset="0%" stopColor="#eec48d" />
          <stop offset="42%" stopColor="#c98a4b" />
          <stop offset="100%" stopColor="#8a5224" />
        </linearGradient>
        <linearGradient id="bp-stripe" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#7d110c" />
          <stop offset="55%" stopColor="#a5160f" />
          <stop offset="100%" stopColor="#d9342a" />
        </linearGradient>
        <radialGradient id="bp-glow" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#d9342a" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#d9342a" stopOpacity="0" />
        </radialGradient>
        <pattern id="bp-grid" width="30" height="30" patternUnits="userSpaceOnUse">
          <path d="M30 0H0V30" fill="none" stroke="#f7f1e6" strokeOpacity="0.045" strokeWidth="1" />
        </pattern>
      </defs>

      <rect width="900" height="330" fill="#171310" />
      <rect width="900" height="330" fill="url(#bp-grid)" />
      <ellipse cx="470" cy="238" rx="360" ry="80" fill="url(#bp-glow)" />

      {/* speed lines */}
      <g stroke="#f7f1e6" strokeOpacity="0.14" strokeLinecap="round">
        <path d="M70 182h58" />
        <path d="M46 202h74" />
        <path d="M82 222h40" />
      </g>

      {/* track surface */}
      <g className="hidden sm:block">
        <path d="M120 274h640" stroke="#f7f1e6" strokeOpacity="0.12" strokeDasharray="6 10" />
        <text
          x="120"
          y="266"
          fill="#f7f1e6"
          fillOpacity="0.28"
          fontFamily="Barlow Condensed, sans-serif"
          fontSize="9"
          letterSpacing="2.5"
        >
          TRACK SURFACE
        </text>
      </g>

      <ellipse cx="470" cy="272" rx="290" ry="10" fill="#000" opacity="0.35" />

      {/* wheels */}
      {wheels.map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="240" r="30" fill="#0d0a08" stroke="#3b2f25" strokeWidth="2" />
          <circle cx={cx} cy="240" r="22" fill="#241c16" />
          <circle
            cx={cx}
            cy="240"
            r="22"
            fill="none"
            stroke="#c98a4b"
            strokeOpacity="0.3"
            strokeWidth="1"
          />
          {Array.from({ length: 6 }).map((_, index) => {
            const angle = (index * Math.PI) / 3
            return (
              <line
                key={index}
                x1={cx + Math.cos(angle) * 8}
                y1={240 + Math.sin(angle) * 8}
                x2={cx + Math.cos(angle) * 21}
                y2={240 + Math.sin(angle) * 21}
                stroke="#c98a4b"
                strokeOpacity="0.55"
                strokeWidth="1.5"
              />
            )
          })}
          <circle cx={cx} cy="240" r="8" fill="#c98a4b" stroke="#5c381d" strokeWidth="1.5" />
          <circle cx={cx} cy="240" r="2.5" fill="#131010" />
          <path
            d={`M ${cx - 30} 240 A 30 30 0 0 1 ${cx} 210`}
            fill="none"
            stroke="#f7f1e6"
            strokeOpacity="0.2"
            strokeWidth="1.5"
          />
        </g>
      ))}

      {/* body */}
      <g>
        <path
          d="M168 238 L170 212 C171 198 180 188 194 182 L214 176 L228 152 C233 143 245 141 252 149 C261 160 264 174 276 182 L336 192 C388 198 442 200 500 200 C570 200 636 203 690 210 C728 214 758 222 768 230 C774 235 768 238 758 238 Z"
          fill="url(#bp-wood)"
          stroke="#5c381d"
          strokeOpacity="0.65"
          strokeWidth="1.5"
        />
        <path
          d="M190 188 C208 178 218 162 238 150 C250 152 256 164 268 176 L336 186 C400 193 500 195 600 199 C670 202 730 210 760 220"
          fill="none"
          stroke="#f7f1e6"
          strokeOpacity="0.28"
          strokeWidth="2"
        />
        <path
          d="M186 216 C260 202 360 194 440 196 C540 198 640 204 748 218"
          fill="none"
          stroke="url(#bp-stripe)"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M196 226 C280 214 400 208 500 209 C590 210 690 214 754 226"
          fill="none"
          stroke="#f7f1e6"
          strokeOpacity="0.14"
          strokeWidth="1.5"
        />
        <ellipse cx="386" cy="196" rx="44" ry="8" fill="#171310" opacity="0.92" />
        <ellipse cx="386" cy="195" rx="34" ry="4" fill="#2a211b" />

        <circle cx="300" cy="214" r="16" fill="#f7f1e6" />
        <circle cx="300" cy="214" r="16" fill="none" stroke="#131010" strokeOpacity="0.2" />
        <text
          x="300"
          y="219"
          textAnchor="middle"
          fontFamily="Anton, sans-serif"
          fontSize="14"
          fill="#131010"
        >
          07
        </text>
      </g>

      {/* annotations */}
      <g className="hidden sm:block" fontFamily="Barlow Condensed, sans-serif" fontSize="10.5" letterSpacing="1.8">
        {/* dimension */}
        <g stroke="#f7f1e6" strokeOpacity="0.28">
          <path d="M168 58h604" strokeDasharray="5 6" />
          <path d="M168 50v16M772 50v16" />
        </g>
        <text x="470" y="46" textAnchor="middle" fill="#f7f1e6" fillOpacity="0.5">
          7.00 IN · OFFICIAL BLOCK LENGTH
        </text>

        {/* axle centre lines */}
        <g stroke="#f7f1e6" strokeOpacity="0.2" strokeDasharray="3 6">
          <path d="M240 92v186" />
          <path d="M700 92v186" />
        </g>
        <text x="240" y="84" textAnchor="middle" fill="#f7f1e6" fillOpacity="0.42">
          REAR AXLE
        </text>
        <text x="700" y="84" textAnchor="middle" fill="#f7f1e6" fillOpacity="0.42">
          FRONT AXLE
        </text>

        {/* COM */}
        <path d="M327 128v152" stroke="#d9342a" strokeOpacity="0.6" strokeDasharray="4 5" />
        <path d="M327 240l8 8-8 8-8-8z" fill="#d9342a" />
        <text x="327" y="300" textAnchor="middle" fill="#d9342a" fillOpacity="0.9">
          COM · ¾–1 IN AHEAD OF REAR AXLE
        </text>

        {/* tungsten */}
        <g>
          <rect
            x="194"
            y="198"
            width="34"
            height="18"
            rx="2"
            fill="#131010"
            fillOpacity="0.45"
            stroke="#d9342a"
            strokeOpacity="0.55"
            strokeDasharray="3 3"
          />
          <rect
            x="234"
            y="203"
            width="28"
            height="13"
            rx="2"
            fill="#131010"
            fillOpacity="0.45"
            stroke="#d9342a"
            strokeOpacity="0.4"
            strokeDasharray="3 3"
          />
          <path
            d="M194 207H136"
            fill="none"
            stroke="#e9b45f"
            strokeOpacity="0.4"
            strokeDasharray="3 4"
          />
          <text x="48" y="184" fill="#e9b45f" fillOpacity="0.85">
            TUNGSTEN
          </text>
          <text x="48" y="197" fill="#f7f1e6" fillOpacity="0.4">
            LOW &amp; REAR
          </text>
        </g>

        {/* wheel note */}
        <path
          d="M726 258l66 26"
          fill="none"
          stroke="#f7f1e6"
          strokeOpacity="0.25"
          strokeDasharray="3 4"
        />
        <text x="820" y="300" textAnchor="end" fill="#f7f1e6" fillOpacity="0.5">
          POLISHED BORE · 1/16 IN GAP
        </text>

        <text x="50" y="300" fill="#f7f1e6" fillOpacity="0.35">
          MASS 5.00 OZ
        </text>
      </g>
    </svg>
  )
}
