import fs from "node:fs";
import { parseHTML } from "linkedom";

const html = fs.readFileSync("search-results.html", "utf8");
const { document } = parseHTML(html);

function collapseText(text) {
  return text.trim().replace(/\s+/g, " ");
}

function normalizeCompanyName(name) {
  return name
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, " ");
}

function isInsideListJobCard(element) {
  return element.closest('[componentkey^="job-card-component-ref-"]') !== null;
}

function parseEntrepriseAriaLabel(label) {
  if (!label) return null;
  const match = label.match(/entreprise,?\s*(.+?)\.?$/i);
  return match ? collapseText(match[1]) : null;
}

const registry = {
  wearesander: { linkedinCode: "wearesander", name: "Sander", status: "ESN", reason: "test" },
};

const ariaLinks = [...document.querySelectorAll('a[href*="/company/"][aria-label*="Entreprise"]')];
console.log("Entreprise links:", ariaLinks.length);
for (const link of ariaLinks) {
  console.log("- in list card:", isInsideListJobCard(link));
  console.log("  aria:", link.getAttribute("aria-label"));
  const inner = link.querySelector('a[href*="/company/"]') ?? link;
  console.log("  inner text:", collapseText(inner.textContent ?? ""));
  console.log(
    "  match:",
    normalizeCompanyName(collapseText(inner.textContent ?? "")) === normalizeCompanyName("Sander")
  );
}

const detailJobLinks = [...document.querySelectorAll('a[href*="/jobs/view/"]')].filter(
  (link) => !isInsideListJobCard(link)
);
console.log("\nDetail job view links:", detailJobLinks.length);
for (const link of detailJobLinks.slice(0, 3)) {
  console.log("-", collapseText(link.textContent ?? ""), link.getAttribute("href")?.slice(0, 60));
}

const companyLinks = [...document.querySelectorAll('a[href*="/company/"]')].filter(
  (link) => !isInsideListJobCard(link) && !/\/insights\/|\/posts\//i.test(link.href)
);
console.log("\nDetail company links:", companyLinks.length);
for (const link of companyLinks.slice(0, 5)) {
  console.log("-", collapseText(link.textContent ?? "").slice(0, 40), "len:", collapseText(link.textContent ?? "").length);
}
