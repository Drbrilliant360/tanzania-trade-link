import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone, ShieldCheck, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <h3 className="text-lg">JengaHub</h3>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            Tanzania's construction marketplace, connecting professionals with verified materials
            and equipment.
          </p>
        </div>

        <div>
          <h4 className="text-base">Explore</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/category/$slug" params={{ slug: "cement" }} className="hover:text-primary">
                Building Materials
              </Link>
            </li>
            <li>
              <Link to="/equipment" className="hover:text-primary">
                Heavy Equipment
              </Link>
            </li>
            <li>
              <Link to="/professionals" className="hover:text-primary">
                Contractor Profiles
              </Link>
            </li>
            <li>
              <Link to="/sell/onboarding" className="hover:text-primary">
                Sell on JengaHub
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-base">Contact Support</h4>
          <ul className="mt-3 space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" /> support@jengahub.co.tz
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" /> +255 700 000 000
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Dar es Salaam, Tanzania
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-base">Verified Marketplace</h4>
          <div className="mt-3 flex gap-3">
            <span className="flex h-14 w-14 flex-col items-center justify-center rounded-md border border-border text-[10px] font-semibold text-muted-foreground">
              <ShieldCheck className="mb-1 h-5 w-5 text-primary" />
              ISO
            </span>
            <span className="flex h-14 w-14 flex-col items-center justify-center rounded-md border border-border text-[10px] font-semibold text-muted-foreground">
              <Award className="mb-1 h-5 w-5 text-primary" />
              CRB
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-3 px-4 py-6 text-xs text-muted-foreground lg:px-8">
          <p>© 2026 JengaHub Marketplace. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>Vendor Agreement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
