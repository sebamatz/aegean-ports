import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getPortByDomain } from "@/lib/ports.config";

export function proxy(request: NextRequest) {
  const host = request.headers.get("host");
  let port = getPortByDomain(host);

  // If domain is not mapped → default to JMK (Mykonos)
  if (!port) {
    port = { key: "JMK" } as any;
  }

  const url = request.nextUrl.clone();
  const path = url.pathname;

  // Normalize the key to uppercase for consistent routing
  const portKey = port.key.toUpperCase();

  // If path doesn't already contain port code → inject it
  if (!path.startsWith(`/${portKey}`)) {
    url.pathname = `/${portKey}${path}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  // FIX: Added "|sitemap.xml" to the exclusion list.
  // Now the proxy will ignoring rewriting this file, allowing app/sitemap.xml/route.ts to handle it.
  matcher: [
    "/((?!_next/static|_next/image|images|favicon.ico|robots.txt|sitemap.xml|seobilityverify_8521323.html).*)",
  ],
};
