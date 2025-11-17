'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getPolicies, POLICY_TYPE_MAP, type Policy } from '@/lib/policiesApi';

// Reverse mapping from Policy Type to route
const TYPE_TO_ROUTE_MAP: Record<string, string> = {
  'DPA': 'dpa',
  'Imprint': 'imprint',
  'Disclaimer': 'disclaimer',
  'Privacy Policy': 'privacy-policy',
  'Cookie Policy': 'cookie-policy',
  'Terms of Use Companies': 'terms-of-use',
  'GDPR': 'gdpr',
  'Ad Quality Guidelines': 'ad-quality-guidelines',
  'Sub processors': 'subprocessors',
};

interface PolicyLink {
  route: string;
  label: string;
  type: string;
}

export default function PoliciesSidebar() {
  const pathname = usePathname();
  const currentLocale = pathname?.startsWith('/de') ? 'de' : 'en';
  
  // Get current policy route from pathname
  const currentRoute = pathname?.split('/').pop() || '';
  
  const [policies, setPolicies] = useState<PolicyLink[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        setLoading(true);
        const response = await getPolicies({
          site: 'flowxtra.com',
          language: currentLocale,
          limit: 100,
        });

        if (response.success && response.data.policies) {
          // Get unique policy types
          const uniqueTypes = new Set<string>();
          response.data.policies.forEach((policy: Policy) => {
            if (policy.status === 'published') {
              uniqueTypes.add(policy.type);
            }
          });

          // Convert to PolicyLink array, only including types that have routes
          const policyLinks: PolicyLink[] = [];
          uniqueTypes.forEach((type) => {
            const route = TYPE_TO_ROUTE_MAP[type];
            if (route) {
              // Get the title from the first policy of this type
              const policy = response.data.policies.find((p: Policy) => p.type === type && p.status === 'published');
              policyLinks.push({
                route,
                label: policy?.title || type,
                type,
              });
            }
          });

          // Sort by the order in POLICY_TYPE_MAP
          const sortedLinks = policyLinks.sort((a, b) => {
            const aIndex = Object.values(POLICY_TYPE_MAP).indexOf(a.type);
            const bIndex = Object.values(POLICY_TYPE_MAP).indexOf(b.type);
            return aIndex - bIndex;
          });

          setPolicies(sortedLinks);
        }
      } catch (error) {
        console.error('Error fetching policies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [currentLocale]);

  return (
    <nav className="flex flex-wrap items-center justify-center gap-2 text-sm">
      {loading ? (
        <span className="text-gray-500 dark:text-gray-400">Loading...</span>
      ) : policies.length === 0 ? (
        <span className="text-gray-500 dark:text-gray-400">No policies available</span>
      ) : (
        policies.map((policy, index) => {
          const isActive = currentRoute === policy.route;
          return (
            <span key={policy.route} className="flex items-center">
              <Link
                href={`/${currentLocale}/${policy.route}`}
                className={`transition-colors ${
                  isActive
                    ? 'text-primary dark:text-[#00A8CD] font-medium'
                    : 'text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-[#00A8CD]'
                }`}
              >
                {policy.label}
              </Link>
              {index < policies.length - 1 && (
                <span className="mx-3 text-gray-400 dark:text-gray-600">|</span>
              )}
            </span>
          );
        })
      )}
    </nav>
  );
}

