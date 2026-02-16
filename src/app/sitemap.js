export default function sitemap() {
  const base = "https://form-plate.vercel.app";

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
    {
      url: `${base}/templates`,
      lastModified: new Date(),
    },
    ...templates.map((slug) => ({
      url: `${base}/templates/preview/${slug}`,
      lastModified: new Date(),
    })),
  ];
}
