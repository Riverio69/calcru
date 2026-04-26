import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const EMBED_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#0f1210;color:#e8e8e0;min-height:100vh}
.calc-wrap{max-width:1100px;margin:0 auto;padding:32px 16px}
.calc-grid{display:grid;grid-template-columns:1fr;gap:24px;align-items:start}
@media(min-width:1024px){.calc-grid{grid-template-columns:1fr 340px}}
.section{background:#171c18;border:1px solid #2a2f2c;border-radius:16px;padding:24px 28px}
.section-title{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:#a3e635;margin-bottom:20px}
.options-wrap{display:flex;flex-wrap:wrap;gap:12px}
.opt-btn{background:#1e2420;border:1px solid #2a2f2c;border-radius:12px;padding:14px 20px;cursor:pointer;transition:all .2s;text-align:left;color:#e8e8e0;font-family:'Inter',sans-serif}
.opt-btn:hover{border-color:rgba(163,230,53,.4)}
.opt-btn.active{background:rgba(163,230,53,.12);border-color:#a3e635}
.opt-btn .lbl{display:block;font-size:14px;font-weight:500}
.opt-btn .sub{display:block;font-size:12px;margin-top:2px;color:#6b7064}
.opt-btn.active .sub{color:#a3e635}
.feat-grid{display:grid;grid-template-columns:1fr;gap:12px}
@media(min-width:640px){.feat-grid{grid-template-columns:1fr 1fr}}
.feat-btn{display:flex;align-items:center;justify-content:space-between;background:#1e2420;border:1px solid #2a2f2c;border-radius:12px;padding:14px 20px;cursor:pointer;transition:all .2s;color:#e8e8e0;font-family:'Inter',sans-serif}
.feat-btn:hover{border-color:rgba(163,230,53,.4)}
.feat-btn.active{background:rgba(163,230,53,.12);border-color:#a3e635}
.feat-btn .price{font-family:'JetBrains Mono',monospace;font-size:12px;color:#6b7064}
.feat-btn.active .price{color:#a3e635}
.qual-wrap{display:flex;flex-wrap:wrap;gap:12px}
.qual-btn{flex:1;min-width:140px;padding:16px 20px;text-align:center;background:#1e2420;border:1px solid #2a2f2c;border-radius:12px;cursor:pointer;transition:all .2s;color:#e8e8e0;font-family:'Inter',sans-serif}
.qual-btn:hover{border-color:rgba(163,230,53,.4)}
.qual-btn.active{background:rgba(163,230,53,.12);border-color:#a3e635}
.qual-btn .qlbl{display:block;font-size:14px;font-weight:600}
.qual-btn.active .qlbl{color:#a3e635}
.qual-btn .qmul{display:block;font-size:12px;margin-top:4px;font-family:'JetBrains Mono',monospace;color:#6b7064}
.qual-btn.active .qmul{color:rgba(163,230,53,.7)}
.sidebar{background:#171c18;border:1px solid #2a2f2c;border-radius:16px;padding:24px 28px;position:sticky;top:24px}
.est-total{font-size:42px;font-weight:800;color:#a3e635;letter-spacing:-0.02em;margin-bottom:4px}
.est-range{font-family:'JetBrains Mono',monospace;font-size:14px;color:#6b7064;margin-bottom:24px}
.line-items{border-top:1px solid #2a2f2c;padding-top:16px;margin-bottom:16px}
.line-item{display:flex;justify-content:space-between;font-size:14px;padding:4px 0}
.line-item .li-label{color:#6b7064}
.line-item .li-val{color:#e8e8e0;font-weight:500}
.note{font-size:12px;color:#6b7064;margin-bottom:24px}
.btn-quote{width:100%;background:#a3e635;color:#0f1210;font-weight:600;font-size:14px;padding:14px 24px;border:none;border-radius:12px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;font-family:'Inter',sans-serif}
.btn-quote:hover{background:#b5ec5a}
.btn-reset{width:100%;background:#1e2420;color:#9ca390;font-weight:500;font-size:14px;padding:12px 24px;border:1px solid #2a2f2c;border-radius:12px;cursor:pointer;transition:all .2s;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:12px;font-family:'Inter',sans-serif}
.btn-reset:hover{background:#252b27}
</style>
</head>
<body>
<div class="calc-wrap">
<div class="calc-grid">
<div id="left-col">
  <div class="section" style="margin-bottom:24px">
    <div class="section-title">01 — Project Type</div>
    <div class="options-wrap" id="project-options"></div>
  </div>
  <div class="section" style="margin-bottom:24px">
    <div class="section-title">02 — Features</div>
    <div class="feat-grid" id="feature-options"></div>
  </div>
  <div class="section">
    <div class="section-title">03 — Quality Level</div>
    <div class="qual-wrap" id="quality-options"></div>
  </div>
</div>
<div class="sidebar" id="sidebar">
  <div class="section-title">Estimated Budget</div>
  <div class="est-total" id="total-price">€0</div>
  <div class="est-range" id="range-price">— €0</div>
  <div class="line-items" id="line-items"></div>
  <div class="note">* Rough estimate. Exact quote after free consultation.</div>
  <button class="btn-quote" onclick="getQuote()">Get Exact Quote <span style="font-size:16px">→</span></button>
  <button class="btn-reset" onclick="resetAll()">↻ Reset</button>
</div>
</div>
</div>
<script>
const PROJECTS=[{id:'mobile',label:'Mobile App',price:8000},{id:'web',label:'Web Platform',price:6000},{id:'ecommerce',label:'E-Commerce',price:7000},{id:'branding',label:'Branding',price:3000},{id:'saas',label:'SaaS Product',price:15000}];
const FEATURES=[{id:'auth',label:'Auth & User Accounts',price:1500},{id:'payment',label:'Payment Integration',price:2000},{id:'admin',label:'Admin Dashboard',price:2500},{id:'api',label:'Third-party API',price:1000},{id:'analytics',label:'Analytics & Reports',price:1500},{id:'push',label:'Push Notifications',price:1000},{id:'multilingual',label:'Multilingual Support',price:1200},{id:'chat',label:'Live Chat / Messaging',price:2500}];
const QUALITY=[{id:'mvp',label:'MVP (fast)',mul:1},{id:'full',label:'Full Product',mul:1.4},{id:'premium',label:'Premium Quality',mul:1.8}];
let selProject=null,selFeatures=[],selQuality=QUALITY[0];

function render(){
  const po=document.getElementById('project-options');
  po.innerHTML=PROJECTS.map(p=>'<button class="opt-btn'+(selProject&&selProject.id===p.id?' active':'')+'" onclick="toggleProject(\\''+p.id+'\\')"><span class="lbl">'+p.label+'</span><span class="sub">from €'+p.price.toLocaleString()+'</span></button>').join('');
  const fo=document.getElementById('feature-options');
  fo.innerHTML=FEATURES.map(f=>'<button class="feat-btn'+(selFeatures.some(s=>s.id===f.id)?' active':'')+'" onclick="toggleFeature(\\''+f.id+'\\')"><span class="lbl" style="font-size:14px;font-weight:500">'+f.label+'</span><span class="price">+€'+f.price.toLocaleString()+'</span></button>').join('');
  const qo=document.getElementById('quality-options');
  qo.innerHTML=QUALITY.map(q=>'<button class="qual-btn'+(selQuality.id===q.id?' active':'')+'" onclick="setQuality(\\''+q.id+'\\')"><span class="qlbl">'+q.label+'</span><span class="qmul">×'+q.mul+'</span></button>').join('');
  const base=selProject?selProject.price:0;
  const feat=selFeatures.reduce((s,f)=>s+f.price,0);
  const total=Math.round((base+feat)*selQuality.mul);
  const rangeMax=Math.round(total*1.35);
  document.getElementById('total-price').textContent='€'+total.toLocaleString();
  document.getElementById('range-price').textContent='— €'+rangeMax.toLocaleString();
  let lines='';
  if(selProject)lines+='<div class="line-item"><span class="li-label">'+selProject.label+'</span><span class="li-val">€'+selProject.price.toLocaleString()+'</span></div>';
  selFeatures.forEach(f=>{lines+='<div class="line-item"><span class="li-label">'+f.label+'</span><span class="li-val">€'+f.price.toLocaleString()+'</span></div>'});
  if(selQuality.mul!==1)lines+='<div class="line-item"><span class="li-label">Quality ×'+selQuality.mul+'</span><span class="li-val">'+selQuality.label+'</span></div>';
  document.getElementById('line-items').innerHTML=lines;
}
function toggleProject(id){const p=PROJECTS.find(x=>x.id===id);selProject=selProject&&selProject.id===id?null:p;render()}
function toggleFeature(id){const f=FEATURES.find(x=>x.id===id);selFeatures=selFeatures.some(s=>s.id===id)?selFeatures.filter(s=>s.id!==id):[...selFeatures,f];render()}
function setQuality(id){selQuality=QUALITY.find(x=>x.id===id);render()}
function resetAll(){selProject=null;selFeatures=[];selQuality=QUALITY[0];render()}
function getQuote(){const base=selProject?selProject.price:0;const feat=selFeatures.reduce((s,f)=>s+f.price,0);const total=Math.round((base+feat)*selQuality.mul);const msg='Project: '+(selProject?selProject.label:'Not selected')+'\\nFeatures: '+(selFeatures.length?selFeatures.map(f=>f.label).join(', '):'None')+'\\nQuality: '+selQuality.label+' (×'+selQuality.mul+')\\nEstimated: €'+total.toLocaleString();alert(msg)}
render();
<\/script>
</body>
</html>`;

export default function EmbedCode() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(EMBED_HTML);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background font-inter p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-foreground mb-2">HTML Embed Code</h1>
        <p className="text-muted-foreground text-sm mb-6">
          Скопируйте этот код и вставьте в блок HTML в Тильде.
        </p>
        <Button onClick={handleCopy} className="mb-4 gap-2">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Скопировано!' : 'Копировать HTML код'}
        </Button>
        <div className="relative">
          <pre className="bg-card border border-border rounded-xl p-4 overflow-auto max-h-[500px] text-xs text-muted-foreground font-mono whitespace-pre-wrap">
            {EMBED_HTML}
          </pre>
        </div>
      </div>
    </div>
  );
}