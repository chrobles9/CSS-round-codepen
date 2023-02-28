let scene, camera, renderer;
let sceneObjects = [];

function init() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.position.z = 13;
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  document.body.appendChild(renderer.domElement);
  lighting();
  animate();
  addShape();
}

function addShape() {
  // Creates shape
  const geometry = new THREE.TorusGeometry(3, 1.5, 36, 55);
  // Create shape Texture and add
  const ufoTexture = new THREE.TextureLoader().load(
    "./media/images/texture.jpg"
  );
  let material = new THREE.MeshStandardMaterial({
    map: ufoTexture,
  });
  let mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  sceneObjects.push(mesh);
  // Add texture to scene background
  const spaceTexture = new THREE.TextureLoader().load(
    "./media/images/space.jpg"
  );
  scene.background = spaceTexture;
}

function animate() {
  renderer.render(scene, camera);
  for (let object of sceneObjects) {
    object.rotation.x += 0.01;
    object.rotation.y += 0.01;
  }
  requestAnimationFrame(animate);
}

function lighting() {
  let pointLight = new THREE.PointLight(0xffffff, 1.5, 100);
  pointLight.position.set(1, 1, 5);
  pointLight.castShadow = true;
  scene.add(pointLight);

  let ambientLight = new THREE.AmbientLight(0x404040, 2);
  scene.add(ambientLight);
}

init();