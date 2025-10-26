
const endpoints = [
  'https://api/users',
  'https://api/products',
  'https://api/orders',
  'https://api/auth/login',
  'https://api/analytics',
  'https://api/posts',
  'https://api/comments',
  'https://api/payments',
  'https://api/notifications',
  'https://api/messages',
  'https://api/dashboard',
  'https://api/settings',
  'https://api/profile',
  'https://api/admin',
  'https://api/reports',
  'https://api/export',
  'https://api/search',
  'https://api/categories',
  'https://api/tags',
  'https://api/media'
];

const container = document.getElementById('background-pattern');

/**
 
 @param {boolean} reverse
 */
function createRow(reverse = false) {
  const row = document.createElement('div');
  row.className = `row ${reverse ? 'scroll-right' : 'scroll-left'}`;

  const list = reverse ? endpoints.slice().reverse() : endpoints;
  const doubled = [...list, ...list];

  doubled.forEach(endpoint => {
    const span = document.createElement('span');
    span.textContent = endpoint;
    row.appendChild(span);
  });

  container.appendChild(row);
}

for (let i = 0; i < 12; i += 1) {
  createRow(i % 2 === 1);
}