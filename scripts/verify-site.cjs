const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const base=process.env.SITE_URL||'http://127.0.0.1:8895';
const output='.test-server/qa';fs.mkdirSync(output,{recursive:true});
const pages=process.env.QA_FOCUSED?['/']:['/','/devlogs/index.html','/devlogs/posts/001.html','/devlogs/posts/002.html','/sackjack-island/index.html','/sackjack-island/about.html','/sackjack-island/gallery.html','/sackjack-island/demo.html','/studio/about.html','/studio/contact.html','/studio/store.html'];
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const result={layouts:[],failures:[],nojs:[],errors:[],csp:[],externalFailures:[],icons:[]};
 for(const width of (process.env.QA_FOCUSED?[390]:[320,390,768,1440])){
  for(const url of pages){
   const p=await browser.newPage({viewport:{width,height:900}});
   p.on('pageerror',e=>result.errors.push({url,error:e.message}));
   await p.addInitScript(()=>{window.policyViolations=[];document.addEventListener('securitypolicyviolation',e=>window.policyViolations.push({directive:e.effectiveDirective,uri:e.blockedURI}));});
   p.on('requestfailed',r=>{if(!r.url().startsWith(base))result.externalFailures.push(r.url())});
   const responses=[];p.on('response',r=>{if(r.url().startsWith(base)&&r.status()>=400)responses.push(r.url())});
   await p.goto(base+url,{waitUntil:'networkidle'});await p.evaluate(()=>document.fonts.ready);
   const state=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth,main:document.querySelectorAll('main').length,mainOutsideHeader:!document.querySelector('main').closest('header'),images:[...document.images].every(i=>i.complete&&i.naturalWidth>0),referrer:document.querySelector('meta[name=referrer]').content,active:[...document.querySelectorAll('.main-nav [aria-current]')].map(a=>a.textContent),videos:document.querySelectorAll('video').length,fonts:[...document.fonts].map(f=>({family:f.family,status:f.status})),violations:window.policyViolations}));
   assert(!state.overflow,url+' overflow '+width);assert.equal(state.main,1);assert(state.mainOutsideHeader);assert(state.images,url+' images');assert.equal(state.referrer,'no-referrer');assert.equal(state.active.length,1,url+' active nav');assert.deepEqual(responses,[]);assert.deepEqual(state.violations,[]);
   await p.keyboard.press('Tab');assert.equal(await p.locator(':focus').textContent(),'Skip to content');
   await p.keyboard.press('Enter');assert.equal(await p.locator(':focus').getAttribute('id'),'main-content');
   if(url==='/'){
    assert.equal(await p.locator('.hero-actions a').first().textContent(),'Follow on Threads');
    if(width<=768){
     const toggle=p.locator('.mobile-menu-toggle');const nav=p.locator('.main-nav');
     assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert(await nav.evaluate(n=>n.inert));
     await toggle.focus();await p.keyboard.press('Enter');assert.equal(await toggle.getAttribute('aria-expanded'),'true');
     await p.keyboard.press('Tab');
     await nav.locator('a').first().focus();await p.keyboard.press('Escape');assert.equal(await toggle.getAttribute('aria-expanded'),'false');assert(await toggle.evaluate(t=>t===document.activeElement),JSON.stringify(await p.evaluate(()=>({focus:document.activeElement.outerHTML,expanded:document.querySelector('button').getAttribute('aria-expanded')}))));
     await p.keyboard.press('Space');assert.equal(await toggle.getAttribute('aria-expanded'),'true');
     await nav.locator('a').first().focus();await p.keyboard.press('Tab');assert.equal(await p.locator(':focus').textContent(),'Earlier game');
     await p.keyboard.press('Escape');
     await toggle.focus();await p.screenshot({path:`${output}/focus-${width}.png`});
    }
    await p.locator('.secondary-action').focus();await p.screenshot({path:`${output}/hero-focus-${width}.png`});
    await p.locator('.secondary-action').click();assert.equal(new URL(p.url()).hash,'#gameplay');
   }
   if(url.includes('gallery')){
    const images=p.locator('.gallery-item:has(img)');assert.equal(await images.count(),2);
    const link=images.first();assert.equal(await link.getAttribute('href'),await link.locator('img').getAttribute('src'));
    await link.focus();await p.keyboard.press('Enter');await p.waitForURL('**/*.png');assert(p.url().endsWith('.png'));await p.goBack({waitUntil:'networkidle'});
   }
   await p.evaluate(()=>{document.activeElement?.blur();scrollTo(0,0)});
   const name=url==='/'?'home':url.replace(/^\//,'').replaceAll('/','-').replace('.html','');
   await p.screenshot({path:`${output}/${name}-${width}.png`,fullPage:true});
   result.layouts.push({url,width,...state});await p.close();
  }
 }
 for(const failure of ['network',404,500]){
  const p=await browser.newPage({viewport:{width:390,height:900}});
  await p.route('**/partials/*.html',r=>failure==='network'?r.abort():r.fulfill({status:failure,contentType:'text/html',body:'<h1>Bad partial</h1>'}));
  await p.goto(base+'/',{waitUntil:'networkidle'});assert.equal(await p.locator('.main-nav a').count(),6);assert.equal(await p.locator('.footer-nav a').count(),4);assert.equal(await p.getByText('Bad partial').count(),0);
  await p.locator('.mobile-menu-toggle').click();assert(await p.locator('.main-nav a').first().isVisible());await p.locator('.main-nav a').first().focus();await p.keyboard.press('Escape');assert.equal(await p.locator('.mobile-menu-toggle').getAttribute('aria-expanded'),'false');assert.equal(await p.locator(':focus').getAttribute('aria-controls'),'primary-navigation');
  result.failures.push({failure,navigation:true,footer:true,menu:true,escape:true});await p.close();
 }

 // A late successful response preserves an already engaged fallback menu.
 const delayed=await browser.newPage({viewport:{width:390,height:900}});
 let release;const held=new Promise(resolve=>{release=resolve});
 await delayed.route('**/partials/header.html',async route=>{await held;await route.continue()});
 await delayed.goto(base+'/',{waitUntil:'domcontentloaded'});
 await delayed.locator('.mobile-menu-toggle').click();
 const original=await delayed.locator('.main-nav').elementHandle();
 await delayed.locator('.main-nav a').first().focus();
 release();await delayed.waitForLoadState('networkidle');
 assert(await original.evaluate(n=>n.isConnected));assert.equal(await delayed.locator('.mobile-menu-toggle').getAttribute('aria-expanded'),'true');
 assert.equal(await delayed.locator(':focus').textContent(),'Home');await delayed.keyboard.press('Escape');assert.equal(await delayed.locator(':focus').getAttribute('aria-controls'),'primary-navigation');
 result.delayedSuccessPreservesFocus=true;await delayed.close();
 for(const url of pages){
  const p=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:900}});await p.goto(base+url,{waitUntil:'networkidle'});
  assert(await p.locator('.main-nav a').first().isVisible());assert(await p.locator('.footer-nav a').first().isVisible());assert(!await p.locator('.mobile-menu-toggle').isVisible());assert.equal(await p.locator('main').count(),1);assert(!await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  result.nojs.push(url);if(url==='/')await p.screenshot({path:`${output}/home-nojs-320.png`,fullPage:true});await p.close();
 }
 const p=await browser.newPage();await p.goto(base+'/studio/contact.html',{waitUntil:'networkidle'});
 for(const img of await p.locator('.social-links img').all()){const src=await img.getAttribute('src');const r=await p.request.get(base+src);const size=(await r.body()).length;assert(size<7000);result.icons.push({src,bytes:size,rendered:await img.evaluate(i=>({width:i.width,height:i.height}))});}
 // Verify enforced script policy without adding any permissive script directive.
 await p.evaluate(()=>{const script=document.createElement('script');script.textContent='window.untrustedInlineRan=true';document.body.append(script)});assert(!await p.evaluate(()=>window.untrustedInlineRan));
 await p.route('https://example.com/referrer-check',async r=>{assert.equal(r.request().headers()['referer'],undefined);await r.fulfill({status:200,contentType:'text/html',body:'referrer check'});});
 await p.evaluate(()=>{const a=document.createElement('a');a.href='https://example.com/referrer-check';a.textContent='referrer test';document.body.append(a);a.click()});await p.waitForURL('https://example.com/referrer-check');
 result.referrerNavigation=true;result.inlineScriptBlocked=true;
 const redirect=await browser.newPage();await redirect.goto(base+'/beta/');await redirect.waitForURL('**/play/sackjack/build/');result.betaRedirect=redirect.url();await redirect.close();
 assert.deepEqual(result.errors,[]);
 fs.writeFileSync(output+(process.env.QA_FOCUSED?'/focused-results.json':'/results.json'),JSON.stringify(result,null,2));
 console.log(JSON.stringify({delayedSuccessPreservesFocus:result.delayedSuccessPreservesFocus,layouts:result.layouts.length,nojs:result.nojs.length,failures:result.failures,icons:result.icons,errors:result.errors,externalFailures:[...new Set(result.externalFailures)],inlineScriptBlocked:result.inlineScriptBlocked,referrerNavigation:result.referrerNavigation},null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
