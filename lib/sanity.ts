import { createClient } from "next-sanity";

// 1. Configure the Client
// Gracefully handle missing env vars to avoid build/runtime errors
const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const client = projectId
  ? createClient({
      projectId,
      dataset,
      apiVersion: "2023-05-03",
      useCdn: false,
    })
  : null;

// 2. The Query to find the Active Numbers
// We fetch ALL contact options and filter them in the component to be safe
export const contactQuery = `*[_type == "contactOptions" && isActive == true] {
  title,
  phoneNumber,
  numberType
}`;
