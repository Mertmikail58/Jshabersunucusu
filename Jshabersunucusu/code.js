const apiKaynakAdresi = "https://api.collectapi.com/news/getNews?country=tr&tag=general";
const apiAyarlari = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "apikey 4dt29quqTUIne0aMPOL4DL:0l849tJwAWlI1Wy5PlP05N"
    }
};

let veriler;
let sunucuYaniti;

async function haberListele() {
    try {
        sunucuYaniti = await fetch(apiKaynakAdresi, apiAyarlari);
        veriler = await sunucuYaniti.json();

        const haberlerDiv = document.querySelector(".haberler");
        const detaylarDiv = document.querySelector(".detaylar");

        veriler.result.forEach(eleman => {
            const haberDiv = document.createElement('div');
            haberDiv.classList.add('haber');

            const haberResim = document.createElement('img');
            haberResim.src = eleman.image;
            haberResim.alt = eleman.name;

            const haberBasligiLink = document.createElement('a');
            haberBasligiLink.href = eleman.link;
            haberBasligiLink.textContent = eleman.name;
            haberBasligiLink.target = "_blank"; // Haber linkini yeni bir sekmede açmak için

            haberBasligiLink.addEventListener('click', (e) => {
                e.preventDefault(); // Sayfanın yeniden yüklenmesini engellemek için
                detaylarDiv.innerHTML = `
                    <p>Başlık: ${eleman.name}</p>
                    <p>Link: <a href="${eleman.link}" target="_blank">${eleman.link}</a></p>
                    <p>Açıklama: ${eleman.description}</p>
                    <p>Kategori: ${eleman.category}</p>
                    <p>Haber Zamanı: ${eleman.date}</p>
                `;
            });

            haberDiv.appendChild(haberResim);
            haberDiv.appendChild(haberBasligiLink);
            haberlerDiv.appendChild(haberDiv);
        });

        const slides = document.querySelectorAll('.haber');
        let slideIndex = 0;

        function showSlide(n) {
            slides.forEach(slide => slide.style.display = "none");
            if (n >= slides.length) {slideIndex = 0}
            if (n < 0) {slideIndex = slides.length - 1}
            slides[slideIndex].style.display = "block";
        }

        function nextSlide() {
            showSlide(++slideIndex);
        }

        function prevSlide() {
            showSlide(--slideIndex);
        }

        document.querySelector('.next').addEventListener('click', nextSlide);
        document.querySelector('.prev').addEventListener('click', prevSlide);

        showSlide(slideIndex);

    } catch (error) {
        console.error(error);
    }
}

haberListele();
