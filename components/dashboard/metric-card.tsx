'use client';

import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type ColorVariant = 'indigo' | 'green' | 'amber' | 'blue';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  color?: ColorVariant;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

const colorVariants: Record<ColorVariant, { bg: string; icon: string; ring: string }> = {
  indigo: {
    bg: 'bg-indigo-50',
    icon: 'text-indigo-600',
    ring: 'ring-indigo-100',
  },
  green: {
    bg: 'bg-emerald-50',
    icon: 'text-emerald-600',
    ring: 'ring-emerald-100',
  },
  amber: {
    bg: 'bg-amber-50',
    icon: 'text-amber-600',
    ring: 'ring-amber-100',
  },
  blue: {
    bg: 'bg-sky-50',
    icon: 'text-sky-600',
    ring: 'ring-sky-100',
  },
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  color = 'indigo',
  trend,
  className,
}: MetricCardProps) {
  const colors = colorVariants[color];

  return (
    <Card className={cn(
      'overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-200',
      className
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-3xl font-bold tracking-tight text-gray-900">{value}</p>
              {trend && (
                <span
                  className={cn(
                    'text-xs font-semibold px-2 py-0.5 rounded-full',
                    trend.isPositive 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-red-100 text-red-700'
                  )}
                >
                  {trend.isPositive ? '+' : ''}{trend.value}%
                </span>
              )}
            </div>
            {subtitle && (
              <p className="text-sm text-gray-400">{subtitle}</p>
            )}
          </div>
          <div className={cn(
            'rounded-xl p-3 ring-4',
            colors.bg,
            colors.ring
          )}>
            <Icon className={cn('h-6 w-6', colors.icon)} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
