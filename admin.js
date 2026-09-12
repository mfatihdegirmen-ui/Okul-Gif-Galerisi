const ADMIN_PASSWORD = "Zeynep123"; // Buradan şifreni değiştirebilirsin!

const loginScreen = document.getElementById('loginScreen');
const adminPanel = document.getElementById('adminPanel');
const passwordInput = document.getElementById('adminPassword');
const loginBtn = document.getElementById('loginBtn');
const loginError = document.getElementById('loginError');
const logoutBtn = document.getElementById('logoutBtn');

// Oturum kontrolü (Daha önce giriş yapıldıysa direkt paneli göster)
if (sessionStorage.getItem('isAdminLoggedIn') === 'true') {
    showDashboard();
}

loginBtn.addEventListener('click', () => {
    if (passwordInput.value === ADMIN_PASSWORD) {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        showDashboard();
    } else {
        loginError.style.display = 'block';
    }
});

logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('isAdminLoggedIn');
    location.reload();
});

function showDashboard() {
    loginScreen.style.display = 'none';
    adminPanel.style.display = 'block';
    renderAdminList();
}

// GIF Ekleme Mantığı
const addGifBtn = document.getElementById('addGifBtn');
const gifTitleInput = document.getElementById('gifTitle');
const gifUrlInput = document.getElementById('gifUrl');

addGifBtn.addEventListener('click', () => {
    const title = gifTitleInput.value.trim();
    const url = gifUrlInput.value.trim();

    if (!title || !url) {
        alert("Lütfen tüm alanları doldurun!");
        return;
    }

    let gifs = JSON.parse(localStorage.getItem('siteGifs')) || [];
    gifs.push({ title, url });
    localStorage.setItem('siteGifs', JSON.stringify(gifs));

    gifTitleInput.value = '';
    gifUrlInput.value = '';
    renderAdminList();
    alert("GIF başarıyla eklendi!");
});

// Admin Panelindeki GIF Listesini ve Silme Butonlarını Yönetme
function renderAdminList() {
    const adminGifList = document.getElementById('adminGifList');
    let gifs = JSON.parse(localStorage.getItem('siteGifs')) || [];
    adminGifList.innerHTML = '';

    if (gifs.length === 0) {
        adminGifList.innerHTML = '<p style="color:#94a3b8;">Henüz GIF eklenmemiş.</p>';
        return;
    }

    gifs.forEach((gif, index) => {
        const item = document.createElement('div');
        item.className = 'admin-gif-item';
        item.innerHTML = `
            <div class="admin-gif-info">
                <img src="${gif.url}" alt="">
                <span>${gif.title}</span>
            </div>
            <button class="btn-delete" onclick="deleteGif(${index})">Sil</button>
        `;
        adminGifList.appendChild(item);
    });
}

// GIF Silme Fonksiyonu
function deleteGif(index) {
    let gifs = JSON.parse(localStorage.getItem('siteGifs')) || [];
    gifs.splice(index, 1);
    localStorage.setItem('siteGifs', JSON.stringify(gifs));
    renderAdminList();
}