import './style.css';
const app = document.getElementById('app');
app.innerHTML = `
<div class="shell">
  <nav><a class="brand" href="https://boxsignal.uk">BOX <span>SIGNAL</span></a><span class="beta">TWIN AI / EXPERIMENT 001</span></nav>
  <main>
    <div class="eyebrow">TWO MINDS. ONE QUESTION.</div>
    <h1>TWIN <em>AI</em></h1>
    <p class="tagline">One to think. <strong>One to check.</strong></p>
    <div class="brains" aria-label="Twin AI processing status">
      <div class="brain" id="thinkBrain"><div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="core"><span>01</span></div><div class="brain-label">THINK</div><div class="brain-note">Construct an answer</div></div>
      <div class="linker"><span></span><span></span><span></span></div>
      <div class="brain" id="checkBrain"><div class="orbit orbit-a"></div><div class="orbit orbit-b"></div><div class="core"><span>02</span></div><div class="brain-label">CHECK</div><div class="brain-note">Challenge the answer</div></div>
    </div>
    <form id="askForm" class="ask"><label for="question">ASK TWIN AI</label><textarea id="question" rows="3" minlength="3" maxlength="4000" placeholder="What would you like the two minds to examine?" required></textarea><div class="form-foot"><span>Two independent passes. Not proof of truth.</span><button type="submit" id="askBtn">BEGIN ANALYSIS <span>↗</span></button></div></form>
    <div id="status" class="status" role="status" aria-live="polite"></div>
    <section id="results" class="results" hidden>
      <article><div class="result-heading"><span>01 / INITIAL ANSWER</span><span class="dot"></span></div><div id="initial" class="answer"></div></article>
      <article><div class="result-heading"><span>02 / CRITICAL REVIEW</span><span class="dot"></span></div><div id="review" class="answer"></div></article>
      <article class="final"><div class="result-heading"><span>03 / CONSIDERED RESPONSE</span><span class="dot"></span></div><div id="final" class="answer"></div></article>
    </section>
    <p class="disclaimer">Twin AI uses model-based review. Agreement is not verification. Important facts should be checked against reliable independent sources.</p>
  </main>
  <footer>AN EXPERIMENT BY <a href="https://boxsignal.uk">BOX SIGNAL</a><span>MADE TO QUESTION, NOT JUST ANSWER.</span></footer>
</div>`;
const form = document.querySelector('#askForm'), btn=document.querySelector('#askBtn'), status=document.querySelector('#status'), results=document.querySelector('#results');
function setState(phase){document.querySelector('#thinkBrain').classList.toggle('active',phase==='think');document.querySelector('#checkBrain').classList.toggle('active',phase==='check');}
function displayText(id,text){document.getElementById(id).textContent=text||'No response returned.'}
form.addEventListener('submit', async e=>{
e.preventDefault(); const question=document.querySelector('#question').value.trim(); if(question.length<3)return;
btn.disabled=true; results.hidden=true;status.textContent='Two minds are examining your question…';setState('think');
try{
 const response=await fetch('/api/twin',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question})});
 const data=await response.json();if(!response.ok)throw new Error(data.error||'Unable to process request.');
 status.textContent='Analysis complete.';setState('');displayText('initial',data.initial);displayText('review',data.review);displayText('final',data.final);results.hidden=false;results.scrollIntoView({behavior:'smooth',block:'start'});
}catch(err){status.textContent='Unable to complete: '+err.message;setState('');}finally{btn.disabled=false;}
});
