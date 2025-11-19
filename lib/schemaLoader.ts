import homeEn from "../schema/home/en.json";
import homeEnUs from "../schema/home/en-us.json";
import homeEnGb from "../schema/home/en-gb.json";
import homeEnAu from "../schema/home/en-au.json";
import homeEnCa from "../schema/home/en-ca.json";
import homeDe from "../schema/home/de.json";
import homeDeAt from "../schema/home/de-at.json";
import homeDeCh from "../schema/home/de-ch.json";
import homeAr from "../schema/home/ar.json";
import homeFr from "../schema/home/fr.json";
import homeEs from "../schema/home/es.json";
import homeIt from "../schema/home/it.json";
import homeNl from "../schema/home/nl.json";
import pricingEn from "../schema/pricing/en.json";
import pricingEnUs from "../schema/pricing/en-us.json";
import pricingEnGb from "../schema/pricing/en-gb.json";
import pricingEnAu from "../schema/pricing/en-au.json";
import pricingEnCa from "../schema/pricing/en-ca.json";
import pricingDe from "../schema/pricing/de.json";
import pricingDeAt from "../schema/pricing/de-at.json";
import pricingDeCh from "../schema/pricing/de-ch.json";
import pricingFr from "../schema/pricing/fr.json";
import pricingEs from "../schema/pricing/es.json";
import pricingIt from "../schema/pricing/it.json";
import pricingNl from "../schema/pricing/nl.json";
import pricingAr from "../schema/pricing/ar.json";

import freeJobEn from "../schema/free-job-posting/en.json";
import freeJobEnUs from "../schema/free-job-posting/en-us.json";
import freeJobEnGb from "../schema/free-job-posting/en-gb.json";
import freeJobEnAu from "../schema/free-job-posting/en-au.json";
import freeJobEnCa from "../schema/free-job-posting/en-ca.json";
import freeJobFr from "../schema/free-job-posting/fr.json";
import freeJobEs from "../schema/free-job-posting/es.json";
import freeJobIt from "../schema/free-job-posting/it.json";
import freeJobNl from "../schema/free-job-posting/nl.json";
import freeJobDe from "../schema/free-job-posting/de.json";
import freeJobDeAt from "../schema/free-job-posting/de-at.json";
import freeJobDeCh from "../schema/free-job-posting/de-ch.json";
import freeJobAr from "../schema/free-job-posting/ar.json";

import socialEn from "../schema/social-media-management/en.json";
import socialEnUs from "../schema/social-media-management/en-us.json";
import socialEnGb from "../schema/social-media-management/en-gb.json";
import socialEnAu from "../schema/social-media-management/en-au.json";
import socialEnCa from "../schema/social-media-management/en-ca.json";
import socialFr from "../schema/social-media-management/fr.json";
import socialEs from "../schema/social-media-management/es.json";
import socialIt from "../schema/social-media-management/it.json";
import socialNl from "../schema/social-media-management/nl.json";
import socialDe from "../schema/social-media-management/de.json";
import socialDeAt from "../schema/social-media-management/de-at.json";
import socialDeCh from "../schema/social-media-management/de-ch.json";
import socialAr from "../schema/social-media-management/ar.json";

import atsEn from "../schema/ats-recruiting-software/en.json";
import atsEnUs from "../schema/ats-recruiting-software/en-us.json";
import atsEnGb from "../schema/ats-recruiting-software/en-gb.json";
import atsEnAu from "../schema/ats-recruiting-software/en-au.json";
import atsEnCa from "../schema/ats-recruiting-software/en-ca.json";
import atsFr from "../schema/ats-recruiting-software/fr.json";
import atsEs from "../schema/ats-recruiting-software/es.json";
import atsIt from "../schema/ats-recruiting-software/it.json";
import atsNl from "../schema/ats-recruiting-software/nl.json";
import atsDe from "../schema/ats-recruiting-software/de.json";
import atsDeAt from "../schema/ats-recruiting-software/de-at.json";
import atsDeCh from "../schema/ats-recruiting-software/de-ch.json";
import atsAr from "../schema/ats-recruiting-software/ar.json";

type SchemaObject = Record<string, unknown>;
export type SchemaJSON = Record<string, SchemaObject>;

export type PricingSchemaBundle = {
  organization?: SchemaObject;
  breadcrumb?: SchemaObject;
  products?: SchemaObject[];
  faq?: SchemaObject;
};

const homeSchemaMap: Record<string, SchemaJSON> = {
  en: homeEn,
  "en-us": homeEnUs,
  "en-gb": homeEnGb,
  "en-au": homeEnAu,
  "en-ca": homeEnCa,
  fr: homeFr,
  es: homeEs,
  it: homeIt,
  nl: homeNl,
  de: homeDe,
  "de-at": homeDeAt,
  "de-ch": homeDeCh,
  ar: homeAr,
};

const freeJobSchemaMap: Record<string, SchemaJSON> = {
  en: freeJobEn,
  "en-us": freeJobEnUs,
  "en-gb": freeJobEnGb,
  "en-au": freeJobEnAu,
  "en-ca": freeJobEnCa,
  fr: freeJobFr,
  es: freeJobEs,
  it: freeJobIt,
  nl: freeJobNl,
  de: freeJobDe,
  "de-at": freeJobDeAt,
  "de-ch": freeJobDeCh,
  ar: freeJobAr,
};

const socialSchemaMap: Record<string, SchemaJSON> = {
  en: socialEn,
  "en-us": socialEnUs,
  "en-gb": socialEnGb,
  "en-au": socialEnAu,
  "en-ca": socialEnCa,
  fr: socialFr,
  es: socialEs,
  it: socialIt,
  nl: socialNl,
  de: socialDe,
  "de-at": socialDeAt,
  "de-ch": socialDeCh,
  ar: socialAr,
};

const atsSchemaMap: Record<string, SchemaJSON> = {
  en: atsEn,
  "en-us": atsEnUs,
  "en-gb": atsEnGb,
  "en-au": atsEnAu,
  "en-ca": atsEnCa,
  fr: atsFr,
  es: atsEs,
  it: atsIt,
  nl: atsNl,
  de: atsDe,
  "de-at": atsDeAt,
  "de-ch": atsDeCh,
  ar: atsAr,
};

const pricingSchemaMap: Record<string, PricingSchemaBundle> = {
  en: pricingEn as PricingSchemaBundle,
  "en-us": pricingEnUs as PricingSchemaBundle,
  "en-gb": pricingEnGb as PricingSchemaBundle,
  "en-au": pricingEnAu as PricingSchemaBundle,
  "en-ca": pricingEnCa as PricingSchemaBundle,
  fr: pricingFr as PricingSchemaBundle,
  es: pricingEs as PricingSchemaBundle,
  it: pricingIt as PricingSchemaBundle,
  nl: pricingNl as PricingSchemaBundle,
  de: pricingDe as PricingSchemaBundle,
  "de-at": pricingDeAt as PricingSchemaBundle,
  "de-ch": pricingDeCh as PricingSchemaBundle,
  ar: pricingAr as PricingSchemaBundle,
};

function cloneSchema<T>(schema: T): T {
  return JSON.parse(JSON.stringify(schema));
}

function applyPlaceholders<T>(
  value: T,
  replacements: Record<string, string>
): T {
  if (typeof value === "string") {
    let result = value as unknown as string;
    for (const [placeholder, replacement] of Object.entries(replacements)) {
      result = result.split(`{{${placeholder}}}`).join(replacement);
    }
    return result as unknown as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) =>
      applyPlaceholders(item, replacements)
    ) as unknown as T;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).map(
      ([key, nestedValue]) =>
        [key, applyPlaceholders(nestedValue, replacements)] as const
    );
    return Object.fromEntries(entries) as T;
  }

  return value;
}

function buildSchema<T>(
  schemaMap: Record<string, T>,
  locale: string,
  replacements: Record<string, string>
): T {
  const schema = schemaMap[locale] || schemaMap.en;
  const clonedSchema = cloneSchema(schema);
  return applyPlaceholders(clonedSchema, replacements);
}

export function getHomeSchema(
  locale: string,
  replacements: Record<string, string>
): SchemaJSON {
  return buildSchema(homeSchemaMap, locale, replacements);
}

export function getFreeJobPostingSchema(
  locale: string,
  replacements: Record<string, string>
): SchemaJSON {
  return buildSchema(freeJobSchemaMap, locale, replacements);
}

export function getSocialMediaSchema(
  locale: string,
  replacements: Record<string, string>
): SchemaJSON {
  return buildSchema(socialSchemaMap, locale, replacements);
}

export function getAtsRecruitingSchema(
  locale: string,
  replacements: Record<string, string>
): SchemaJSON {
  return buildSchema(atsSchemaMap, locale, replacements);
}

export function getPricingSchema(
  locale: string,
  replacements: Record<string, string>
): PricingSchemaBundle {
  return buildSchema(pricingSchemaMap, locale, replacements);
}
