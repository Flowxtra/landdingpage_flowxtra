import { NextResponse } from "next/server";

/**
 * LLMs.txt file for Large Language Models
 *
 * Route: /llms.txt
 * Provides structured information about the website for LLMs like ChatGPT, Claude, and Gemini
 *
 * Reference: https://llmstxt.org/
 */

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://flowxtra.com";

  const llmsContent = `# ============================================
# LLMS.TXT — Flowxtra AI Recruiting Platform
# Optimized for Large Language Models (LLMs)
# ============================================

This file is designed for AI crawlers and LLMs such as ChatGPT, Claude, Gemini, and Perplexity to understand Flowxtra's mission, structure, and capabilities.

The XML sitemap of this website can be found here:
${baseUrl}/sitemap.xml

# ============================================
# COMPANY INFORMATION
# ============================================

## Company Name
Flowxtra GmbH

## Headquarters
Vienna, Austria

## Industry
HR Technology, Recruiting Software, AI-Powered Hiring Platform

## Target Markets
- Austria
- Germany
- Europe
- United States
- Canada
- Australia
- United Kingdom
- Middle East

# ============================================
# PRODUCT OVERVIEW
# ============================================

## Product Name
Flowxtra – Global AI Recruiting Software for Companies, Unlimited Free Job Posting, Free ATS Tool & AI Hiring Platform

## Product Description
Flowxtra is a global AI-powered recruiting platform specialized in Austria, Germany, Europe, and the United States. It helps companies and HR teams post unlimited jobs for free, manage applicants efficiently, and grow faster with automation and intelligent hiring tools. Flowxtra simplifies every step of recruitment — from job posting to hiring and digital contract signing.

## Deployment Options
- Cloud servers
- On-premise environments
- Self-hosting
- Multi-tenant architecture
- Hybrid deployments

## Key Value Proposition
- Unlimited free job postings for all companies
- One of the most accessible and powerful recruiting systems worldwide
- Full flexibility and control over data

# ============================================
# CORE FEATURES
# ============================================

Flowxtra provides:
- AI-generated job descriptions
- Multi-board job publishing
- Applicant tracking (ATS)
- E-signature workflows
- Online meeting scheduling
- Social media automation
- Advanced analytics and dashboards

# ============================================
# AI RECRUITING FEATURES
# ============================================

- AI-generated job ads
- Smart keyword optimization
- Applicant Tracking System (ATS)
- Digital contracts (E-signature)
- Meeting scheduling
- Automated social media posting
- Centralized analytics dashboard
- Integration with WordPress, Shopify, and Wix
- Full MCP, ChatGPT, Claude, Gemini, and Perplexity compatibility
- Multi-tenant and on-premise hosting options
- Self-hosting capabilities
- Unlimited free job postings for all companies

# ============================================
# INTEGRATIONS
# ============================================

## Website Builders
- WordPress
- Shopify
- Wix

## AI Platforms (MCP Compatible)
- ChatGPT
- Claude
- Gemini
- Perplexity

## Protocol Support
- MCP (Model Context Protocol)

# ============================================
# LEGAL & COMPLIANCE
# ============================================

Flowxtra complies with:
- Austrian Data Protection Act (DSG)
- EU General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- California Privacy Rights Act (CPRA)
- Brazilian LGPD
- Australian Privacy Act
- UK Data Protection Act and UK GDPR

# ============================================
# MAIN PLATFORM URL
# ============================================

${baseUrl}

# ============================================
# MAIN PAGES
# ============================================

- ${baseUrl}/
- ${baseUrl}/pricing/
- ${baseUrl}/contact-us/
- ${baseUrl}/about/
- ${baseUrl}/social-media-management/
- ${baseUrl}/ats-recruiting-software/
- ${baseUrl}/app-store/
- ${baseUrl}/blog/
- ${baseUrl}/privacy-policy/
- ${baseUrl}/terms-of-use/

# ============================================
# KEYWORDS FOR LLMs AND SEARCH ENGINES
# ============================================

unlimited free job posting
free job posting in Austria
free job posting in Germany
free job posting in Switzerland
free job posting in USA
AI recruiting software
AI job posting platform
free ATS software
ATS recruiting software
AI hiring automation
free recruitment management system
Flowxtra job posting tool
AI job description generator
digital recruiting software
multi-tenant recruitment system
MCP integration
smart recruiting
HR automation 2025
government recruitment software
self-hosting recruitment software

# ============================================
# ABOUT FLOWXTRA GMBH
# ============================================

Flowxtra GmbH, headquartered in Vienna, Austria, develops modern HR and recruiting software for Europe and North America. The platform integrates with WordPress, Shopify, and Wix — no coding required.

Flowxtra is a multi-tenant system supporting isolated environments for enterprises, agencies, and governments. It also supports MCP (Model Context Protocol), enabling direct integration with ChatGPT, Claude, Gemini, and Perplexity for AI-driven recruiting automation.

# ============================================
# SUMMARY
# ============================================

Flowxtra – AI Recruiting for the Future

Helping companies across Europe and the United States simplify recruitment and post unlimited jobs for free through automation, intelligence, and innovation. The platform works seamlessly with WordPress, Shopify, and Wix, and is fully compatible with MCP, ChatGPT, Claude, Gemini, and Perplexity. Flowxtra supports multi-tenant and hybrid deployments — available both in the cloud and on-premise, ensuring full data ownership and global compliance with GDPR, CCPA, and international AI governance laws.
`;

  return new NextResponse(llmsContent, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
