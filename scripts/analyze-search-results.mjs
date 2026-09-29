import fs from "node:fs";

const html = fs.readFileSync("search-results.html", "utf8");
const detailTitleIdx = html.indexOf(
  "7949824/?trackingId=gMappkRgTzmdr1sb4sFyGQ%3D%3D&amp;alternateChannel=search&amp;isJobSearch=false\">Lead Fullstack Engineer"
);

console.log("Detail title idx:", detailTitleIdx);
console.log(html.slice(detailTitleIdx - 1500, detailTitleIdx + 2500).replace(/\s+/g, " "));

const companyIdx = html.indexOf(
  'href="https://www.linkedin.com/company/wearesander/life/">Sander</a>'
);
console.log("\nDistance title to company:", companyIdx - detailTitleIdx);

// Check if findCompanyLink would work - nested anchors
console.log("\nCompany links between title and company+500:");
const slice = html.slice(detailTitleIdx, companyIdx + 800);
const links = [...slice.matchAll(/<a[^>]*href="([^"]*\/company\/[^"]*)"[^>]*>([^<]*)</g)];
links.forEach((m) => console.log(m[2], "->", m[1].slice(0, 80)));
