/* Materi Prisma Segitiga — navigasi dan eksplorasi 3D terisolasi. */
(() => {
 const body=document.body, view=document.getElementById('prismaView');
 if(!view || view.dataset.prismaBound==='true') return; view.dataset.prismaBound='true';
 const model=view.querySelector('#prismaInteractiveModel');
 const paths={base:'assets/models/materi/prisma/01_prisma_utuh_pastel.glb',face:'assets/models/materi/prisma/02_prisma_sisi_pastel.glb',edge:'assets/models/materi/prisma/03_prisma_rusuk_pastel.glb',vertex:'assets/models/materi/prisma/04_prisma_titik_sudut_pastel.glb',net:'assets/models/materi/prisma/05_jaring_jaring_prisma_pastel.glb'};
 const modes={face:{label:'Sisi',count:5,color:'kuning dan oranye',description:'Prisma segitiga memiliki 5 sisi: 2 sisi segitiga sebagai alas dan tutup, serta 3 sisi tegak berbentuk persegi panjang.'},edge:{label:'Rusuk',count:9,color:'biru',description:'Prisma segitiga memiliki 9 rusuk: 3 rusuk pada alas, 3 pada tutup, dan 3 rusuk tegak penghubung.'},vertex:{label:'Titik Sudut',count:6,color:'oranye',description:'Prisma segitiga memiliki 6 titik sudut: 3 pada alas dan 3 pada tutup.'}};
 let activeMode='face', zoom=3.4;
 const observe=view.querySelector('.prisma-observe-layout'), shape=view.querySelector('#prismaShapeView'), build=view.querySelector('#prismaBuildView'), formula=view.querySelector('#prismaFormulaView');
 const buttons=[...view.querySelectorAll('[data-prisma-step]')], dots=[...view.querySelectorAll('.prisma-progress-dots span')];
 function stage(s){const map={observe,shape,build,formula}; Object.entries(map).forEach(([k,e])=>{if(e)e.hidden=k!==s}); buttons.forEach(b=>b.classList.toggle('is-active',b.dataset.prismaStep===s)); dots.forEach((d,i)=>d.classList.toggle('active',i===({observe:0,shape:1,build:2,formula:3}[s]))); const p=view.querySelector('.prisma-progress-dots'); if(p)p.setAttribute('aria-label',`Tahap ${{observe:1,shape:2,build:3,formula:4}[s]} dari 4`); if(s==='shape'&&model){model.src=paths[activeMode]||paths.base; model.setAttribute('camera-controls',''); model.setAttribute('auto-rotate','');} view.scrollIntoView({behavior:'smooth',block:'start'}); }
 function selection(mode){if(!modes[mode])return;activeMode=mode;view.querySelectorAll('[data-prisma-part]').forEach(b=>{let on=b.dataset.prismaPart===mode;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))}); if(model){model.src=paths[mode];model.setAttribute('camera-controls','');} const m=modes[mode]; const title=view.querySelector('#prismaSelectedTitle'),text=view.querySelector('#prismaSelectedText'),count=view.querySelector('#prismaSelectedCount'),kick=view.querySelector('#prismaSelectedKicker'); if(title)title.textContent=`${m.label} Prisma`;if(text)text.textContent=m.description;if(count)count.textContent=`Jumlah: ${m.count} ${m.label.toLowerCase()}`;if(kick)kick.textContent=`SOROTAN ${m.color.toUpperCase()}`; }
 buttons.forEach(b=>b.addEventListener('click',()=>stage(b.dataset.prismaStep)));
 view.querySelectorAll('[data-prisma-part]').forEach(b=>b.addEventListener('click',()=>selection(b.dataset.prismaPart)));
 view.querySelectorAll('[data-prisma-zoom]').forEach(b=>b.addEventListener('click',()=>{if(!model)return;const a=b.dataset.prismaZoom;if(a==='reset')zoom=3.4;else zoom=Math.max(2.2,Math.min(6,zoom*(a==='in'?.82:1.22)));model.setAttribute('camera-orbit',`35deg 72deg ${zoom.toFixed(2)}m`)}));
 const back=view.querySelector('#prismaBack'); if(back)back.addEventListener('click',()=>{if(typeof window.navigateToPage==='function')window.navigateToPage('Materi');else{body.classList.remove('page-prisma');body.classList.add('page-materi');view.classList.add('app-page-hidden');document.getElementById('materiView')?.classList.remove('app-page-hidden');}});
 const next=view.querySelector('#prismaContinue');if(next)next.addEventListener('click',()=>{let current=build&&!build.hidden?'build':formula&&!formula.hidden?'formula':shape&&!shape.hidden?'shape':'observe';stage(({observe:'shape',shape:'build',build:'formula',formula:'observe'})[current]);});
 const video=view.querySelector('#prismaWatchVideo');if(video)video.addEventListener('click',()=>document.querySelector('[data-page="Video"]')?.click());
 // Bongkar-bentuk: lima bidang SVG bergerak dengan transisi CSS; GLB khusus dipakai untuk jaring-jaring.
 const buildInfo={whole:['Prisma Segitiga Utuh','Prisma segitiga memiliki dua alas berbentuk segitiga yang kongruen dan tiga sisi tegak berbentuk persegi panjang.','5 sisi • 9 rusuk • 6 titik sudut'],explode:['Lima Sisi Terpisah','Dua sisi segitiga dan tiga sisi persegi panjang bergerak menjauh dari posisi semula. Amati bentuk setiap bidang penyusun prisma.','2 segitiga + 3 persegi panjang'],net:['Jaring-jaring Prisma','Jaring-jaring prisma segitiga tersusun atas tiga persegi panjang dan dua segitiga.','5 bidang datar'],rebuild:['Prisma Terbentuk Kembali','Kelima bidang bergerak kembali dan bertemu pada rusuk yang sesuai sehingga membentuk prisma segitiga.','5 sisi • 9 rusuk • 6 titik sudut']};
 function buildState(s){
   const d=buildInfo[s];if(!d)return;
   const stageEl=view.querySelector('#prismaBuildStage'), buildModel=view.querySelector('#prismaBuildModel'), svg=view.querySelector('#prismaBuildSvg');
   if(stageEl){stageEl.dataset.buildState=s;stageEl.dataset.buildAction=s;}
   const isNet=s==='net';
   // Tiga keadaan utama memakai lima bidang SVG yang sama agar perpindahan
   // utuh -> terurai -> utuh berlangsung di tempat, bukan mengganti ilustrasi.
   if(buildModel){
     buildModel.hidden=!isNet;
     if(isNet){
       if(!buildModel.dataset.netLoaded){buildModel.src=paths.net;buildModel.dataset.netLoaded='true';}
       buildModel.setAttribute('camera-controls','');
       buildModel.setAttribute('auto-rotate','');
       buildModel.setAttribute('auto-rotate-delay','0');
       buildModel.setAttribute('rotation-per-second','12deg');
       buildModel.setAttribute('camera-orbit','35deg 72deg 3.4m');
     }
   }
   if(svg)svg.hidden=isNet;
   const labels={whole:'BENTUK AWAL',explode:'PROSES PEMBONGKARAN',net:'BENTUK JARING-JARING',rebuild:'MENYUSUN KEMBALI'};
   const captions={whole:'Prisma utuh — dua alas segitiga dan tiga sisi tegak.',explode:'Lima bidang terpisah — dua segitiga dan tiga persegi panjang.',net:'Jaring-jaring prisma — lima bidang datar yang saling terhubung.',rebuild:'Berhasil! Lima bidang kembali membentuk prisma segitiga.'};
   [['#prismaBuildKicker',labels[s]],['#prismaBuildTitle',d[0]],['#prismaBuildText',d[1]],['#prismaBuildFact',d[2]],['#prismaBuildCaption',captions[s]]].forEach(([q,v])=>{let e=view.querySelector(q);if(e)e.textContent=v});
   view.querySelectorAll('[data-build-action]').forEach(b=>{let on=b.dataset.buildAction===s;b.classList.toggle('is-active',on);b.setAttribute('aria-pressed',String(on))});
 }
 view.querySelectorAll('[data-build-action]').forEach(b=>b.addEventListener('click',()=>buildState(b.dataset.buildAction)));
 // Rumus interaktif: alas segitiga sama sisi (sisi a) dan panjang prisma (t).
 const range=view.querySelector('#prismaSideRange'), input=view.querySelector('#prismaSideInput');let formulaMode='volume';
 function calc(v){let a=Math.max(1,Math.min(20,Number(v)||4)),t=Math.max(1,Math.min(20,Number(view.querySelector('#prismaLengthInput')?.value)||8));if(range)range.value=a;if(input)input.value=a;const area=Math.sqrt(3)/4*a*a,per=3*a,vol=area*t,lp=2*area+per*t;const put=(id,val)=>{let e=view.querySelector(id);if(e)e.textContent=val};let isV=formulaMode==='volume';put('#prismaFormulaKicker',isV?'RUMUS VOLUME':'RUMUS LUAS PERMUKAAN');put('#prismaFormulaEquation',isV?'V = L alas × tinggi prisma':'LP = 2 × L alas + K alas × tinggi prisma');put('#prismaFormulaExplanation',isV?'Volume diperoleh dengan mengalikan luas alas segitiga dan panjang prisma.':'Luas permukaan merupakan jumlah dua alas segitiga dan tiga sisi tegak.');put('#prismaFormulaCalculation',isV?`V = (${area.toFixed(2)}) × ${t}`:`LP = 2 × (${area.toFixed(2)}) + (${per.toFixed(2)} × ${t})`);put('#prismaFormulaAnswerLabel',isV?'Volume prisma':'Luas permukaan prisma');put('#prismaFormulaAnswer',`${(isV?vol:lp).toFixed(2)} cm${isV?'³':'²'}`);put('#prismaExampleSide',`${a} cm`);put('#prismaExampleText',`Untuk sisi alas ${a} cm dan panjang prisma ${t} cm, ${isV?'volume':'luas permukaan'} prisma adalah ${(isV?vol:lp).toFixed(2)} cm${isV?'³':'²'}.`);}
 range?.addEventListener('input',()=>calc(range.value));input?.addEventListener('input',()=>calc(input.value));view.querySelectorAll('[data-formula-mode]').forEach(b=>b.addEventListener('click',()=>{formulaMode=b.dataset.formulaMode;view.querySelectorAll('[data-formula-mode]').forEach(x=>{x.classList.toggle('is-active',x===b);x.setAttribute('aria-pressed',String(x===b))});calc(input?.value||4)}));view.querySelector('#prismaLengthInput')?.addEventListener('input',()=>calc(input?.value||4));
 selection('face');buildState('whole');calc(4);
 window.openPrismaMaterial=()=>{if(typeof window.openMaterialDetail==='function')window.openMaterialDetail('prismaView','page-prisma');else{body.classList.remove('page-materi');body.classList.add('page-prisma');view.classList.remove('app-page-hidden');view.setAttribute('aria-hidden','false');}stage('observe')};
})();