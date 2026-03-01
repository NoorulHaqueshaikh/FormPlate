export default function sitemap() {
  const base = "https://formplate.andicode.com";

  const templates = [
    "job-application",
    "internship-application",
    "contact-form",
    "feedback-form",
    "event-registration",
  ];

  return [
    {
      url: base,
      lastModified: new Date(),
    },
    ...templates.map((slug) => ({
      url: `${base}/templates/preview/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
