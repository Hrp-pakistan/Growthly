function toggleChat(){document.getElementById('chatPanel').classList.toggle('open')}
function sendLead(){
 const name=document.getElementById('chatName').value||'Client';
 const phone=document.getElementById('chatPhone').value||'Not provided';
 const service=document.getElementById('chatService').value||'Service';
 const msg=`Hello Growthly, I am ${name}. Phone: ${phone}. I need help with: ${service}.`;
 window.open(`https://wa.me/923194482187?text=${encodeURIComponent(msg)}`,'_blank');
}
function generateIdea(){
 const b=document.getElementById('business')?.value||'your business';
 const i=document.getElementById('industry')?.value||'your industry';
 const s=document.getElementById('service')?.value||'your product/service';
 const a=document.getElementById('audience')?.value||'your target audience';
 const p=document.getElementById('platform')?.value||'Facebook';
 const output=`Ad Hook: Stop wasting budget on ads that only get views — make ${b} stand out with a clear offer.\n\nCaption: ${b} helps ${a} with ${s}. Build trust, show the result, and invite people to message now.\n\nCTA: Send Message / Book Consultation\n\nCreative Idea: Use a premium close-up product or service visual with bold text, a real human presenter, and a simple before-after pain point.\n\nUGC Concept: A customer-style video: “I was looking for a reliable solution in ${i}, then I found ${b}.”\n\nSuggested Campaign Objective: ${p} leads or messages campaign.`;
 document.getElementById('ideaResult').innerText=output;
}
function filterItems(cat){
 document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
 event.target.classList.add('active');
 document.querySelectorAll('.portfolio-item').forEach(item=>{
   item.style.display=(cat==='all'||item.classList.contains(cat))?'block':'none';
 });
}