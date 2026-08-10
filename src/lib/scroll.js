// Smooth-scroll with the 66px top-bar offset (window.z6scroll in the prototype).
export function z6scroll(id) {
  const el = document.getElementById(id);
  if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 66, behavior: "smooth" });
  else window.scrollTo({ top: 0, behavior: "smooth" });
}

// Which CTA sent the visitor to the register form — carried into the enquiry
// email as a hidden field so Gum can see intent at a glance.
let lastCta = "Direct visit";
export const setCta = (label) => { lastCta = label; };
export const getCta = () => lastCta;
