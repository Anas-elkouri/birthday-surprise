const welcome = document.getElementById("welcome");
const birthday = document.getElementById("birthday");
const openBtn = document.getElementById("openBtn");
const musicBtn = document.getElementById("musicBtn");
const hearts = document.getElementById("hearts");

let audioContext;
let musicPlaying = false;
let musicTimer;

const notes = [
    523.25, 523.25, 587.33, 523.25,
    698.46, 659.25, 523.25, 523.25,
    587.33, 523.25, 783.99, 698.46,
    523.25, 523.25, 1046.50, 880,
    698.46, 659.25, 587.33
];

function playMusic() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }

    audioContext.resume();

    let index = 0;

    musicTimer = setInterval(() => {
        if (!musicPlaying) return;

        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();

        oscillator.type = "sine";
        oscillator.frequency.value = notes[index];

        gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
        gain.gain.exponentialRampToValueAtTime(
            0.12, audioContext.currentTime + 0.03
        );
        gain.gain.exponentialRampToValueAtTime(
            0.0001, audioContext.currentTime + 0.45
        );

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.5);

        index = (index + 1) % notes.length;
    }, 450);
}

function stopMusic() {
    musicPlaying = false;
    clearInterval(musicTimer);
}

openBtn.addEventListener("click", () => {
    welcome.classList.add("hidden");
    birthday.classList.remove("hidden");

    musicPlaying = true;
    playMusic();

    musicBtn.textContent = "🔇 Music Off";

    createConfetti();
});

musicBtn.addEventListener("click", () => {
    if (musicPlaying) {
        stopMusic();
        musicBtn.textContent = "🔊 Music On";
    } else {
        musicPlaying = true;
        playMusic();
        musicBtn.textContent = "🔇 Music Off";
    }
});

// Floating hearts
function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";

    const symbols = ["❤️", "💕", "💗", "💖", "🌸"];
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = (15 + Math.random() * 20) + "px";
    heart.style.animationDuration = (5 + Math.random() * 5) + "s";

    hearts.appendChild(heart);

    setTimeout(() => heart.remove(), 10000);
}

setInterval(createHeart, 500);

// Birthday confetti
function createConfetti() {
    const symbols = ["💗", "🌸", "✨", "🎉", "💕"];

    for (let i = 0; i < 65; i++) {
        setTimeout(() => {
            const item = document.createElement("div");

            item.className = "confetti";
            item.textContent = symbols[
                Math.floor(Math.random() * symbols.length)
            ];

            item.style.left = Math.random() * 100 + "vw";
            item.style.fontSize = (15 + Math.random() * 20) + "px";
            item.style.animationDuration = (3 + Math.random() * 3) + "s";

            document.body.appendChild(item);

            setTimeout(() => item.remove(), 6500);
        }, i * 45);
    }
}
