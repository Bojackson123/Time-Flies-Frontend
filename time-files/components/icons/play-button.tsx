export default function PlayButton(props: { className?: string }) {
  return (
    <svg className={props.className} width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_b_7606_575)">
        <path d="M60 0C26.88 0 0 26.88 0 60C0 93.12 26.88 120 60 120C93.12 120 120 93.12 120 60C120 26.88 93.12 0 60 0ZM51.2 84.6C49.8815 85.5889 48 84.6481 48 83V37C48 35.3519 49.8815 34.4111 51.2 35.4L81.8667 58.4C82.9333 59.2 82.9333 60.8 81.8667 61.6L51.2 84.6Z" fill="url(#paint0_linear_7606_575)" fillOpacity="0.6" />
      </g>
      <defs>
        <filter id="filter0_b_7606_575" x="-11.9" y="-11.9" width="143.8" height="143.8" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="5.95" />
          <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_7606_575" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_7606_575" result="shape" />
        </filter>
        <linearGradient id="paint0_linear_7606_575" x1="0" y1="0" x2="122.018" y2="7.76221" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6DD3F5" />
          <stop offset="1" stopColor="#6455F0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
