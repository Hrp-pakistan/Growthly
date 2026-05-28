// Growthly Digital Marketing Website Script
// This file provides interactivity: mobile menu toggling, accordion
// behaviour for FAQs, simple chatbot and ad idea generator logic,
// animated counters and scroll reveals. It also demonstrates how
// agentic AI features can improve user experience by qualifying
// leads and suggesting campaigns【327088970438783†L319-L338】.

document.addEventListener('DOMContentLoaded', () => {
  /* Mobile menu logic */
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const closeBtn = document.querySelector('.close-btn');

  hamburger && hamburger.addEventListener('click', () => {
    mobileMenu.classList.add('active');
  });
  closeBtn && closeBtn.addEventListener('click', () => {
    mobileMenu.classList.remove('active');
  });

  // Close mobile menu when clicking a link
  mobileMenu && mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('active');
    });
  });

  /* FAQ accordion */
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      item.classList.toggle('active');
    });
  });

  /* Animated stats */
  const counters = document.querySelectorAll('[data-count]');
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-count');
        const current = +counter.innerText.replace(/\+/g, '');
        const increment = target / 200; // adjust speed
        if (current < target) {
          counter.innerText = Math.ceil(current + increment) + '+';
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target + '+';
        }
      };
      updateCount();
    });
  };
  // Trigger counters when in view
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.6 });
  const statsContainer = document.querySelector('.hero-stats');
  if (statsContainer) {
    counterObserver.observe(statsContainer);
  }

  /* Scroll reveal animations */
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, { threshold: 0.2 });
  revealElements.forEach(el => revealObserver.observe(el));

  /* Chatbot logic */
  const chatBtn = document.querySelector('.floating-chat');
  const chatBox = document.querySelector('.chatbox');
  const chatClose = chatBox?.querySelector('.close');
  const chatMessages = chatBox?.querySelector('.chatbox-body');
  const chatInput = chatBox?.querySelector('.chatbox-footer input');
  const chatSend = chatBox?.querySelector('.chatbox-footer button');

  const botReplies = {
    greeting: 'Hello! How can I assist you? Ask about services, packages or book a consultation.',
    services: 'We offer Social Media Marketing, Management, Graphic Design, Video & UGC, Web & App Development, SEO and more.',
    packages: 'Our packages start from PKR 5,000 for Website traffic and vary by service. Visit the Packages page for full details.',
    contact: 'You can reach us via WhatsApp at +92 319 4482187 or the contact form on our Contact page.'
  };

  function addMessage(text, sender = 'bot') {
    const msgEl = document.createElement('div');
    msgEl.classList.add('message', sender);
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.innerText = text;
    msgEl.appendChild(bubble);
    chatMessages?.appendChild(msgEl);
    chatMessages?.scrollTo(0, chatMessages.scrollHeight);
  }

  chatBtn && chatBtn.addEventListener('click', () => {
    chatBox?.classList.toggle('active');
    if (chatBox?.classList.contains('active') && chatMessages?.children.length === 0) {
      addMessage(botReplies.greeting);
    }
  });
  chatClose && chatClose.addEventListener('click', () => {
    chatBox?.classList.remove('active');
  });
  chatSend && chatSend.addEventListener('click', () => {
    const userMsg = chatInput.value.trim();
    if (!userMsg) return;
    addMessage(userMsg, 'user');
    chatInput.value = '';
    setTimeout(() => {
      // simple keyword matching
      const msgLower = userMsg.toLowerCase();
      let reply = 'Sorry, I didn\'t understand that. Please ask about services, packages or how to contact us.';
      if (msgLower.includes('service')) reply = botReplies.services;
      else if (msgLower.includes('package')) reply = botReplies.packages;
      else if (msgLower.includes('contact') || msgLower.includes('consult')) reply = botReplies.contact;
      addMessage(reply);
    }, 600);
  });

  /* AI Ad Idea Generator */
  const genBtn = document.querySelector('.floating-generator');
  const genBox = document.querySelector('.generator-box');
  const genClose = genBox?.querySelector('.close');
  const genForm = genBox?.querySelector('form');
  const genResults = genBox?.querySelector('.generator-results');

  genBtn && genBtn.addEventListener('click', () => {
    genBox?.classList.toggle('active');
  });
  genClose && genClose.addEventListener('click', () => {
    genBox?.classList.remove('active');
  });
  genForm && genForm.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(genForm);
    const business = formData.get('business');
    const industry = formData.get('industry');
    const service = formData.get('service');
    const audience = formData.get('audience');
    const budget = formData.get('budget');
    const platform = formData.get('platform');
    const goal = formData.get('goal');
    const tone = formData.get('tone');
    // Simple generation logic using string templates
    const hook = `Unlock your ${industry} potential with ${business}!`;
    const caption = `Looking to ${goal}? Our ${service} is perfect for ${audience}. Start with as little as PKR ${budget}!`;
    const cta = `Get Started Today`;
    const creative = `Create a short, engaging video highlighting how ${business} helps ${audience} solve problems, using vibrant visuals and a friendly tone.`;
    const script = `Hey there! Are you ${audience}? ${business} has the solution you've been waiting for!`; 
    const objective = `${goal} through targeted ${platform} campaigns`;
    const targetAud = `${audience} who are interested in ${industry}`;
    const format = `Video Ad with voiceover and motion graphics`;
    genResults.innerHTML = `
      <h4>Generated Ad Idea</h4>
      <p><strong>Hook:</strong> ${hook}</p>
      <p><strong>Caption:</strong> ${caption}</p>
      <p><strong>CTA:</strong> ${cta}</p>
      <p><strong>Creative Idea:</strong> ${creative}</p>
      <p><strong>UGC Script:</strong> ${script}</p>
      <p><strong>Campaign Objective:</strong> ${objective}</p>
      <p><strong>Suggested Audience:</strong> ${targetAud}</p>
      <p><strong>Recommended Format:</strong> ${format}</p>
    `;
    // Scroll to results area
    genBox.querySelector('.generator-body')?.scrollTo({ top: genResults.offsetTop - 20, behavior: 'smooth' });
  });
});