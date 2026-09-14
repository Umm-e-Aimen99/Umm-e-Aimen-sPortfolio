const body = document.body;
const html = document.documentElement;

// Mobile navigation
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
menuToggle?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Theme toggle
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme === 'light') html.classList.add('light');
themeToggle.textContent = html.classList.contains('light') ? '☾' : '☼';
themeToggle.addEventListener('click', () => {
  html.classList.toggle('light');
  const light = html.classList.contains('light');
  localStorage.setItem('portfolio-theme', light ? 'light' : 'dark');
  themeToggle.textContent = light ? '☾' : '☼';
});

// Active navigation
const sections = document.querySelectorAll('main section[id]');
const navItems = document.querySelectorAll('.nav-links a');
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-40% 0px -50% 0px' });
sections.forEach(s => navObserver.observe(s));

// Reveal animations
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Project filtering
document.querySelectorAll('.filter').forEach(filter => {
  filter.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(f => f.classList.remove('active'));
    filter.classList.add('active');
    const category = filter.dataset.filter;
    document.querySelectorAll('.project-card').forEach(card => {
      card.classList.toggle('hidden', category !== 'all' && card.dataset.category !== category);
    });
  });
});

// Project modal
const projectData = {
  trapscape: {
    title: 'TRAPSCAPE',
    description: 'A maze-based survival game built in C++ with SFML. The project combines game logic, custom data structures and pathfinding to create intelligent enemy movement.',
    details: 'Key work: Stack, Queue, Linked List, BFS, DFS, A* pathfinding, dynamic maze generation, authentication, leaderboard, coin collection and graphical rendering.'
  },
  maze: {
    title: 'Mystery Maze',
    description: 'A GUI-based maze game built with Java and JavaFX, designed to practice object-oriented programming in an interactive application.',
    details: 'Key work: inheritance, abstraction, player navigation, game logic and graphical user interface development.'
  },
  gpa: {
    title: 'GPA Security Zone Predictor',
    description: 'A two-screen React Native application where a student enters previous GPA and study hours, then receives a prediction about their GPA security zone.',
    details: 'Key work: React Native UI, input handling and application state.'
  },
  todo: {
    title: 'To-Do List App',
    description: 'A cross-platform React Native task manager focused on simple, practical state-driven UI interactions.',
    details: 'Key work: adding tasks, completing tasks, deleting tasks, state management and real-time list rendering.'
  },
  counter: {
    title: 'Counter Web App',
    description: 'A responsive browser-based counter created with HTML, CSS and JavaScript.',
    details: 'Key work: web page structure, styling, DOM interaction and JavaScript functionality.'
  },
  calculator: {
    title: 'Calculator',
    description: 'A basic functional calculator for everyday arithmetic operations using vanilla web technologies.',
    details: 'Key work: HTML structure, CSS interface and JavaScript calculation logic.'
  }
};

const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalDetails = document.getElementById('modalDetails');
function openModal(key) {
  const project = projectData[key];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalDetails.textContent = project.details;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
document.querySelectorAll('.project-open').forEach(button => {
  button.addEventListener('click', () => openModal(button.dataset.project));
});
document.querySelector('.modal-close').addEventListener('click', closeModal);
document.querySelector('.modal-backdrop').addEventListener('click', closeModal);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// Copy email
const toast = document.querySelector('.toast');
document.querySelector('.copy-email')?.addEventListener('click', async () => {
  const email = document.querySelector('.copy-email').dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 1800);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

// Subtle cursor glow on desktop
const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', e => {
  glow.style.left = `${e.clientX}px`;
  glow.style.top = `${e.clientY}px`;
});
