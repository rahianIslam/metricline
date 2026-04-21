// CredentialBadges — APEGA/APEGS trust signals, used on hero sections.
// Uses the .credential-badge utility class defined in globals.css.

export default function CredentialBadges({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {["APEGA Registered", "APEGS Registered"].map((cert) => (
        <span key={cert} className="credential-badge">
          <span className="text-[#C8832A]">●</span>
          {cert}
        </span>
      ))}
    </div>
  );
}
