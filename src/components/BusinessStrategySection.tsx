import React from 'react';
import { Truck, PackageCheck, Tags, Megaphone, Flame, ShieldAlert, Award, Compass } from 'lucide-react';

export const BusinessStrategySection: React.FC = () => {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="border-b border-slate-200 pb-4">
        <div className="flex items-center gap-2 text-xs text-emerald-700 font-mono font-semibold uppercase tracking-wider mb-1">
          <span>Phase 09</span>
          <span>·</span>
          <span>Amazon Strategic Operations</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          9. Practical Amazon Business Recommendations &amp; Operational Playbooks
        </h2>
        <p className="text-slate-600 text-sm mt-1 max-w-3xl">
          Concrete execution playbooks across Inventory Planning, Promotional Discounts, Digital Media, Delivery Capacity, and Stock-Out Prevention.
        </p>
      </div>

      {/* 6 Strategy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Pillar 1: Inventory Planning */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700">
            <PackageCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">1. Inventory Planning &amp; Inbound Slotting</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Amazon operates on a Mother-Hub &amp; Satellite FC topology. To handle the 3.8x Diwali surge:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-slate-900 font-semibold">CARP Inbound Scheduling:</strong> Require Tier-1 sellers and vendors to lock in inbound appointments via Carrier Appointment Request Portal at least 21 days before sale kick-off.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Multi-Zonal Placement:</strong> Pre-distribute 40% of inventory into Regional Fulfilment Centers in Bhiwandi (West), Bilaspur (North), and Nelamangala (South) to minimize long-distance line-haul transit times.
            </li>
          </ul>
        </div>

        {/* Pillar 2: Discounts */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-700">
            <Tags className="w-5 h-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">2. Promotional Discount Guardrails</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Preserve seller gross margins while driving conversion via psychological price anchoring:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-slate-900 font-semibold">Tiered Discount Corridors:</strong> Restrict direct listing discounts to 20% for electronics; subsidize additional 10% through co-branded credit card instant discounts (SBI / ICICI Bank tie-ups).
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Flash Deals &amp; Lightning Timers:</strong> Use limited-quantity 2-hour lightning deal drops on high-elasticity items (Fashion &amp; Beauty) to trigger rapid basket checkout without prolonged price degradation.
            </li>
          </ul>
        </div>

        {/* Pillar 3: Advertising */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700">
            <Megaphone className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">3. Advertising &amp; Sponsored Ads Strategy</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Maximize Return on Ad Spend (ROAS) and curb cost-per-click bidding inflation:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-slate-900 font-semibold">Front-Loaded Teaser Budget:</strong> Allocate 35% of campaign ad budget 7 days prior to sale to capture high-intent 'Add to Wishlist' actions before auction CPC bids surge.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Dynamic Dayparting &amp; Bidding:</strong> Automatically increase bids by +30% during evening peak buying hours (7 PM to 11 PM) on Days 1 and 2, then lower non-branded keyword bids by 40% from Day 4 onwards.
            </li>
          </ul>
        </div>

        {/* Pillar 4: Delivery Capacity */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-emerald-700">
            <Truck className="w-5 h-5 text-emerald-600" />
            <h3 className="text-sm font-bold text-slate-900">4. Amazon ATS &amp; Delivery Capacity</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Ensure Next-Day / 2-Day Prime promise delivery reliability under extreme package volume:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-slate-900 font-semibold">Amazon Flex Scaling:</strong> Expand crowd-sourced Amazon Flex delivery associate roster by +35% across Tier-1 and Tier-2 city delivery stations 2 weeks prior to Diwali.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Dedicated Air-Charter Flights:</strong> Secure dedicated Amazon Air Boeing 737 cargo charters on key trunk routes (Delhi–Bengaluru–Mumbai) to prevent passenger airline belly-cargo delays.
            </li>
          </ul>
        </div>

        {/* Pillar 5: High-Demand Products */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-teal-700">
            <Flame className="w-5 h-5 text-teal-600" />
            <h3 className="text-sm font-bold text-slate-900">5. High-Demand Hero Products</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Hero SKUs drive 65% of festive sales traffic and brand reputation:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-slate-900 font-semibold">Pre-Booking &amp; Tokenization:</strong> Introduce ₹1 token pre-booking for flagship smartphones (iPhone, OnePlus, Samsung S-series) to lock in customer demand and gauge exact unit requirements.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Guaranteed Allocation:</strong> Ringfence 70% of high-demand inventory strictly for Prime members in the first 24 hours (Prime Early Access).
            </li>
          </ul>
        </div>

        {/* Pillar 6: Stock-Out Prevention */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 space-y-3 shadow-xs">
          <div className="flex items-center gap-2 text-rose-700">
            <ShieldAlert className="w-5 h-5 text-rose-600" />
            <h3 className="text-sm font-bold text-slate-900">6. Automated Stock-Out Prevention</h3>
          </div>
          <p className="text-xs text-slate-700 leading-relaxed">
            Systematic triggers to eliminate out-of-stock badges on Prime product detail pages:
          </p>
          <ul className="text-xs text-slate-600 space-y-2 list-disc list-inside">
            <li>
              <strong className="text-slate-900 font-semibold">Automated Reorder Point (ROP):</strong> Integrate real-time sales run-rate alarms. If hourly sales velocity exceeds 1.3x forecast, automatically trigger expedited truckloads from reserve warehouses.
            </li>
            <li>
              <strong className="text-slate-900 font-semibold">Vendor Flex Fallback:</strong> Enable direct-from-brand-warehouse fulfillment (Vendor Flex) seamlessly whenever FC on-shelf inventory falls below 15% safety threshold.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
