document.addEventListener('DOMContentLoaded', () => {
  const registerBtn = document.getElementById('registerBtn');
  const loginBtn = document.getElementById('loginBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const topupBtn = document.getElementById('topupBtn');
  const addSnackBtn = document.getElementById('addSnackBtn');

  const authSection = document.getElementById('authSection');
  const accountSection = document.getElementById('accountSection');
  const snacksSection = document.getElementById('snacksSection');
  const adminSection = document.getElementById('adminSection');
  const userInfo = document.getElementById('userInfo');
  const snackList = document.getElementById('snackList');

  async function fetchAccount() {
    const res = await fetch('/account');
    if (res.ok) {
      const data = await res.json();
      userInfo.textContent = `User: ${data.username}, Balance: ₦${data.balance}, Role: ${data.role}`;
      authSection.style.display = 'none';
      accountSection.style.display = 'block';
      snacksSection.style.display = 'block';
      if (data.role === 'admin') {
        adminSection.style.display = 'block';
      } else {
        adminSection.style.display = 'none';
      }
    } else {
      accountSection.style.display = 'none';
      snacksSection.style.display = 'none';
      authSection.style.display = 'block';
    }
  }

  async function loadSnacks() {
    const res = await fetch('/snacks');
    const snacks = await res.json();
    snackList.innerHTML = '';
    snacks.forEach(snack => {
      const li = document.createElement('li');
      li.textContent = `${snack.name} - ₦${snack.price}`;
      const buyBtn = document.createElement('button');
      buyBtn.textContent = 'Buy';
      buyBtn.addEventListener('click', () => buySnack(snack._id));
      li.appendChild(buyBtn);
      snackList.appendChild(li);
    });
  }

  async function buySnack(snackId) {
    const res = await fetch('/snacks/purchase', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ snackId })
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchAccount();
  }

  registerBtn.addEventListener('click', async () => {
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const res = await fetch('/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    alert(data.message || data.error);
  });

  loginBtn.addEventListener('click', async () => {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const res = await fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchAccount();
  });

  logoutBtn.addEventListener('click', async () => {
    await fetch('/auth/logout', { method: 'POST' });
    location.reload();
  });

  topupBtn.addEventListener('click', async () => {
    const amount = document.getElementById('topupAmount').value;
    const res = await fetch('/account/topup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount })
    });
    const data = await res.json();
    alert(data.message || data.error);
    fetchAccount();
  });

  addSnackBtn.addEventListener('click', async () => {
    const name = document.getElementById('newSnackName').value;
    const price = document.getElementById('newSnackPrice').value;
    const res = await fetch('/snacks/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price })
    });
    const data = await res.json();
    alert(data.message || data.error);
    loadSnacks();
  });

  fetchAccount();
  loadSnacks();
});
