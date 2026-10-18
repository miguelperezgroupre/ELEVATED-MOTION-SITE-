// @ts-nocheck
/**
 * BuyView — preview build with the shared <PageHero /> (same system as the homepage hero).
 *
 * The original source file for this view could not be retrieved through the Vercel connector
 * (deployment file contents are truncated), so this module was reconstructed from the deployed
 * production bundle (dpl_A8yVtGpcRMzQVh91pmJ4fq1uMakZ, Oct 7 2026). Everything below the hero is
 * behaviourally identical to production; only the page hero section was replaced.
 * Readable (formatted) copy kept in the source kit. Swap in the real source when it is located.
 */
import*as R from'react';import*as n from'react/jsx-runtime';import*as wn__mod from'../../services/idxService';import*as nx__mod from'../ListingCard';import{PROPERTIES as zt}from'../../data';
import PageHero from'../PageHero';
const ev=24;
const wn=wn__mod.idxService??Object.values(wn__mod).find(x=>x&&typeof x==='object'&&typeof x.getProperties==='function');
const nx=nx__mod.default??nx__mod.ListingCard??Object.values(nx__mod).find(x=>typeof x==='function');
function BuyView({onSelectProperty:m,onOpenContact:u,onNavigateToNeighborhoods:d}){const[c,x]=R.useState(zt),[g,C]=R.useState(true),[A,_]=R.useState(false);return R.useEffect(()=>{let E=false;return C(true),wn.getProperties({limit:ev,sort:'ListPrice desc',status:'Active',farmAreas:true}).then(v=>{E||v&&v.length>0&&(x(v),_(true));}).catch(()=>{}).finally(()=>{E||C(false);}),()=>{E=true;};},[]),n.jsxs('div',{className:'relative min-h-screen pb-20',children:[n.jsx(PageHero,{page:'buy',onOpenContact:u}),n.jsx('section',{className:'sfe-ivory bg-[#0e1416]',children:n.jsxs('div',{className:'wrap pb-4 pt-8',children:[n.jsx('div',{className:'flex items-center justify-between mb-6',children:n.jsx('p',{className:'text-[12px] uppercase tracking-[0.12em] text-[#f4efe2]/40',children:g?'Loading listings...':`${c.length} ${c.length===1?'property':'properties'}${A?' · live MLS':' · featured sample'}`})}),n.jsx('div',{className:'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5',children:c.map(E=>n.jsx(nx,{property:E,onClick:m},E.id))}),!g&&c.length===0&&n.jsxs('div',{className:'text-center py-16 border border-[#f4efe2]/10 rounded-lg',children:[n.jsx('p',{className:'text-[#f4efe2]/60 text-lg mb-2',children:'No listings available right now'}),n.jsx('p',{className:'text-[#f4efe2]/40 text-sm mb-6',children:'The MLS feed is temporarily unavailable — check back shortly.'})]}),n.jsx('div',{className:'mt-10 text-center',children:n.jsx('button',{onClick:()=>u('buyer','I\'m interested in a property listed on the site'),className:'px-8 py-3 text-[11px] uppercase tracking-[0.15em] text-[#c8a96e] border border-[#c8a96e]/30 hover:bg-[#c8a96e]/10 transition-colors rounded',children:'Inquire About a Property'})}),n.jsx('p',{className:'text-[10px] text-[#f4efe2]/30 mt-8 text-center leading-relaxed',children:'The multiple listing information is provided by the Miami Association of REALTORS® from a copyrighted compilation of listings. The compilation of listings and each individual are ©2026 Miami Association of REALTORS®. All Rights Reserved. Information is deemed reliable but not guaranteed.'})]})})]});}export{BuyView as default};
