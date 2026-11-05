const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.main-nav');

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  navigation.classList.toggle('open', !isOpen);
});

navigation.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.main-nav a')];

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    navLinks.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-40% 0px -55%', threshold: 0 });
sections.forEach((section) => navObserver.observe(section));

const toast = document.querySelector('.room-toast');
document.querySelectorAll('.room').forEach((room) => {
  room.addEventListener('click', () => {
    toast.textContent = `${room.dataset.room} opened in MELTS World`;
    toast.classList.add('show');
    document.querySelectorAll('.room').forEach((item) => item.classList.remove('selected'));
    room.classList.add('selected');
    window.clearTimeout(window.roomToastTimer);
    window.roomToastTimer = window.setTimeout(() => toast.classList.remove('show'), 2600);
  });
});

const chatForm = document.querySelector('.chat-form');
const chatInput = document.querySelector('#chat-input');
const chatMessages = document.querySelector('.chat-messages');
const gradeButtons = document.querySelectorAll('.grade-button');
let currentGrade = 'elementary';
const MELTS_CONTACT_URL = 'https://docs.google.com/forms/d/e/1FAIpQLScS8SYhYVrdwISIMxM93oic9aKYSBOKH-wkj5dwxfxQL2CMOw/viewform?usp=sharing';

const demoAnswers = (question) => {
  const text = question.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
  const simple = currentGrade === 'elementary';

  if (/\b(hate|stupid|dumb|boring|useless|terrible|annoying)\b/.test(text) && /\b(me|you|melts|this|it)\b/.test(text)) {
    return 'I hear that you are upset or frustrated. I may not always answer perfectly, but I am here to listen and help. You do not need to be mean to express what you need. What would make this conversation more helpful?';
  }
  if (/^(hello|hi|hey|hiya|good morning|good afternoon|good evening|howdy)[! .?]*$/.test(text) || /\b(hello|hey there|good morning|good afternoon|good evening)\b/.test(text)) {
    return simple
      ? 'Hello! I am happy you stopped by. We can explore a science idea, solve an engineering challenge, take a quiz, or talk about a career.'
      : 'Hello. You can investigate a MELTS topic, generate a challenge, compare career paths, or explain an idea in more depth.';
  }
  if (/\b(how are you|how you doing|how is it going|what is up|whats up)\b/.test(text)) {
    return 'I am doing well and ready to learn. How are you feeling today? You can ask me a MELTS question, request a quiz, or tell me what you are curious about.';
  }
  if (/\b(goodbye|bye|good night|goodnight|see you|talk later|catch you later|take care)\b/.test(text)) {
    return 'Goodbye! Keep asking questions and stay curious. Come back whenever you want to explore MELTS.';
  }
  if (/\b(thank you|thanks|thankyou|appreciate it)\b/.test(text)) {
    return 'You are welcome! What would you like to explore next?';
  }
  if (/\b(sorry|my bad|apologize)\b/.test(text)) {
    return 'No worries. We can start fresh. Is there a question or topic you would like to explore?';
  }
  if (/\b(who are you|what are you|what is your name|your name|introduce yourself)\b/.test(text)) {
    return 'I am Ask MELTS, the learning companion for Medicine, Engineering, Law, Technology, and Science. In this prototype, my answers are locally prepared and I am not connected to live AI yet.';
  }
  if (/\b(who made you|who created you|who built you|your creator)\b/.test(text)) {
    return 'Ask MELTS was created as part of the student-led MELTS website project. I am currently a demo companion, not a person or a live AI service.';
  }
  if (/\b(love you|like you|cute|funny|friend)\b/.test(text)) {
    return 'I am glad we are learning together! I can be your study companion and help you explore an idea, but I am not a replacement for trusted friends or adults when you need personal support.';
  }
  if (/\b(contact|email|phone number|telephone|reach melts|talk to a person|send a message|get involved)\b/.test(text)) {
    return 'For questions about joining MELTS or getting involved, use our official Google Form. You can find the form in the Get Involved section. MELTS has not published a public email address or phone number on this website yet, so please do not send personal contact details into this chat.';
  }
  if (/\b(private|personal information|name address|phone|share my|do not collect|privacy)\b/.test(text)) {
    return 'Please do not share your full name, home address, phone number, school schedule, passwords, or other private information here. Ask MELTS is designed for learning topics only. For formal contact, use the official MELTS form shown on this website.';
  }
  if (/\b(sad|upset|angry|scared|lonely|worried|anxious)\b/.test(text)) {
    return 'It sounds like you might be having a difficult moment. I can listen, but I am not a counselor. Consider talking with a parent, guardian, teacher, school counselor, or another trusted adult who can support you.';
  }
  if (/\b(shut up|go away|leave me alone|not interested)\b/.test(text)) {
    return 'Okay, I will stop for now. You can come back whenever you want to ask a question or try a challenge.';
  }
  if (/\b(self harm|hurt myself|kill myself|suicide|unsafe)\b/.test(text)) {
    return 'I am sorry you are feeling this way. Please tell a trusted adult right now, or contact local emergency services if you or someone else may be in immediate danger. You deserve immediate support from a real person.';
  }
  if (/\b(joke|fun fact|riddle)\b/.test(text)) {
    return simple
      ? 'Try this riddle: I can fill a room but take up no space. What am I? Answer: light!'
      : 'Here is a science joke: Why did the cell go to therapy? It had too much trouble with its boundaries. Want a fact, an experiment, or a real quiz instead?';
  }
  if (text.includes('heart')) {
    return simple
      ? 'Your heart is a strong muscle that pumps blood through your body. Blood carries oxygen and nutrients to your cells. Try placing two fingers on your wrist, then notice your pulse.'
      : 'The heart is a four-chambered pump. The atria receive blood and the ventricles pump it onward; valves keep blood moving in one direction. Blood travels to the lungs for oxygen and then through the body to deliver oxygen and nutrients.';
  }
  if (text.includes('engineering') || text.includes('challenge')) {
    return simple
      ? 'Try this challenge: build a bridge from paper that can hold several coins. Which shape makes it stronger? Predict, test, and improve one part at a time.'
      : 'Engineering Challenge: design a paper bridge at least 20 cm long using only a sheet of paper and tape. Define your test, build a prototype, measure its load, and redesign the weakest feature.';
  }
  if (text.includes('ai') || text.includes('artificial')) {
    return simple
      ? 'AI is a computer system that learns patterns from examples. It can help sort pictures, suggest words, or answer questions, but it can make mistakes and should not replace people you trust.'
      : 'Artificial intelligence is a collection of systems that use data and algorithms to recognize patterns, generate outputs, or make predictions. AI may be biased or incorrect, so verify important answers and consider privacy, fairness, and human oversight.';
  }
  if (text.includes('quiz')) {
    return simple
      ? 'Science mini-quiz: 1) Which plant part absorbs water? 2) What do we call a push or pull? 3) What planet do we live on? Think carefully, then check each answer with a trusted learning source.'
      : 'Science mini-quiz: 1) What organelle enables cellular respiration? 2) Which force slows objects moving through air? 3) What causes seasons on Earth? Explain each answer rather than choosing only from memory.';
  }
  if (/^what\b|^why\b|^how\b|^can you\b|^could you\b/.test(text)) {
    return simple
      ? 'That sounds like a question worth investigating. First, tell me which MELTS field it belongs to: Medicine, Engineering, Law, Technology, or Science. Then I can help you break it into a smaller question and an activity.'
      : 'I need a little more context to answer accurately. Name the MELTS field, the concept, and what you already know. I can then help form a hypothesis, compare evidence, or turn it into a mini-project.';
  }
  return 'I am not sure how to answer that one in the current demo. Try asking about your body, a science experiment, an engineering design, AI, a law or ethics question, a career, or request a quiz or challenge.';
};

const addMessage = (text, type) => {
  const article = document.createElement('article');
  article.className = `message ${type === 'user' ? 'user-message' : 'assistant-message'}`;
  if (type !== 'user') {
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = 'M';
    article.appendChild(avatar);
  }
  const content = document.createElement('div');
  const paragraph = document.createElement('p');
  paragraph.textContent = text;
  content.appendChild(paragraph);
  article.appendChild(content);
  chatMessages.appendChild(article);
  chatMessages.scrollTop = chatMessages.scrollHeight;
};

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const question = chatInput.value.trim();
  if (!question) return;
  addMessage(question, 'user');
  chatInput.value = '';
  window.setTimeout(() => addMessage(demoAnswers(question), 'assistant'), 300);
});

document.querySelectorAll('.suggested-prompts button').forEach((button) => {
  button.addEventListener('click', () => {
    chatInput.value = button.dataset.question;
    chatForm.requestSubmit();
  });
});

gradeButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentGrade = button.dataset.grade;
    gradeButtons.forEach((item) => item.classList.toggle('active', item === button));
  });
});

document.querySelector('.clear-chat').addEventListener('click', () => {
  chatMessages.innerHTML = '<article class="message assistant-message"><div class="message-avatar">M</div><div><p>Hi! Ask me a question whenever curiosity strikes.</p></div></article>';
});
