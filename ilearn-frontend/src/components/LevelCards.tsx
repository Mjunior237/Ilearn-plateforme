'use client';

import Link from 'next/link';
import { LucideIcon, ArrowRight } from 'lucide-react';

interface LevelCardProps {
  title: string;
  titleAr: string;
  description: string;
  icon: LucideIcon;
  href: string;
  gradient: string;
  iconEmoji?: string;
  subjects?: { name: string, nameAr: string, icon: string }[];
  delay?: number;
}

export default function LevelCard({
  title,
  titleAr,
  description,
  icon: Icon,
  href,
  gradient,
  iconEmoji,
  subjects,
  delay = 0,
}: LevelCardProps) {
  return (
    <div 
      className="group animate-scale-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <Link href={href}>
        <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${gradient} p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white rounded-full translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="relative z-10">
            {/* Icon */}
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
              {iconEmoji ? (
                <span className="text-3xl">{iconEmoji}</span>
              ) : (
                <Icon className="w-8 h-8 text-white" />
              )}
            </div>

            {/* Title */}
            <h3 className="text-2xl font-bold text-white mb-1">
              {title}
            </h3>
            <p className="text-white/90 text-base mb-3 font-medium">
              {titleAr}
            </p>

            {/* Description */}
            <p className="text-white/80 text-sm mb-4 leading-relaxed">
              {description}
            </p>

            {/* Subjects Preview */}
            {subjects && subjects.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {subjects.slice(0, 4).map((subject, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs text-white font-medium"
                  >
                    <span className="text-sm">{subject.icon}</span>
                    <span>{subject.name}</span>
                  </div>
                ))}
                {subjects.length > 4 && (
                  <div className="flex items-center px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs text-white font-medium">
                    +{subjects.length - 4} more
                  </div>
                )}
              </div>
            )}

            {/* Arrow Indicator */}
            <div className="mt-6 flex items-center gap-2 text-white font-semibold group-hover:gap-3 transition-all">
              <span>Explore</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}