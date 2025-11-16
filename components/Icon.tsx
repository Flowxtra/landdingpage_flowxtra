'use client';

import React from 'react';
import Image from 'next/image';

interface IconProps {
  name: string;
  className?: string;
  style?: React.CSSProperties;
  size?: number;
}

// Map Font Awesome classes to SVG file paths
const iconMap: Record<string, string> = {
  'fas fa-briefcase': '/img/icons/briefcase.svg',
  'fas fa-paper-plane': '/img/icons/paper-plane.svg',
  'fas fa-share-alt': '/img/icons/share-alt.svg',
  'fas fa-calendar-alt': '/img/icons/calendar-alt.svg',
  'fas fa-users': '/img/icons/users.svg',
  'fas fa-headset': '/img/icons/headset.svg',
  'fas fa-shield-alt': '/img/icons/shield-alt.svg',
  'fab fa-google': '/img/icons/google.svg',
  'fas fa-video': '/img/icons/video.svg',
  'fas fa-file-circle-check': '/img/icons/file-circle-check.svg',
  'fas fa-columns': '/img/icons/columns.svg',
  'fas fa-diagram-project': '/img/icons/diagram-project.svg',
  'fas fa-bullhorn': '/img/icons/bullhorn.svg',
  'fas fa-building': '/img/icons/building.svg',
  'fas fa-code': '/img/icons/code.svg',
  'fas fa-plug': '/img/icons/plug.svg',
  'fas fa-shield-halved': '/img/icons/shield-halved.svg',
  'fas fa-book-open': '/img/icons/book-open.svg',
  'fas fa-globe': '/img/icons/globe.svg',
  'fas fa-brain': '/img/icons/brain.svg',
  'fas fa-lock': '/img/icons/lock.svg',
  'fas fa-file-contract': '/img/icons/file-contract.svg',
  'fas fa-envelope': '/img/icons/envelope.svg',
  'fas fa-filter': '/img/icons/filter.svg',
  'fas fa-list-check': '/img/icons/list-check.svg',
  'fas fa-user-shield': '/img/icons/user-shield.svg',
  'fas fa-chart-line': '/img/icons/chart-line.svg',
  'fas fa-puzzle-piece': '/img/icons/puzzle-piece.svg',
  'fas fa-universal-access': '/img/icons/universal-access.svg',
  'fas fa-star': '/img/icons/star.svg',
  'fas fa-palette': '/img/icons/palette.svg',
  'fas fa-envelope-open-text': '/img/icons/envelope-open-text.svg',
  'fas fa-file-lines': '/img/icons/file-lines.svg',
  'fas fa-link': '/img/icons/link.svg',
  'fas fa-database': '/img/icons/database.svg',
  'fas fa-cloud': '/img/icons/cloud.svg',
  'fas fa-tag': '/img/icons/tag.svg',
  'fas fa-route': '/img/icons/route.svg',
  'fas fa-wand-magic-sparkles': '/img/icons/wand-magic-sparkles.svg',
  'fas fa-handshake': '/img/icons/handshake.svg',
  'fas fa-location-dot': '/img/icons/location-dot.svg',
  'fas fa-newspaper': '/img/icons/newspaper.svg',
  'fas fa-share-from-square': '/img/icons/share-from-square.svg',
  'fas fa-user-plus': '/img/icons/user-plus.svg',
  'fas fa-share-nodes': '/img/icons/share-nodes.svg',
  'fas fa-chart-bar': '/img/icons/chart-bar.svg',
  'fas fa-arrow-right-arrow-left': '/img/icons/arrow-right-arrow-left.svg',
  'fas fa-file-export': '/img/icons/file-export.svg',
  'fas fa-file-import': '/img/icons/file-import.svg',
  'fas fa-user-group': '/img/icons/user-group.svg',
};

export default function Icon({ name, className = '', style, size = 16 }: IconProps) {
  const iconPath = iconMap[name];
  
  if (!iconPath) {
    // Fallback: return empty div if icon not found
    console.warn(`Icon not found: ${name}`);
    return <div className={className} style={style} />;
  }

  return (
    <Image
      src={iconPath}
      alt={name}
      width={size}
      height={size}
      className={className}
      style={style}
      unoptimized
      suppressHydrationWarning
    />
  );
}

