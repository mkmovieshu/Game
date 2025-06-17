let scene, camera, renderer;
let dice, piece;
let diceValue = 1;
let steps = 0;

const diceText = document.getElementById('diceValue');

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x222222);

  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 10, 15);
  camera.lookAt(0, 0, 0);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Board (just a flat square)
  const board = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20),
    new THREE.MeshStandardMaterial({ color: 0x006600 })
  );
  board.rotation.x = -Math.PI / 2;
  scene.add(board);

  // Dice (Cube)
  dice = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: false })
  );
  dice.position.set(0, 0.5, 0);
  scene.add(dice);

  // Piece (Sphere)
  piece = new THREE.Mesh(
    new THREE.SphereGeometry(0.4, 32, 32),
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  piece.position.set(4, 0.4, 0);
  scene.add(piece);

  // Light
  const light = new THREE.PointLight(0xffffff, 1, 100);
  light.position.set(10, 20, 10);
  scene.add(light);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function rollDice() {
  diceValue = Math.floor(Math.random() * 6) + 1;
  diceText.innerText = "Value: " + diceValue;

  // Rotate dice for animation effect
  dice.rotation.x += Math.random() * 5;
  dice.rotation.y += Math.random() * 5;

  // Move player in circular path
  movePiece(diceValue);
}

function movePiece(stepsToMove) {
  steps += stepsToMove;
  const angle = (steps % 40) * (Math.PI * 2 / 40);
  const radius = 4;
  piece.position.x = Math.cos(angle) * radius;
  piece.position.z = Math.sin(angle) * radius;
}
