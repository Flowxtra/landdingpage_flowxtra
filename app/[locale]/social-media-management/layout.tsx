import type { Metadata } from "next";

// Generate SEO metadata for Social Media Management page
export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{locale: string}> 
}): Promise<Metadata> {
  const {locale} = await params;
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";
  
  const metadata = {
    en: {
      title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
      description: "Manage and analyze your social channels from one platform. Our Social Media Manager saves time, keeps you organized, and helps grow your online presence.",
      keywords: ["social media management", "social media manager", "social media platform", "social media analytics", "manage social media"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
        description: "Manage and analyze your social channels from one platform. Our Social Media Manager saves time, keeps you organized, and helps grow your online presence.",
        url: `${baseUrl}/en/social-media-management`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/en/social-media-management`,
        languages: {
          'en': `${baseUrl}/en/social-media-management`,
          'de': `${baseUrl}/de/social-media-management`,
        },
      },
    },
    de: {
      title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
      description: "Verwalten und analysieren Sie Ihre Social-Media-Kanäle von einer Plattform aus. Unser Social Media Manager spart Zeit, hält Sie organisiert und hilft Ihnen, Ihre Online-Präsenz zu vergrößern.",
      keywords: ["social media management", "social media manager", "social media plattform", "social media analytics", "social media verwalten"],
      metadataBase: new URL(baseUrl),
      openGraph: {
        title: "Social Media Management – Flowxtra | All-in-One Social Media Manager",
        description: "Verwalten und analysieren Sie Ihre Social-Media-Kanäle von einer Plattform aus. Unser Social Media Manager spart Zeit, hält Sie organisiert und hilft Ihnen, Ihre Online-Präsenz zu vergrößern.",
        url: `${baseUrl}/de/social-media-management`,
        type: "website",
      },
      alternates: {
        canonical: `${baseUrl}/de/social-media-management`,
        languages: {
          'en': `${baseUrl}/en/social-media-management`,
          'de': `${baseUrl}/de/social-media-management`,
        },
      },
    },
  };

  return metadata[locale as keyof typeof metadata] || metadata.en;
}

export default function SocialMediaManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

