// Your web app's Firebase configuration
//const firebaseConfig = {
//  apiKey: "AIzaSyAFajdu_Y13KgwcZA3LPJmj2j_nw7SoB0s",
//  authDomain: "collective-input.firebaseapp.com",
//  projectId: "collective-input",
//  storageBucket: "collective-input.appspot.com",
//  messagingSenderId: "338519851864",
//  appId: "1:338519851864:web:5fb3b64d1cad63b20b1b2d",
//  measurementId: "G-G0J7EQCZPC"
//};

  const firebaseConfig = {
    apiKey: "AIzaSyCED-Xoz40iWOebTJRFQyx_ITvZ2DGsrZs",
    authDomain: "iml300-test.firebaseapp.com",
    projectId: "iml300-test",
    storageBucket: "iml300-test.firebasestorage.app",
    messagingSenderId: "938753195303",
    appId: "1:938753195303:web:0fc9523da201b7942a7d02"
  };

firebase.initializeApp(firebaseConfig);

// firebase.initializeApp(firebaseConfig); // Make sure your config is at the top!

// Make sure your firebase.initializeApp(firebaseConfig) is right here at the top!

const db = firebase.database();
let dbRef = db.ref("text");

let chatContainer = document.getElementById("chat-container");
const etherealInput = document.getElementById("ethereal-input");

// We need an array to keep track of all the floating memories
const activeMemories = [];
let fadeTimeout;

// --- Firebase Listener ---
dbRef.on("child_added", gotText);

function gotText(data) {
  let value = data.val();
  
  let mem = document.createElement("div");
  mem.className = "memory";
  mem.innerHTML = `<p>${value}</p>`;
  
  // Initialize properties for each firefly
  mem.x = Math.random() * (window.innerWidth - 100); 
  mem.y = Math.random() * (window.innerHeight - 100);
  mem.vx = (Math.random() - 0.5) * 2.5; 
  mem.vy = (Math.random() - 0.5) * 2.5;
  mem.angle = Math.random() * Math.PI * 2; 
  mem.flutterSpeed = 0.05 + Math.random() * 0.1;
  mem.isCaptured = false;

  // The Catch interaction
  mem.addEventListener('mouseenter', () => {
    mem.isCaptured = true;
    mem.classList.add('captured');
  });

  // The Release interaction
  mem.addEventListener('mouseleave', () => {
    mem.isCaptured = false;
    mem.classList.remove('captured');
  });

  chatContainer.appendChild(mem);
  activeMemories.push(mem);
}

// --- The Ethereal Input Logic ---

// 1. The Living Reaction: Flare up when typing
etherealInput.addEventListener('input', () => {
  etherealInput.classList.add('flare');
  
  // Clear the old fade timer
  clearTimeout(fadeTimeout);
  
  // 2. The Ephemeral Reaction: Fade if idle for 2 seconds
  fadeTimeout = setTimeout(() => {
    etherealInput.classList.remove('flare');
  }, 2000); 
});

// 3. The Release: Submit on 'Enter'
etherealInput.addEventListener('keydown', (e) => {
  // Check if the key pressed was 'Enter'
  if (e.key === 'Enter') {
    e.preventDefault(); // Stop the page from accidentally reloading
    
    let textToSubmit = etherealInput.value.trim();
    if (textToSubmit === "") return; // Don't submit blank thoughts
    
    // Save to Firebase
    let newKey = dbRef.push().key; 
    let updates = {}; 
    updates[newKey] = textToSubmit;
    
    dbRef.update(updates).then(() => {
      // Clear the input and remove the glow once saved
      etherealInput.value = ""; 
      etherealInput.classList.remove('flare');
      
      // Defocus the input so the user can watch their new firefly fly away
      etherealInput.blur(); 
    }).catch(error => {
      console.error("Firebase saving error: ", error);
    });
  }
});

// --- The Animation Loop ---

function animate() {
  activeMemories.forEach(mem => {
    if (mem.isCaptured) return; // Freeze movement if hovered

    // Math for the firefly "darting" cadence
    mem.angle += mem.flutterSpeed;
    let flutterX = Math.cos(mem.angle) * 0.8;
    let flutterY = Math.sin(mem.angle * 2) * 0.8;

    // Update position
    mem.x += mem.vx + flutterX;
    mem.y += mem.vy + flutterY;

    // Bounding box logic (bounce safely off screen edges)
    if (mem.x <= 0 || mem.x + mem.offsetWidth >= window.innerWidth) mem.vx *= -1;
    if (mem.y <= 0 || mem.y + mem.offsetHeight >= window.innerHeight) mem.vy *= -1;

    // Keep them safely on screen so they don't get stuck
    mem.x = Math.max(0, Math.min(mem.x, window.innerWidth - mem.offsetWidth));
    mem.y = Math.max(0, Math.min(mem.y, window.innerHeight - mem.offsetHeight));

    // Move the firefly (Removed the old butterfly rotation)
    mem.style.transform = `translate(${mem.x}px, ${mem.y}px)`;
  });

  // Loop to next frame
  requestAnimationFrame(animate);
}

// Start the ecosystem
animate();