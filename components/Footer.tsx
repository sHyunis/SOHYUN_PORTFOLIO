import { PROFILE } from "@/lib/data";

export function Footer() {
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Contact</h2>
        <div className="flex flex-col items-center gap-4 mb-12">
          <a href={`mailto:${PROFILE.email}`} className="text-xl text-gray-300 hover:text-white transition-colors">
            {PROFILE.email}
          </a>
        </div>
        
        <div className="flex justify-center gap-8 mb-12">
          {Object.entries(PROFILE.links).map(([key, url]) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white capitalize transition-colors"
            >
              {key}
            </a>
          ))}
        </div>

        <p className="text-sm text-gray-600">
          © {new Date().getFullYear()} {PROFILE.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
