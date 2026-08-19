import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="relative z-20 bg-[#f5f5f7] text-[#1d1d1f] text-xs leading-normal py-5 border-t border-[#d2d2d7]">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-8">
        
        {/* Top Disclaimer Section */}
        <div className="border-b border-[#d2d2d7] pb-4 mb-4 text-[#86868b] space-y-2">
          <p>
            1. Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an Apple Gift Card.
          </p>
          <p>
            Representative pricing takes into account trade-in values. Additional terms from Apple or Apple’s trade-in partners may apply.
          </p>
        </div>

        {/* Footer Navigation Links Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pb-6 border-b border-[#d2d2d7]">
          
          {/* Column 1 */}
          <div>
            <h3 className="font-semibold text-[#1d1d1f] mb-2">Shop and Learn</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Store</Link></li>
              <li><Link href="#" className="hover:underline">Mac</Link></li>
              <li><Link href="#" className="hover:underline">iPad</Link></li>
              <li><Link href="#" className="hover:underline">iPhone</Link></li>
              <li><Link href="#" className="hover:underline">Watch</Link></li>
              <li><Link href="#" className="hover:underline">AirPods</Link></li>
              <li><Link href="#" className="hover:underline">Accessories</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-semibold text-[#1d1d1f] mb-2">Account</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Manage Your Apple ID</Link></li>
              <li><Link href="#" className="hover:underline">Apple Store Account</Link></li>
              <li><Link href="#" className="hover:underline">iCloud.com</Link></li>
            </ul>
            <h3 className="font-semibold text-[#1d1d1f] mt-4 mb-2">Entertainment</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Apple One</Link></li>
              <li><Link href="#" className="hover:underline">Apple TV+</Link></li>
              <li><Link href="#" className="hover:underline">Apple Music</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-semibold text-[#1d1d1f] mb-2">Apple Store</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Find a Store</Link></li>
              <li><Link href="#" className="hover:underline">Genius Bar</Link></li>
              <li><Link href="#" className="hover:underline">Today at Apple</Link></li>
              <li><Link href="#" className="hover:underline">Group Reservations</Link></li>
              <li><Link href="#" className="hover:underline">Apple Camp</Link></li>
              <li><Link href="#" className="hover:underline">Apple Store App</Link></li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-semibold text-[#1d1d1f] mb-2">For Business</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Apple and Business</Link></li>
              <li><Link href="#" className="hover:underline">Shop for Business</Link></li>
            </ul>
            <h3 className="font-semibold text-[#1d1d1f] mt-4 mb-2">For Education</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Apple and Education</Link></li>
              <li><Link href="#" className="hover:underline">Shop for K-12</Link></li>
              <li><Link href="#" className="hover:underline">Shop for College</Link></li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="font-semibold text-[#1d1d1f] mb-2">Apple Values</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Accessibility</Link></li>
              <li><Link href="#" className="hover:underline">Education</Link></li>
              <li><Link href="#" className="hover:underline">Environment</Link></li>
              <li><Link href="#" className="hover:underline">Supply Chain</Link></li>
            </ul>
            <h3 className="font-semibold text-[#1d1d1f] mt-4 mb-2">About Apple</h3>
            <ul className="space-y-2 text-[#515154]">
              <li><Link href="#" className="hover:underline">Newsroom</Link></li>
              <li><Link href="#" className="hover:underline">Investors</Link></li>
              <li><Link href="#" className="hover:underline">Ethics & Compliance</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-start md:items-center text-[#86868b] gap-2">
          <p>
            Copyright © 2026 Apple Inc. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <Link href="#" className="hover:underline">Privacy Policy</Link>
            <span>|</span>
            <Link href="#" className="hover:underline">Terms of Use</Link>
            <span>|</span>
            <Link href="#" className="hover:underline">Sales Policy</Link>
            <span>|</span>
            <Link href="#" className="hover:underline">Legal</Link>
            <span>|</span>
            <Link href="#" className="hover:underline">Site Map</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}