// Varsayılan Örnek GIF'ler (Eğer hafızada hiç yoksa yüklenir)
const defaultGifs = [
    { title: "Komedi Kedi", url: "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif" },
    { title: "Hacker Kodlama", url: "https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" },
    { title: "Dans Eden Karakter", url: "https://media.giphy.com/media/l0HlRnAWXxn0MhOBK/giphy.gif" }
];

// GIF'leri LocalStorage'dan al veya varsayılanları yükle
function getGifs() {
    let stored = localStorage.getItem('siteGifs');
    if (!stored) {
        localStorage.setItem('siteGifs', JSON.stringify(defaultGifs));
        return defaultGifs;
    }
    return JSON.parse(stored);
}

// Galeriyi Ekrana Bas
function renderGallery() {
    const gallery = document.getElementById('gifGallery');
    const gifs = getGifs();
    gallery.innerHTML = '';

    gifs.forEach(gif => {
        const card = document.createElement('div');
        card.className = 'gif-card';
        card.setAttribute('data-title', gif.title);

        card.innerHTML = `
            <div class="gif-wrapper">
                <img src="${gif.url}" alt="${gif.title}">
                <div class="overlay">
                    <button class="btn-action preview-btn" onclick="openModal(this)">
                        <i class="fa-solid fa-expand"></i> Büyüt
                    </button>
                    <a href="${gif.url}" download class="btn-action download-btn">
                        <i class="fa-solid fa-download"></i> İndir
                    </a>
                </div>
            </div>
            <div class="gif-info">
                <span>${gif.title}</span>
            </div>
        `;
        gallery.appendChild(card);
    });
}

// Sayfa açıldığında galeriyi yükle
window.addEventListener('DOMContentLoaded', renderGallery);

// Arama Filtreleme Sistemi
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase().trim();
    const gifCards = document.querySelectorAll('.gif-card');

    gifCards.forEach(card => {
        const title = card.getAttribute('data-title').toLowerCase();
        card.style.display = title.includes(searchText) ? 'block' : 'none';
    });
});

// Modal (Büyük Önizleme) İşlemleri
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImg');
const modalCaption = document.getElementById('modalCaption');
const modalDownload = document.getElementById('modalDownload');
const closeBtn = document.querySelector('.close');

function openModal(button) {
    const card = button.closest('.gif-card');
    const img = card.querySelector('img');
    const title = card.getAttribute('data-title');
    const downloadBtn = card.querySelector('.download-btn');

    modal.style.display = 'flex';
    modalImg.src = img.src;
    modalCaption.textContent = title;
    modalDownload.href = downloadBtn.href;
}

closeBtn.addEventListener('click', () => modal.style.display = 'none');
window.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });