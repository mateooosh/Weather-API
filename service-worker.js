if(!self.define){let e,r={};const s=(s,i)=>(s=new URL(s+".js",i).href,r[s]||new Promise((r=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=r,document.head.appendChild(e)}else e=s,importScripts(s),r()})).then((()=>{let e=r[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(i,t)=>{const n=e||("document"in self?document.currentScript.src:"")||location.href;if(r[n])return;let o={};const a=e=>s(e,n),c={module:{uri:n},exports:o,require:a};r[n]=Promise.all(i.map((e=>c[e]||a(e)))).then((e=>(t(...e),o)))}}define(["./workbox-2d118ab0"],(function(e){"use strict";e.setCacheNameDetails({prefix:"weather"}),self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"/Weather-API/css/app.dd3a23f1.css",revision:null},{url:"/Weather-API/img/background.jpg",revision:"1b049ab4743a88c76e6f3ed2f82bf03e"},{url:"/Weather-API/img/background4.jpg",revision:"4ca22780a71004069e45211add9127c4"},{url:"/Weather-API/index.html",revision:"e619d37e49583699d5aaa65853cf6516"},{url:"/Weather-API/js/app.bf8dc567.js",revision:null},{url:"/Weather-API/js/chunk-vendors.a09a26b6.js",revision:null},{url:"/Weather-API/manifest.json",revision:"5d49ed019a70d6a1d2dbb823ba1ee2ec"},{url:"/Weather-API/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{})}));
//# sourceMappingURL=service-worker.js.map