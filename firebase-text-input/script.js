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

const db = firebase.database();
let dbRef = db.ref("text");

// Update this ID to whatever your container is called in your HTML 
// (I used "memory-canvas" in the previous step, but "chat-container" works too as long as the CSS matches)
let chatContainer = document.getElementById("chat-container"); 
let entry = document.getElementById("text-input-entry");
let share = document.getElementById("text-input-submit");

// We need an array to keep track of all the floating memories
const activeMemories = [];

// Listen for new data
dbRef.on("child_added", gotText);

function gotText(data) {
  let value = data.val();
  
  // 1. Create the new memory element cleanly
  let mem = document.createElement("div");
  mem.className = "memory"; // Make sure your CSS class is "memory" based on the previous update
  mem.innerHTML = `<p>${value}</p>`;
  
  // 2. Initialize its unique floating properties
  mem.x = Math.random() * (window.innerWidth - 300); 
  mem.y = Math.random() * (window.innerHeight - 200);
// Make the drift slightly faster
  mem.vx = (Math.random() - 0.5) * 2.5; 
  mem.vy = (Math.random() - 0.5) * 2.5;
  
  mem.angle = Math.random() * Math.PI * 2; 
  // Increase flutter speed for a "bug-like" buzz
  mem.flutterSpeed = 0.05 + Math.random() * 0.1;
  mem.isCaptured = false;

  // 3. Attach the hover/net interaction directly to this specific element
  mem.addEventListener('mouseenter', () => {
    mem.isCaptured = true;
    mem.classList.add('captured');
    mem.style.transform = `translate(${mem.x}px, ${mem.y}px) scale(1.1) rotate(0deg)`;
  });

  mem.addEventListener('mouseleave', () => {
    mem.isCaptured = false;
    mem.classList.remove('captured');
  });

  // 4. Add it to the screen and our tracking array
  chatContainer.appendChild(mem);
  activeMemories.push(mem);
}

// Click button will run this function
share.addEventListener("click", submitText);

function submitText() {
  let textToSubmit = entry.value; 
  
  // Prevent empty blank memories from being submitted
  if (textToSubmit.trim() === "") return; 
  
  let newKey = dbRef.push().key; 
  let updates = {}; 
  updates[newKey] = textToSubmit;
  
  // Wait for Firebase to update, then clear input and lock
  dbRef.update(updates).then(() => {
    entry.value = ""; 
    submitlock(); 
  });
}

function submitlock() {
  entry.remove();
  share.value = "Thanks for telling me.";
  share.disabled = true;
  share.style.width = "70%";
}

// --- The Animation Loop ---
function animate() {
  // Loop through every memory that has been pulled from Firebase
  activeMemories.forEach(mem => {
    if (mem.isCaptured) return; // Freeze movement if the user is hovering over it

    // Math for the butterfly "flutter" cadence
    mem.angle += mem.flutterSpeed;
    let flutterX = Math.cos(mem.angle) * 0.8;
    let flutterY = Math.sin(mem.angle * 2) * 0.8;

    // Update position
    mem.x += mem.vx + flutterX;
    mem.y += mem.vy + flutterY;

    // Bounding box logic (bounce softly off screen edges)
    // We use offsetWidth/Height so it calculates the actual size of the text box
    if (mem.x <= 0 || mem.x + mem.offsetWidth >= window.innerWidth) mem.vx *= -1;
    if (mem.y <= 0 || mem.y + mem.offsetHeight >= window.innerHeight) mem.vy *= -1;

    // Keep them safely on screen
    mem.x = Math.max(0, Math.min(mem.x, window.innerWidth - mem.offsetWidth));
    mem.y = Math.max(0, Math.min(mem.y, window.innerHeight - mem.offsetHeight));

    // Apply movement and a slight tilt based on horizontal direction
    let tilt = (mem.vx + flutterX) * 2; 
    mem.style.transform = `translate(${mem.x}px, ${mem.y}px) rotate(${tilt}deg)`;
  });

  // Loop to next frame
  requestAnimationFrame(animate);
}

// Start the ecosystem
animate();