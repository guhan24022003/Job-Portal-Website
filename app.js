const JOBS = [
["Software Developer","TechNova","Bengaluru","Full-time","Software","₹6–12 LPA",["JavaScript","React","SQL"]],
["Frontend Developer","PixelWorks","Chennai","Full-time","Software","₹5–10 LPA",["HTML","CSS","React"]],
["Backend Developer","CloudStack","Hyderabad","Full-time","Software","₹7–14 LPA",["Python","APIs","SQL"]],
["Full Stack Developer","CodeSphere","Bengaluru","Full-time","Software","₹8–16 LPA",["React","Node.js","MongoDB"]],
["Python Developer","DataForge","Pune","Full-time","Software","₹5–11 LPA",["Python","Django","SQL"]],
["Java Developer","EnterpriseLabs","Chennai","Full-time","Software","₹5–12 LPA",["Java","Spring","SQL"]],
["React Developer","WebPulse","Remote","Full-time","Software","₹6–13 LPA",["React","JavaScript","Git"]],
["Mobile App Developer","AppCore","Hyderabad","Full-time","Software","₹6–14 LPA",["Flutter","Dart","Firebase"]],
["UI/UX Designer","DesignMint","Bengaluru","Full-time","Design","₹5–10 LPA",["Figma","UX","Prototyping"]],
["Product Designer","VisionWorks","Chennai","Full-time","Design","₹7–14 LPA",["Figma","Research","Design"]],
["Graphic Designer","CreativeGrid","Coimbatore","Full-time","Design","₹3–7 LPA",["Photoshop","Illustrator","Canva"]],
["Motion Designer","FrameLab","Remote","Contract","Design","₹4–9 LPA",["After Effects","Motion","Video"]],
["Data Analyst","InsightHub","Chennai","Full-time","Data","₹5–10 LPA",["Excel","SQL","Power BI"]],
["Data Scientist","AnalyticsOne","Bengaluru","Full-time","Data","₹8–18 LPA",["Python","ML","SQL"]],
["Business Analyst","BizTech","Hyderabad","Full-time","Data","₹6–12 LPA",["SQL","Excel","Power BI"]],
["BI Developer","ReportWorks","Pune","Full-time","Data","₹6–13 LPA",["Power BI","SQL","DAX"]],
["Machine Learning Engineer","AICore","Bengaluru","Full-time","AI","₹10–22 LPA",["Python","ML","TensorFlow"]],
["AI Engineer","NeuralNest","Hyderabad","Full-time","AI","₹9–20 LPA",["Python","LLMs","APIs"]],
["Prompt Engineer","GenAI Labs","Remote","Full-time","AI","₹7–15 LPA",["LLMs","Prompting","AI"]],
["Computer Vision Engineer","VisionAI","Bengaluru","Full-time","AI","₹9–20 LPA",["Python","OpenCV","Deep Learning"]],
["Cybersecurity Analyst","SecureNet","Chennai","Full-time","Cybersecurity","₹6–14 LPA",["Linux","SIEM","Networking"]],
["Security Engineer","CyberShield","Bengaluru","Full-time","Cybersecurity","₹8–17 LPA",["Cloud","IAM","Security"]],
["SOC Analyst","ThreatWatch","Hyderabad","Full-time","Cybersecurity","₹4–9 LPA",["SIEM","SOC","Incident Response"]],
["Penetration Tester","RedTeamX","Pune","Contract","Cybersecurity","₹6–14 LPA",["Web Security","Linux","OWASP"]],
["Cloud Engineer","CloudPeak","Bengaluru","Full-time","Cloud","₹7–16 LPA",["AWS","Linux","Docker"]],
["AWS Cloud Developer","AWSWorks","Hyderabad","Full-time","Cloud","₹7–15 LPA",["AWS","Python","Lambda"]],
["Azure Engineer","MicrosoftPro","Pune","Full-time","Cloud","₹7–15 LPA",["Azure","DevOps","PowerShell"]],
["DevOps Engineer","DeployFlow","Bengaluru","Full-time","DevOps","₹8–18 LPA",["Docker","Kubernetes","CI/CD"]],
["Site Reliability Engineer","ReliabilityHub","Remote","Full-time","DevOps","₹9–20 LPA",["Linux","Kubernetes","Monitoring"]],
["QA Engineer","QualityFirst","Chennai","Full-time","Testing","₹4–9 LPA",["Testing","Selenium","SQL"]],
["Automation Test Engineer","AutoTest Labs","Bengaluru","Full-time","Testing","₹5–11 LPA",["Selenium","Python","API"]],
["Manual Tester","TestWorks","Coimbatore","Full-time","Testing","₹3–7 LPA",["Manual Testing","Jira","SQL"]],
["Database Administrator","DBSecure","Hyderabad","Full-time","Database","₹6–13 LPA",["SQL","Oracle","Backup"]],
["SQL Developer","DataBasePro","Chennai","Full-time","Database","₹5–10 LPA",["SQL","PL/SQL","ETL"]],
["Network Engineer","NetCore","Bengaluru","Full-time","Networking","₹4–10 LPA",["Networking","CCNA","Linux"]],
["Technical Support Engineer","HelpTech","Pune","Full-time","Support","₹3–7 LPA",["Troubleshooting","Linux","Networking"]],
["IT Project Manager","ProjectSphere","Hyderabad","Full-time","Management","₹10–20 LPA",["Agile","Jira","Leadership"]],
["Product Manager","ProductWorks","Bengaluru","Full-time","Management","₹12–25 LPA",["Product","Analytics","Strategy"]],
["Scrum Master","AgileHub","Chennai","Full-time","Management","₹8–16 LPA",["Agile","Scrum","Jira"]],
["Technical Content Writer","TechWrite","Remote","Part-time","Content","₹3–8 LPA",["Writing","SEO","Technology"]]
];

const COMPANIES = [...new Set(JOBS.map(j=>j[1]))].slice(0,10);
const $ = id => document.getElementById(id);
let saved = JSON.parse(localStorage.getItem("careerhub_saved") || "[]");
let applications = JSON.parse(localStorage.getItem("careerhub_apps") || "[]");
let profile = JSON.parse(localStorage.getItem("careerhub_profile") || "null");

function esc(v){return String(v).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));}
function toast(msg){const t=$("toast");t.textContent=msg;t.classList.add("show");clearTimeout(window._toast);window._toast=setTimeout(()=>t.classList.remove("show"),2600);}
function initials(name){return name.split(" ").map(x=>x[0]).slice(0,2).join("").toUpperCase();}
function saveState(){localStorage.setItem("careerhub_saved",JSON.stringify(saved));localStorage.setItem("careerhub_apps",JSON.stringify(applications));localStorage.setItem("careerhub_profile",JSON.stringify(profile));$("savedCount").textContent=saved.length;}

function populateFilters(){
  const cats=[...new Set(JOBS.map(j=>j[4]))].sort(), locs=[...new Set(JOBS.map(j=>j[2]))].sort();
  cats.forEach(x=>$("categoryFilter").insertAdjacentHTML("beforeend",`<option>${esc(x)}</option>`));
  locs.forEach(x=>$("locationFilter").insertAdjacentHTML("beforeend",`<option>${esc(x)}</option>`));
}
function renderJobs(){
  const q=$("jobSearch").value.trim().toLowerCase(), cat=$("categoryFilter").value, loc=$("locationFilter").value, type=$("typeFilter").value;
  const list=JOBS.filter(j=>(!q||j.join(" ").toLowerCase().includes(q))&&(!cat||j[4]===cat)&&(!loc||j[2]===loc)&&(!type||j[3]===type));
  $("resultCount").textContent=`${list.length} job${list.length!==1?"s":""} found`;
  $("emptyState").classList.toggle("hidden",list.length!==0);
  $("jobGrid").innerHTML=list.map((j,i)=>jobCard(j,JOBS.indexOf(j))).join("");
}
function jobCard(j,id){
  const active=saved.includes(id);
  return `<article class="job-card">
    <div class="job-top"><div class="company-logo">${initials(j[1])}</div><button class="save-btn ${active?"active":""}" title="Save job" onclick="toggleSave(${id})">${active?"★":"☆"}</button></div>
    <h3>${esc(j[0])}</h3><div class="company">${esc(j[1])}</div>
    <div class="meta"><span>📍 ${esc(j[2])}</span><span>💼 ${esc(j[3])}</span></div>
    <div class="salary">${esc(j[5])}</div>
    <div class="tags">${j[6].map(t=>`<span class="tag">${esc(t)}</span>`).join("")}</div>
    <div class="job-actions"><button class="btn btn-ghost" onclick="viewJob(${id})">Details</button><button class="btn btn-primary" onclick="openApply(${id})">Apply Now</button></div>
  </article>`;
}
function toggleSave(id){saved=saved.includes(id)?saved.filter(x=>x!==id):[...saved,id];saveState();renderJobs();toast(saved.includes(id)?"Job saved":"Removed from saved");}
function viewJob(id){
  const j=JOBS[id];
  modal(`<div class="modal-head"><div><span class="eyebrow">${esc(j[4])}</span><h2>${esc(j[0])}</h2><p class="company">${esc(j[1])} • ${esc(j[2])}</p></div><button class="close" onclick="closeModal()">✕</button></div>
  <div class="meta"><span>💼 ${esc(j[3])}</span><span>💰 ${esc(j[5])}</span></div>
  <p>Join ${esc(j[1])} as a ${esc(j[0])}. Work with a collaborative technology team and contribute to real-world products.</p>
  <div class="notice"><strong>Skills:</strong> ${j[6].map(esc).join(" • ")}</div>
  <div class="modal-actions"><button class="btn btn-ghost" onclick="toggleSave(${id});closeModal()">Save Job</button><button class="btn btn-primary" onclick="openApply(${id})">Apply Now</button></div>`);
}
function openApply(id){
  closeModal();
  if(!profile){openLogin(()=>openApply(id));return;}
  const j=JOBS[id];
  modal(`<div class="modal-head"><div><span class="eyebrow">APPLICATION</span><h2>Apply for ${esc(j[0])}</h2><p class="company">${esc(j[1])} • ${esc(j[2])}</p></div><button class="close" onclick="closeModal()">✕</button></div>
  <form id="applyForm" class="form-grid">
    <label>Full Name<input name="name" value="${esc(profile.name||"")}" required></label>
    <label>Email<input type="email" name="email" value="${esc(profile.email||"")}" required></label>
    <label>Mobile<input name="mobile" value="${esc(profile.mobile||"")}" required></label>
    <label>Resume (PDF)<input type="file" name="resume" accept=".pdf,application/pdf" required></label>
    <label>Cover Message<textarea name="message" placeholder="Tell the recruiter briefly why you are a good fit..."></textarea></label>
    <div class="notice">Your application is saved in My Applications. For real recruiter email delivery, connect a backend email service before production use.</div>
    <div class="modal-actions"><button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary" type="submit">Submit Application</button></div>
  </form>`);
  $("applyForm").addEventListener("submit",e=>{
    e.preventDefault();
    const file=e.target.resume.files[0];
    if(!file||file.type!=="application/pdf"){toast("Please upload a PDF resume.");return;}
    if(file.size>5*1024*1024){toast("Resume must be under 5 MB.");return;}
    if(applications.some(a=>a.jobId===id&&a.email===e.target.email.value.trim())){toast("You already applied for this job.");return;}
    applications.unshift({jobId:id,job:j[0],company:j[1],location:j[2],email:e.target.email.value.trim(),name:e.target.name.value.trim(),resume:file.name,status:"Applied",date:new Date().toLocaleDateString("en-IN")});
    profile={name:e.target.name.value.trim(),email:e.target.email.value.trim(),mobile:e.target.mobile.value.trim()};
    saveState();closeModal();renderApplications();toast("Application submitted successfully!");
    setTimeout(()=>window.location.hash="applications",200);
  });
}
function renderApplications(){
  if(!applications.length){$("applicationsList").innerHTML=`<div class="empty"><div>📄</div><h3>No applications yet</h3><p>Apply to a job and your application will appear here.</p><button class="btn btn-primary" onclick="location.hash='jobs'">Browse Jobs</button></div>`;return;}
  $("applicationsList").innerHTML=applications.map(a=>`<div class="application"><div><strong>${esc(a.job)}</strong><small>${esc(a.company)} • ${esc(a.location)} • Applied ${esc(a.date)}<br>Resume: ${esc(a.resume)}</small></div><span class="status">${esc(a.status)}</span></div>`).join("");
}
function renderCompanies(){$("companyGrid").innerHTML=COMPANIES.map(c=>`<div class="company-card">${esc(c)}<span>Hiring IT talent</span></div>`).join("");}
function modal(html){$("modalRoot").innerHTML=`<div class="modal-backdrop" onclick="if(event.target===this)closeModal()"><div class="modal">${html}</div></div>`;}
function closeModal(){$("modalRoot").innerHTML="";}
function openLogin(after){
  modal(`<div class="login-box"><div class="brand"><span class="brand-mark">C</span><span>Career<span>Hub</span></span></div><h2>${profile?"Your Profile":"Create your profile"}</h2><p class="helper">Login is stored securely in this browser demo. Connect a backend for production authentication.</p>
  <form id="loginForm" class="form-grid"><label>Full Name<input name="name" value="${esc(profile?.name||"")}" required></label><label>Email<input name="email" type="email" value="${esc(profile?.email||"")}" required></label><label>Mobile<input name="mobile" value="${esc(profile?.mobile||"")}" required></label><div class="modal-actions"><button type="button" class="btn btn-ghost" onclick="closeModal()">Cancel</button><button class="btn btn-primary">Continue</button></div></form></div>`);
  $("loginForm").addEventListener("submit",e=>{e.preventDefault();profile={name:e.target.name.value.trim(),email:e.target.email.value.trim(),mobile:e.target.mobile.value.trim()};saveState();closeModal();toast(`Welcome, ${profile.name}!`);if(after)after();});
}
function recruiter(){
  modal(`<div class="modal-head"><div><span class="eyebrow">RECRUITER</span><h2>Recruiter Dashboard</h2></div><button class="close" onclick="closeModal()">✕</button></div>
  <p>This demo dashboard shows candidate applications saved in this browser.</p>
  ${applications.length?applications.map(a=>`<div class="application"><div><strong>${esc(a.name)}</strong><small>${esc(a.job)} • ${esc(a.email)}<br>Resume: ${esc(a.resume)}</small></div><button class="btn btn-primary" onclick="contactCandidate('${encodeURIComponent(a.email)}','${encodeURIComponent(a.name)}','${encodeURIComponent(a.job)}')">Contact</button></div>`).join(""):`<div class="empty"><div>👥</div><h3>No candidates yet</h3></div>`}`);
}
function contactCandidate(email,name,job){window.location.href=`mailto:${decodeURIComponent(email)}?subject=${encodeURIComponent("Career Hub - Interview Opportunity for "+decodeURIComponent(job))}&body=${encodeURIComponent("Hello "+decodeURIComponent(name)+",\n\nWe reviewed your application for "+decodeURIComponent(job)+" through Career Hub and would like to discuss the opportunity with you.\n\nRegards,\nRecruiter")}`;}
$("heroSearch").addEventListener("submit",e=>{e.preventDefault();$("jobSearch").value=$("heroKeyword").value;$("locationFilter").value="";renderJobs();location.hash="jobs";});
["jobSearch","categoryFilter","locationFilter","typeFilter"].forEach(id=>$(id).addEventListener("input",renderJobs));
document.querySelectorAll("[data-quick]").forEach(b=>b.addEventListener("click",()=>{$("jobSearch").value=b.dataset.quick;renderJobs();location.hash="jobs";}));
$("loginBtn").addEventListener("click",()=>openLogin());
$("ctaLogin").addEventListener("click",()=>openLogin());
$("savedBtn").addEventListener("click",()=>{$("jobSearch").value="";$("categoryFilter").value="";$("locationFilter").value="";$("typeFilter").value="";$("jobGrid").innerHTML=saved.map(id=>jobCard(JOBS[id],id)).join("");$("resultCount").textContent=`${saved.length} saved job${saved.length!==1?"s":""}`;location.hash="jobs";});
$("recruiterBtn").addEventListener("click",e=>{e.preventDefault();recruiter();});
$("footerProfile").addEventListener("click",e=>{e.preventDefault();openLogin();});
$("menuBtn").addEventListener("click",()=>$("mainNav").classList.toggle("open"));
populateFilters();saveState();renderJobs();renderCompanies();renderApplications();