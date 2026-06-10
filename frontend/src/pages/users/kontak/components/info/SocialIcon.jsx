export default function SocialIcon({ label, href, children }) {
    return (
        <a
            href={href}
            aria-label={label}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 w-10 items-center justify-center text-white/95 transition hover:scale-[1.04]"
        >
            {children}
        </a>
    );
}