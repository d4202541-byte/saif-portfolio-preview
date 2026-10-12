export function Icon({ name, size = 24, ...props }) {
  const paths = {
    campaign: (
      <>
        <path d="m4 10 14-6v16L4 14zM18 9h2a3 3 0 0 1 0 6h-2M6 15l1 5h4l-2-4" />
        <path d="M3 10v4" />
      </>
    ),
    tracking: (
      <>
        <path d="M4 18V9m5 9V5m5 13v-7m5 7V3M3 21h18" />
        <circle cx="4" cy="6" r="1" />
        <circle cx="14" cy="8" r="1" />
      </>
    ),
    app: (
      <>
        <rect x="6" y="2.5" width="12" height="19" rx="3" />
        <path d="M10 6h4M11 18h2m-3-5 2-2 2 2" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 5 5M8 11l2 2 4-5" />
      </>
    ),
    conversion: (
      <>
        <path d="M3 5h18l-7 8v6l-4 2v-8z" />
        <path d="M8 8h8" />
      </>
    ),
    shield: (
      <>
        <path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6z" />
        <path d="m8 12 3 3 5-6" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="3" />
        <path d="m3 7 9 6 9-6" />
      </>
    ),
    plus: <path d="M12 5v14M5 12h14" />,
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.check}
    </svg>
  );
}

export function WhatsAppIcon({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M20.5 3.5A11.9 11.9 0 0 0 12 0C5.4 0 .1 5.3.1 11.9c0 2.1.5 4.1 1.6 5.9L0 24l6.3-1.7a12 12 0 0 0 5.7 1.5h.1c6.6 0 11.9-5.3 11.9-11.9 0-3.2-1.2-6.2-3.5-8.4ZM12 21.8a9.8 9.8 0 0 1-5-1.4l-.4-.2-3.7 1 1-3.6-.3-.4a9.9 9.9 0 1 1 18.3-5.3c0 5.5-4.4 9.9-9.9 9.9Zm5.4-7.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2l-1 1.2c-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.5a9.3 9.3 0 0 1-1.8-2.2c-.2-.3 0-.5.1-.6l.5-.6.3-.5c.1-.2 0-.4 0-.5l-1-2.3c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4 0 1.5 1.1 2.8 1.3 3 .1.2 2.1 3.3 5.1 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2.1-1.5.2-.7.2-1.4.2-1.5-.1-.1-.3-.2-.6-.4Z" />
    </svg>
  );
}
