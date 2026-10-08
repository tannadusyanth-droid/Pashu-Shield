/* Pashu Mitra — DBIM Header 3, global navigation, footer, cookie consent.
 * DBIM 5.4.3 (Header 3), 5.6 (footer), Annex A (navigation), 7.5 (language),
 * 7.6 (cookies); GIGW 3.0 5.2 (accessibility); DPDP Act 2023 (consent).
 * Loaded BEFORE shell.js; shell.js calls PMShell3 when present and falls back to
 * its older header/footer otherwise. All markup is built as strings from fixed
 * labels or escaped ORG values; interaction is wired by delegated listeners in
 * bind() (no new inline handlers). */
(function (root) {
  "use strict";
  var doc = root.document;

  /* ------------------------------------------------------------------ i18n
   * English + Hindi (DBIM 7.5 minimum). Other languages fall back to English.
   * Hindi strings are drafted for translator review (see PLACEHOLDERS.md). */
  var L = {
    en: {
      home: "Home", about: "About us", services: "Services", documents: "Documents", resources: "Resources", connect: "Connect",
      mylivestock: "My livestock", report: "Report a disease", callvet: "Call a veterinarian", scan: "Scan QR code",
      signinreq: "Sign in is needed for these services.",
      policies: "Policies and statements", privacy: "Privacy policy", terms: "Terms of use", access: "Accessibility statement",
      help: "Help and FAQs", sitemap: "Site map", contact: "Contact us", feedback: "Feedback", grievance: "Grievance redressal",
      search: "Search", searchph: "Search this site", voice: "Search by voice", signin: "Sign in", mydash: "My dashboard",
      farmer: "Farmer", vet: "Veterinary officer", admin: "Administrator", lab: "Laboratory",
      lang: "Language", textsize: "Text size", dec: "Decrease text size", reset: "Reset text size", inc: "Increase text size",
      contrast: "High contrast", motion: "Reduce motion", screenreader: "Screen reader access", menu: "Menu", tools: "Language and display",
      persona: "Sign in as", main: "Main navigation",
      fpolicy: "Website policy", copyright: "Copyright policy", hyper: "Hyperlinking policy", disclaimer: "Disclaimer", allpol: "All policies",
      fsite: "Sitemap", frel: "Related links", fhelp: "Help", faq: "FAQs", fa11y: "Accessibility help", cert: "Site certificates",
      certpending: "Not yet available: audit pending", transerr: "Report a translation error", ffeed: "Feedback",
      updated: "Last updated on", version: "Version", owner: "Content owned by", tech: "Technical contact",
      lineage: "This is an independent initiative and not an official Government of India website.",
      lineageGov: "Official Government of India portal.",
      conform: "Designed to conform to DBIM 3.0 and GIGW 3.0; CQW/STQC certification pending audit.",
      external: "opens in a new tab, external site", cookiesettings: "Cookie settings",
      ck_title: "Cookies on this site",
      ck_text: "We use only essential cookies and your saved choices (language, text size) to run the site. Other cookies stay off unless you allow them.",
      ck_accept: "Accept all", ck_reject: "Reject all", ck_custom: "Customise", ck_save: "Save choices",
      ck_ess: "Essential (always on): sign-in session, language and display choices.",
      ck_func: "Functionality: remember optional settings between visits.",
      ck_ana: "Analytics: privacy-safe counts of pages visited, to improve the site.",
      ck_soc: "Social: show social media content and sharing.",
      ck_saved: "Cookie choices saved.", pause: "Pause announcements", play: "Play announcements", ann: "Announcements"
    },
    hi: {
      home: "होम", about: "हमारे बारे में", services: "सेवाएँ", documents: "दस्तावेज़", resources: "संसाधन", connect: "संपर्क",
      mylivestock: "मेरे पशु", report: "बीमारी की सूचना दें", callvet: "पशु चिकित्सक को कॉल करें", scan: "क्यूआर कोड स्कैन करें",
      signinreq: "इन सेवाओं के लिए साइन इन आवश्यक है।",
      policies: "नीतियाँ और वक्तव्य", privacy: "गोपनीयता नीति", terms: "उपयोग की शर्तें", access: "सुगम्यता वक्तव्य",
      help: "सहायता और अक्सर पूछे जाने वाले प्रश्न", sitemap: "साइट मैप", contact: "संपर्क करें", feedback: "प्रतिक्रिया", grievance: "शिकायत निवारण",
      search: "खोजें", searchph: "इस साइट में खोजें", voice: "बोलकर खोजें", signin: "साइन इन", mydash: "मेरा डैशबोर्ड",
      farmer: "किसान", vet: "पशु चिकित्सा अधिकारी", admin: "प्रशासक", lab: "प्रयोगशाला",
      lang: "भाषा", textsize: "अक्षर आकार", dec: "अक्षर आकार घटाएँ", reset: "अक्षर आकार सामान्य करें", inc: "अक्षर आकार बढ़ाएँ",
      contrast: "उच्च कंट्रास्ट", motion: "गति कम करें", screenreader: "स्क्रीन रीडर सुविधा", menu: "मेन्यू", tools: "भाषा और प्रदर्शन",
      persona: "इस रूप में साइन इन करें", main: "मुख्य नेविगेशन",
      fpolicy: "वेबसाइट नीति", copyright: "कॉपीराइट नीति", hyper: "हाइपरलिंकिंग नीति", disclaimer: "अस्वीकरण", allpol: "सभी नीतियाँ",
      fsite: "साइट मैप", frel: "संबंधित लिंक", fhelp: "सहायता", faq: "अक्सर पूछे जाने वाले प्रश्न", fa11y: "सुगम्यता सहायता", cert: "साइट प्रमाणपत्र",
      certpending: "अभी उपलब्ध नहीं: ऑडिट लंबित", transerr: "अनुवाद की त्रुटि बताएँ", ffeed: "प्रतिक्रिया",
      updated: "अंतिम अद्यतन", version: "संस्करण", owner: "सामग्री स्वामी", tech: "तकनीकी संपर्क",
      lineage: "यह एक स्वतंत्र पहल है और भारत सरकार की आधिकारिक वेबसाइट नहीं है।",
      lineageGov: "भारत सरकार का आधिकारिक पोर्टल।",
      conform: "DBIM 3.0 और GIGW 3.0 के अनुरूप बनाया गया; CQW/STQC प्रमाणन ऑडिट के लिए लंबित है।",
      external: "नए टैब में खुलता है, बाहरी साइट", cookiesettings: "कुकी सेटिंग",
      ck_title: "इस साइट पर कुकीज़",
      ck_text: "साइट चलाने के लिए हम केवल आवश्यक कुकीज़ और आपकी सहेजी गई पसंद (भाषा, अक्षर आकार) का उपयोग करते हैं। अन्य कुकीज़ आपकी अनुमति के बिना बंद रहती हैं।",
      ck_accept: "सभी स्वीकार करें", ck_reject: "सभी अस्वीकार करें", ck_custom: "अनुकूलित करें", ck_save: "चुनाव सहेजें",
      ck_ess: "आवश्यक (हमेशा चालू): साइन-इन सत्र, भाषा और प्रदर्शन की पसंद।",
      ck_func: "कार्यक्षमता: अगली बार के लिए वैकल्पिक सेटिंग याद रखें।",
      ck_ana: "विश्लेषण: साइट सुधारने के लिए देखे गए पृष्ठों की गोपनीयता-सुरक्षित गिनती।",
      ck_soc: "सोशल: सोशल मीडिया सामग्री और साझा करना दिखाएँ।",
      ck_saved: "कुकी चुनाव सहेज लिए गए।", pause: "घोषणाएँ रोकें", play: "घोषणाएँ चलाएँ", ann: "घोषणाएँ"
    }
  };
  function lang() { return String((doc && doc.documentElement.getAttribute("lang")) || "en").slice(0, 2).toLowerCase(); }
  function T(k) { var d = L[lang()] || L.en; return d[k] != null ? d[k] : L.en[k]; }
  function esc(s) { return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return "&#" + c.charCodeAt(0) + ";"; }); }
  function org() { return root.ORG || {}; }

  /* --------------------------------------------------------------- icons
   * ONE style: 24px frame, 2px line, currentColor (DBIM 3). Decorative: aria-hidden. */
  function icon(path) {
    return '<svg class="pm-ico" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + path + "</svg>";
  }
  var ICON = {
    search: icon('<circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/>'),
    mic: icon('<rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/>'),
    user: icon('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0116 0"/>'),
    menu: icon('<path d="M4 6h16M4 12h16M4 18h16"/>'),
    chev: icon('<path d="M6 9l6 6 6-6"/>'),
    sliders: icon('<path d="M4 6h10M18 6h2M4 12h2M10 12h10M4 18h12M20 18h0"/><circle cx="16" cy="6" r="2"/><circle cx="8" cy="12" r="2"/><circle cx="18" cy="18" r="2"/>'),
    pause: icon('<path d="M9 5v14M15 5v14"/>'), play: icon('<path d="M8 5l11 7-11 7z"/>')
  };

  /* -------------------------------------------------------- navigation data
   * Only routes that exist. Services need sign-in (the router sends anonymous
   * users to the role selector), so the panel says so. Items with no content
   * yet (schemes, notices, publications, RTI, photos, videos) are NOT shown. */
  function navModel() {
    return [
      { k: "home", href: "#/" },
      { k: "about", href: "#/about" },
      { k: "services", note: "signinreq", items: [
        { k: "mylivestock", href: "#/owner/livestock" }, { k: "report", href: "#/owner/report" },
        { k: "callvet", href: "#/owner/webcall" }, { k: "scan", href: "#/scan" } ] },
      { k: "documents", items: [
        { k: "policies", href: "#/policies" }, { k: "privacy", href: "#/policies/privacy" },
        { k: "terms", href: "#/policies/terms" }, { k: "access", href: "#/policies/accessibility" } ] },
      { k: "resources", items: [ { k: "help", href: "#/help" }, { k: "sitemap", href: "#/sitemap" } ] },
      { k: "connect", items: [
        { k: "contact", href: "#/contact" }, { k: "feedback", href: "#/feedback" }, { k: "grievance", href: "#/policies/grievance" } ] }
    ];
  }
  var PERSONAS = [
    { k: "farmer", href: "#/login/owner" }, { k: "vet", href: "#/login/vet" },
    { k: "admin", href: "#/login/govt" }, { k: "lab", href: "#/login/lab" }
  ];

  function disclosure(id, labelHtml, panelHtml, cls) {
    return '<button type="button" class="pm-disc ' + (cls || "") + '" aria-expanded="false" aria-controls="' + id + '" data-pm-disc>' +
      labelHtml + ICON.chev + '</button><div class="pm-panel" id="' + id + '" hidden>' + panelHtml + "</div>";
  }

  function renderNav() {
    var items = navModel().map(function (n, i) {
      if (!n.items) return '<li><a class="pm-navlink" href="' + n.href + '">' + esc(T(n.k)) + "</a></li>";
      var list = '<ul class="pm-sub">' + n.items.map(function (s) {
        return '<li><a href="' + s.href + '">' + esc(T(s.k)) + "</a></li>";
      }).join("") + "</ul>" + (n.note ? '<p class="pm-subnote">' + esc(T(n.note)) + "</p>" : "");
      return '<li class="pm-has-sub">' + disclosure("pmNavP" + i, '<span>' + esc(T(n.k)) + "</span>", list) + "</li>";
    }).join("");
    return '<nav class="pm-gnav" id="pmNav" aria-label="' + esc(T("main")) + '"><ul class="pm-gnav-list">' + items + "</ul></nav>";
  }

  function renderSignin() {
    var token = false; try { token = !!root.localStorage.getItem("token"); } catch (_) {}
    if (token) return '<a class="pm-signin pm-ibtn-text" href="#/">' + ICON.user + "<span>" + esc(T("mydash")) + "</span></a>";
    var list = '<p class="pm-subnote">' + esc(T("persona")) + '</p><ul class="pm-sub">' + PERSONAS.map(function (p) {
      return '<li><a href="' + p.href + '">' + esc(T(p.k)) + "</a></li>"; }).join("") + "</ul>";
    return '<div class="pm-signin">' + disclosure("pmSignP", ICON.user + "<span>" + esc(T("signin")) + "</span>", list, "pm-signin-btn") + "</div>";
  }

  /* -------------------------------------------------- engagement bar (fixed)
   * Search + user controls: skip link is the first focusable element in
   * index.html; language selector "अ | A"; text size; contrast; motion;
   * screen reader access (DBIM 5.4.3). */
  function renderEngagement() {
    var cur = lang();
    var langs = [["en", "English"], ["hi", "हिन्दी"], ["mr", "मराठी"], ["te", "తెలుగు"]];
    var opts = langs.map(function (l) { return '<option value="' + l[0] + '" lang="' + l[0] + '"' + (cur === l[0] ? " selected" : "") + ">" + l[1] + "</option>"; }).join("");
    var q = "";
    return '<div class="pm-eng" id="pmEng"><div class="pm-eng-in">' +
      '<form class="pm-hsearch" id="pmHSearch" role="search" action="#/search">' +
        '<label class="sr-only" for="pmHQ">' + esc(T("search")) + "</label>" +
        '<input id="pmHQ" name="q" type="search" autocomplete="off" placeholder="' + esc(T("searchph")) + '" value="' + esc(q) + '">' +
        '<button type="submit" class="pm-ibtn" title="' + esc(T("search")) + '" aria-label="' + esc(T("search")) + '">' + ICON.search + "</button>" +
        '<button type="button" class="pm-ibtn" id="pmVoice" title="' + esc(T("voice")) + '" aria-label="' + esc(T("voice")) + '" hidden>' + ICON.mic + "</button>" +
      "</form>" +
      '<div class="pm-uctl">' +
        '<label class="pm-langsel"><span class="pm-langicon" aria-hidden="true">अ | A</span><span class="sr-only">' + esc(T("lang")) + "</span>" +
          '<select id="pmLang">' + opts + "</select></label>" +
        '<div class="pm-tsz" role="group" aria-label="' + esc(T("textsize")) + '">' +
          '<button type="button" class="pm-a11y-btn" data-pm-size="-1" aria-label="' + esc(T("dec")) + '" title="' + esc(T("dec")) + '">A−</button>' +
          '<button type="button" class="pm-a11y-btn" data-pm-size="0" aria-label="' + esc(T("reset")) + '" title="' + esc(T("reset")) + '">A</button>' +
          '<button type="button" class="pm-a11y-btn" data-pm-size="1" aria-label="' + esc(T("inc")) + '" title="' + esc(T("inc")) + '">A+</button>' +
          '<span class="sr-only" id="pmScaleValue" aria-live="polite"></span></div>' +
        '<button type="button" class="pm-a11y-btn pm-a11y-wide" data-a11y-toggle="highContrast" data-pm-toggle="highContrast" data-a11y-label="' + esc(T("contrast")) + '" data-a11y-label-on="' + esc(T("contrast")) + '" aria-pressed="false">◐ ' + esc(T("contrast")) + "</button>" +
        '<button type="button" class="pm-a11y-btn pm-a11y-wide" data-a11y-toggle="reducedMotion" data-pm-toggle="reducedMotion" data-a11y-label="' + esc(T("motion")) + '" data-a11y-label-on="' + esc(T("motion")) + '" aria-pressed="false">' + esc(T("motion")) + "</button>" +
        '<a class="pm-sr-link" href="#/policies/accessibility">' + esc(T("screenreader")) + "</a>" +
      "</div></div></div>";
  }

  /* Header 3 (sticky): engagement bar + [Lockup 3B | nav | sign-in] */
  function renderHeader() {
    var logo = root.PMLogo ? root.PMLogo.html({ variant: "horizontal", context: "header", lang: lang(), height: 57 }) : esc((org().appName) || "Pashu Mitra");
    return '<header class="pm-h3" id="site-header" role="banner">' +
      '<div class="pm-mainbar"><div class="pm-mainbar-in">' +
        '<a class="pm-brand" href="#/" aria-label="Pashu Mitra – Home">' + logo + "</a>" +
        '<div class="pm-mbtns">' +
          '<button type="button" class="pm-ibtn-text" id="pmToolsBtn" aria-expanded="false" aria-controls="pmEng">' + ICON.sliders + "<span>" + esc(T("tools")) + "</span></button>" +
          '<button type="button" class="pm-ibtn-text" id="pmMenuBtn" aria-expanded="false" aria-controls="pmNavWrap">' + ICON.menu + "<span>" + esc(T("menu")) + "</span></button>" +
        "</div>" +
        '<div class="pm-navwrap" id="pmNavWrap">' + renderNav() + renderSignin() + "</div>" +
      "</div></div>" + renderEngagement() + "</header>";
  }

  /* ------------------------------------------------------------- footer */
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function ddmmyyyy(iso) {
    var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ""));
    return m ? m[3] + "/" + m[2] + "/" + m[1] : "";
  }
  /* "Last updated on" is data-driven and per page: ORG.pageUpdated[route] first, then ORG.lastReviewed. */
  function lastUpdatedFor(hash) {
    var o = org(), path = String(hash || "#/").split("?")[0];
    var iso = (o.pageUpdated && o.pageUpdated[path]) || o.lastReviewed || "";
    return ddmmyyyy(iso);
  }
  function link(href, label) { return '<li><a href="' + href + '">' + esc(label) + "</a></li>"; }
  function renderFooter() {
    var o = org(), owner = o.owner || {}, wim = o.wim || {};
    var gov = o.officialGovPortal === true;
    var logo = root.PMLogo ? root.PMLogo.html({ variant: "horizontal", context: "footer", lang: lang(), height: 57 }) : esc(o.appName || "Pashu Mitra");
    var rel = o.nationalPortal && o.nationalPortal.url
      ? '<li><a href="' + esc(o.nationalPortal.url) + '" target="_blank" rel="noopener noreferrer">' + esc(o.nationalPortal.label) +
        ' <span class="sr-only">(' + esc(T("external")) + ")</span></a></li>" : "";
    var soc = o.social || {}, socials = ["x", "instagram", "facebook", "youtube"].filter(function (k) { return /^https:\/\//.test(soc[k] || ""); })
      .map(function (k) { return '<li><a href="' + esc(soc[k]) + '" target="_blank" rel="noopener noreferrer">' + k.charAt(0).toUpperCase() + k.slice(1) + "</a></li>"; }).join("");
    return '<footer class="pm-f3" id="site-footer" role="contentinfo">' +
      '<div class="pm-f3-top"><a class="pm-brand pm-brand-footer" href="#/" aria-label="Pashu Mitra – Home">' + logo + "</a>" +
        '<p>' + esc(owner.name || "") + "</p></div>" +
      '<div class="pm-f3-grid">' +
        '<nav aria-labelledby="pmF1"><h2 id="pmF1">' + esc(T("fpolicy")) + "</h2><ul>" +
          link("#/policies/terms", T("terms")) + link("#/policies/privacy", T("privacy")) + link("#/policies/hyperlinking", T("hyper")) +
          link("#/policies/copyright", T("copyright")) + link("#/policies/disclaimer", T("disclaimer")) + link("#/policies", T("allpol")) + "</ul></nav>" +
        '<nav aria-labelledby="pmF2"><h2 id="pmF2">' + esc(T("fsite")) + "</h2><ul>" +
          link("#/sitemap", T("sitemap")) + link("#/about", T("about")) + link("#/contact", T("contact")) + link("#/search", T("search")) + "</ul></nav>" +
        '<nav aria-labelledby="pmF3"><h2 id="pmF3">' + esc(T("frel")) + "</h2><ul>" + rel + "</ul></nav>" +
        '<nav aria-labelledby="pmF4"><h2 id="pmF4">' + esc(T("fhelp")) + "</h2><ul>" +
          link("#/help", T("faq")) + link("#/policies/accessibility", T("screenreader")) + link("#/policies/accessibility", T("fa11y")) +
          "<li>" + esc(T("cert")) + ' <span class="pm-f3-note">(' + esc(T("certpending")) + ")</span></li></ul></nav>" +
        '<nav aria-labelledby="pmF5"><h2 id="pmF5">' + esc(T("ffeed")) + "</h2><ul>" +
          link("#/feedback", T("feedback")) + link("#/feedback?topic=translation", T("transerr")) + socials + "</ul></nav>" +
      "</div>" +
      '<div class="pm-f3-bar">' +
        '<p>' + esc(T("owner")) + ": " + esc(owner.name || "") + ". " + esc(T("tech")) + ": " + esc(wim.name || "") + (wim.email ? ", " + esc(wim.email) : "") + ".</p>" +
        '<p>' + esc(T("updated")) + ' <time id="pmLastUpdated">' + esc(lastUpdatedFor(root.location && root.location.hash)) + "</time>" +
          (o.version ? " · " + esc(T("version")) + " " + esc(o.version) : "") + "</p>" +
        '<p>' + esc(gov ? T("lineageGov") : T("lineage")) + "</p>" +
        '<p>' + esc(T("conform")) + "</p>" +
        '<p><button type="button" class="pm-linkbtn" data-pm-cookie-open>' + esc(T("cookiesettings")) + "</button></p>" +
      "</div></footer>";
  }

  /* ------------------------------------------------ announcements ticker
   * Real content only: ORG.announcements = [{text, href?}]. Empty -> nothing.
   * Pause control always present; motion is off when the user prefers it. */
  function renderTicker() {
    var a = org().announcements || [];
    if (!a.length) return "";
    var items = a.map(function (x) { return "<li>" + (x.href ? '<a href="' + esc(x.href) + '">' + esc(x.text) + "</a>" : esc(x.text)) + "</li>"; }).join("");
    return '<section class="pm-ticker" aria-label="' + esc(T("ann")) + '"><button type="button" class="pm-ibtn-text" data-pm-ticker aria-pressed="false" aria-label="' + esc(T("pause")) + '">' +
      ICON.pause + '</button><ul class="pm-ticker-list">' + items + "</ul></section>";
  }

  /* ----------------------------------------------------- cookie consent
   * DBIM 7.6 / DPDP 2023: banner with Accept, Reject, Customise; nothing
   * pre-ticked; essential needs no consent; withdrawable; no third-party
   * script is loaded by this build, so "off" is the truth, not a pretence. */
  var KEY = "pm_consent";
  var CATS = ["functionality", "analytics", "social"];
  var listeners = [];
  function readConsent() {
    try { var v = JSON.parse(root.localStorage.getItem(KEY) || "null"); return v && v.v === 1 ? v : null; } catch (_) { return null; }
  }
  function saveConsent(map) {
    var v = { v: 1, ts: new Date().toISOString() };
    CATS.forEach(function (c) { v[c] = !!map[c]; });
    try { root.localStorage.setItem(KEY, JSON.stringify(v)); } catch (_) {}
    listeners.forEach(function (f) { try { f(v); } catch (_) {} });
    return v;
  }
  var consent = {
    get: function (cat) { var v = readConsent(); return !!(v && v[cat]); },   // unknown -> false (opt-in)
    decided: function () { return !!readConsent(); },
    accept: function () { return saveConsent({ functionality: 1, analytics: 1, social: 1 }); },
    reject: function () { return saveConsent({}); },
    set: saveConsent,
    onChange: function (f) { listeners.push(f); }
  };
  function renderCookie() {
    var boxes = [["functionality", "ck_func"], ["analytics", "ck_ana"], ["social", "ck_soc"]].map(function (c) {
      return '<label class="pm-ck-opt"><input type="checkbox" name="' + c[0] + '"> <span>' + esc(T(c[1])) + "</span></label>"; }).join("");
    return '<section class="pm-cookie" id="pmCookie" role="region" aria-labelledby="pmCkT" hidden>' +
      '<h2 id="pmCkT">' + esc(T("ck_title")) + "</h2><p>" + esc(T("ck_text")) + "</p>" +
      '<form class="pm-ck-panel" id="pmCkForm" hidden><p>' + esc(T("ck_ess")) + "</p>" + boxes +
        '<button type="submit" class="btn btn-primary">' + esc(T("ck_save")) + "</button></form>" +
      '<div class="pm-ck-actions"><button type="button" class="btn btn-primary" data-ck="accept">' + esc(T("ck_accept")) + "</button>" +
        '<button type="button" class="btn btn-primary" data-ck="reject">' + esc(T("ck_reject")) + "</button>" +
        '<button type="button" class="btn" data-ck="custom" aria-expanded="false" aria-controls="pmCkForm">' + esc(T("ck_custom")) + "</button></div></section>";
  }

  /* ------------------------------------------------------------- wiring */
  function $(s, r) { return (r || doc).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || doc).querySelectorAll(s)); }
  function closeAll(except) {
    $$("[data-pm-disc][aria-expanded=true]").forEach(function (b) {
      if (b === except) return; b.setAttribute("aria-expanded", "false"); var p = doc.getElementById(b.getAttribute("aria-controls")); if (p) p.hidden = true; });
  }
  function toggleRegion(btn, el) {
    var open = btn.getAttribute("aria-expanded") !== "true";
    btn.setAttribute("aria-expanded", String(open)); el.classList.toggle("is-open", open);
  }
  function announce(msg) { if (root.PashuShell && root.PashuShell.announce) root.PashuShell.announce(msg); }

  var bound = false;
  function bind() {
    if (bound) return; bound = true;
    doc.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target : e.target.parentElement; if (!t) return;
      var d = t.closest("[data-pm-disc]");
      if (d) { var p = doc.getElementById(d.getAttribute("aria-controls")), open = d.getAttribute("aria-expanded") !== "true";
        closeAll(open ? d : null); d.setAttribute("aria-expanded", String(open)); if (p) p.hidden = !open; return; }
      if (!t.closest(".pm-panel")) closeAll();
      var size = t.closest("[data-pm-size]");
      if (size && root.PashuShell) { var s = Number(size.getAttribute("data-pm-size")), cur = root.PashuShell.getScaleIndex();
        root.PashuShell.setScaleIndex(s === 0 ? 1 : cur + s); return; }
      var tg = t.closest("[data-pm-toggle]"); if (tg && root.PashuShell) { root.PashuShell.togglePref(tg.getAttribute("data-pm-toggle")); return; }
      if (t.closest("#pmToolsBtn")) { toggleRegion(t.closest("#pmToolsBtn"), $("#pmEng")); return; }
      if (t.closest("#pmMenuBtn")) { toggleRegion(t.closest("#pmMenuBtn"), $("#pmNavWrap")); return; }
      var tk = t.closest("[data-pm-ticker]");
      if (tk) { var paused = tk.getAttribute("aria-pressed") !== "true"; tk.setAttribute("aria-pressed", String(paused));
        tk.setAttribute("aria-label", T(paused ? "play" : "pause")); tk.innerHTML = paused ? ICON.play : ICON.pause;
        var tl = $(".pm-ticker-list"); if (tl) tl.classList.toggle("is-paused", paused); return; }
      var ck = t.closest("[data-ck]");
      if (ck) { var a = ck.getAttribute("data-ck");
        if (a === "accept") { consent.accept(); hideCookie(); }
        else if (a === "reject") { consent.reject(); hideCookie(); }
        else { var f = $("#pmCkForm"); f.hidden = !f.hidden; ck.setAttribute("aria-expanded", String(!f.hidden)); }
        return; }
      if (t.closest("[data-pm-cookie-open]")) { showCookie(true); }
    });
    doc.addEventListener("keydown", function (e) {
      if (e.key !== "Escape") return;
      var open = $("[data-pm-disc][aria-expanded=true]"); if (open) { closeAll(); open.focus(); }
    });
    doc.addEventListener("change", function (e) { if (e.target && e.target.id === "pmLang" && root.setLang) root.setLang(e.target.value); });
    doc.addEventListener("submit", function (e) {
      var f = e.target;
      if (f.id === "pmHSearch") { e.preventDefault(); var q = $("#pmHQ").value.trim(); root.location.hash = "#/search" + (q ? "?q=" + encodeURIComponent(q) : ""); }
      if (f.id === "pmCkForm") { e.preventDefault(); var m = {}; CATS.forEach(function (c) { m[c] = f.elements[c].checked; });
        consent.set(m); hideCookie(); announce(T("ck_saved")); }
    });
    root.addEventListener("hashchange", function () {
      closeAll(); var w = $("#pmNavWrap"), b = $("#pmMenuBtn"); if (w) w.classList.remove("is-open"); if (b) b.setAttribute("aria-expanded", "false");
      var lu = $("#pmLastUpdated"); if (lu) lu.textContent = lastUpdatedFor(root.location.hash);
      // WCAG 2.4.3 / GIGW: after a route change move focus to the content so keyboard and
      // screen-reader users start at the new page, and announce the new title.
      var m = doc.getElementById("main-content");
      setTimeout(function () { if (m) { try { m.focus({ preventScroll: true }); } catch (_) {} } announce(doc.title); }, 60);
    });
    root.addEventListener("pm:langchange", function () { mount(); });
    voiceInit();
  }

  /* Voice search: browser speech recognition when available (feature-detected).
   * Note: the browser vendor's speech service processes the audio. Not wired to
   * the app's own voice module (not verified): see DECISIONS D-19. */
  function voiceInit() {
    var SR = root.SpeechRecognition || root.webkitSpeechRecognition, btn = $("#pmVoice"); if (!SR || !btn) return;
    btn.hidden = false;
    btn.onclick = function () {
      var r = new SR(); r.lang = { en: "en-IN", hi: "hi-IN", mr: "mr-IN", te: "te-IN" }[lang()] || "en-IN"; r.interimResults = false; r.maxAlternatives = 1;
      btn.setAttribute("aria-pressed", "true");
      r.onresult = function (ev) { $("#pmHQ").value = ev.results[0][0].transcript; $("#pmHSearch").dispatchEvent(new root.Event("submit", { cancelable: true, bubbles: true })); };
      r.onend = r.onerror = function () { btn.setAttribute("aria-pressed", "false"); };
      try { r.start(); } catch (_) { btn.setAttribute("aria-pressed", "false"); }
    };
  }

  function showCookie(force) {
    var c = $("#pmCookie"); if (!c) return;
    if (!force && consent.decided()) return;
    var v = readConsent() || {};
    CATS.forEach(function (k) { var i = c.querySelector('input[name="' + k + '"]'); if (i) i.checked = !!v[k]; });   // never pre-ticked unless the user chose it
    c.hidden = false;
  }
  function hideCookie() { var c = $("#pmCookie"); if (c) c.hidden = true; }

  function mount() {
    var hh = doc.getElementById("pmSiteHeaderHost"), fh = doc.getElementById("pmFooterHost"), ch = doc.getElementById("pmCookieHost");
    var bar = doc.getElementById("pmA11yBarHost"); if (bar) bar.innerHTML = "";
    if (hh) hh.innerHTML = renderHeader() + renderTicker();
    if (fh) fh.innerHTML = renderFooter();
    if (ch) { var was = !$("#pmCookie") || $("#pmCookie").hidden; ch.innerHTML = renderCookie(); if (!consent.decided()) showCookie(); else if (!was) showCookie(true); }
    if (root.PashuShell && root.PashuShell.applyPrefs) root.PashuShell.applyPrefs();
    voiceInit();
  }

  root.PMShell3 = { T: T, renderHeader: renderHeader, renderNav: renderNav, renderFooter: renderFooter, renderTicker: renderTicker,
    renderCookie: renderCookie, renderEngagement: renderEngagement, lastUpdatedFor: lastUpdatedFor, ddmmyyyy: ddmmyyyy, consent: consent,
    navModel: navModel, mount: mount, bind: bind, labels: L };
})(typeof window !== "undefined" ? window : globalThis);
