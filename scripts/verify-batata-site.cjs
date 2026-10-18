const { chromium } = require('playwright');
const fs = require('fs');
const base = process.env.SITE_URL || 'http://127.0.0.1:8766';
fs.mkdirSync('.test-server', {recursive:true});
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.CHROME_PATH || 'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
 const result={layouts:[],playback:[],errors:[],badResponses:[]};
 for(const width of [1440,1024,768,390,360,320]){
  const page=await browser.newPage({viewport:{width,height:1000}}); const videos=[];
  page.on('request',r=>{if(/\.(mp4|webm)(\?|$)/.test(r.url()))videos.push(r.url())});
  page.on('pageerror',e=>result.errors.push(e.message));
  page.on('response',r=>{if(r.status()>=400)result.badResponses.push([r.status(),r.url()])});
  await page.goto(base+'/',{waitUntil:'networkidle'});
  await page.locator('#luckys').scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  await page.locator('#development').scrollIntoViewIfNeeded(); await page.waitForTimeout(300);
  const geometry=await page.evaluate(()=>{const a=document.querySelector('.hero-art').getBoundingClientRect(),m=document.querySelector('.batata-title-panel').getBoundingClientRect();return {overflow:document.documentElement.scrollWidth>innerWidth,maskTop:(m.top-a.top)/a.height,maskBottom:m.bottom>=a.bottom-3,opaque:getComputedStyle(document.querySelector('.batata-title-panel')).backgroundColor,videoElements:document.querySelectorAll('video').length}});
  for(const section of await page.locator('main>section').all()){await section.scrollIntoViewIfNeeded();} await page.locator('body').evaluate(()=>scrollTo(0,0)); await page.waitForTimeout(200);
  await page.screenshot({path:`.test-server/home-${width}.png`,fullPage:true});
  result.layouts.push({width,...geometry,videoRequestsBeforePlay:videos.length});
  await page.locator('.rules-details summary').focus(); await page.keyboard.press('Enter');
  if(!await page.locator('.rules-details').evaluate(d=>d.open)) throw Error('Keyboard details failed');
  await page.locator('.rules-details summary').press('Enter');
  if(width===390){await page.locator('#luckys').scrollIntoViewIfNeeded();await page.screenshot({path:'.test-server/luckys-mobile.png'});}
  if(width===1440){
   for(let i=0;i<2;i++){
    const player=page.locator('[data-video-player]').nth(i); await player.locator('button').focus(); await page.keyboard.press(i===1?'Space':'Enter');
    await player.locator('video').waitFor(); await page.waitForFunction(i=>document.querySelectorAll('[data-video-player]')[i].querySelector('video').currentTime>0.1,i);
    if(i===0){await player.locator('video').evaluate(v=>v.requestFullscreen());result.fullscreen=await page.evaluate(()=>!!document.fullscreenElement);await page.evaluate(()=>document.exitFullscreen());} result.playback.push(await player.locator('video').evaluate(v=>({src:v.currentSrc,playing:!v.paused,controls:v.controls,inline:v.playsInline,muted:v.muted,width:v.videoWidth,height:v.videoHeight})));
    await player.locator('video').evaluate(v=>{v.pause();v.currentTime=v.duration-.1;v.play()});
    await page.waitForTimeout(400);await player.locator('video').evaluate(v=>{v.currentTime=0;return v.play()});
   }
   await page.locator('#luckys').scrollIntoViewIfNeeded();await page.screenshot({path:'.test-server/luckys-desktop.png'});
  }
  await page.close();
 }
 const failed=await browser.newPage(); await failed.route('**/*.mp4',r=>r.abort()); await failed.goto(base+'/'); await failed.getByRole('button',{name:'Play Ace video'}).click();await failed.waitForTimeout(700);
 result.failure=await failed.locator('[data-video-player]').first().evaluate(p=>({status:p.querySelector('[role=status]').textContent,previewVisible:!p.querySelector('img').hidden,retryVisible:!p.querySelector('button').hidden}));await failed.close();
 const nojs=await browser.newPage({javaScriptEnabled:false,viewport:{width:320,height:900}});let nojsRequests=0;nojs.on('request',r=>{if(/\.(mp4|webm)$/.test(r.url()))nojsRequests++});await nojs.goto(base+'/');result.nojs={requests:nojsRequests,nav:await nojs.locator('.fallback-nav').isVisible(),previews:await nojs.locator('[data-video-player] img').count(),buttons:await nojs.getByRole('button').count()};await nojs.screenshot({path:'.test-server/nojs-320.png',fullPage:true});
 const reduced=await browser.newPage({reducedMotion:'reduce'});await reduced.goto(base+'/');result.reducedMotion=await reduced.evaluate(()=>({matches:matchMedia('(prefers-reduced-motion: reduce)').matches,animations:document.getAnimations().length,videos:document.querySelectorAll('video').length}));
 for(const url of ['/devlog/index.html','/devlogs/posts/001.html','/devlogs/posts/002.html','/about/index.html','/devlogs/index.html','/sackjack-island/index.html','/sackjack-island/demo.html','/sackjack-island/about.html','/studio/store.html','/studio/about.html','/studio/contact.html']){const p=await browser.newPage();p.on('pageerror',e=>result.errors.push(e.message));await p.goto(base+url,{waitUntil:'networkidle'});await p.close()}
 result.about=[];
 for(const width of [1440,390,320]){
  const p=await browser.newPage({viewport:{width,height:1000}});
  await p.goto(base+'/about/index.html',{waitUntil:'networkidle'});
  const state=await p.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,imagesLoaded:[...document.images].every(i=>i.complete&&i.naturalWidth>0),placeholder:document.body.innerText.includes('Temporary studio banner placeholder')}));
  if(state.overflow||!state.imagesLoaded||state.placeholder) throw Error('About layout or assets failed at '+width);
  result.about.push(state); await p.screenshot({path:`.test-server/about-${width}.png`,fullPage:true}); await p.close();
 }
 fs.writeFileSync('.test-server/qa-results.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));await browser.close();
 const assert=require('node:assert/strict');
 for(const layout of result.layouts){assert.equal(layout.overflow,false);assert.equal(layout.videoRequestsBeforePlay,0);assert.equal(layout.videoElements,0);assert.equal(layout.opaque,'rgb(6, 11, 21)');assert(layout.maskBottom);}
 assert.equal(result.playback.length,2);assert(result.playback.every(v=>v.playing&&v.controls&&v.inline&&v.muted));assert(result.fullscreen);assert(result.failure.previewVisible&&result.failure.retryVisible);assert.equal(result.nojs.requests,0);assert(result.nojs.nav);assert.equal(result.nojs.buttons,0);assert.equal(result.nojs.previews,2);assert.equal(result.reducedMotion.animations,0);assert.equal(result.errors.length,0);assert.equal(result.badResponses.length,0);
})().catch(e=>{console.error(e);process.exit(1)});
