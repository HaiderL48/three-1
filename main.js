import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

const scene = new Three.Scene();
const camera = new Three.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
``;
const canvas = document.querySelector("canvas.three");
const rendrer = new Three.WebGLRenderer({
  canvas: canvas,
  side: Three.DoubleSide,
});

rendrer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(rendrer.domElement);

// custom geometry

const material1 = new Three.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const vertices = new Float32Array([0, 0, 0, 0, 2, 0, 2, 0, 0]);

const bufferAttribute = new Three.BufferAttribute(vertices, 3);
const geometry1 = new Three.BufferGeometry();
geometry1.setAttribute("posotion", bufferAttribute);
const custom = new Three.Mesh(geometry1, material1);
custom.position.y = -3;
scene.add(custom);
const geometry = new Three.BoxGeometry();
const material = new Three.MeshBasicMaterial({
  color: 0xffffff,
  wireframe: true,
});

const cube = new Three.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
cube.rotation.y = Three.MathUtils.degToRad(45);
scene.add(cube);
const planeSurface = new Three.PlaneGeometry(10, 10);
planeSurface.rotateX(-Math.PI / 2);
const planeMaterial = new Three.MeshStandardMaterial({
  color: 0x000000,
  side: Three.DoubleSide,
});
const plane = new Three.Mesh(planeSurface, planeMaterial);
plane.position.y = -3;
plane.castShadow = false;
plane.receiveShadow = true;
scene.add(plane);

const spotLight = new Three.SpotLight(0xffffff, 60, 100, Math.PI / 4, 1, 1);
const lightHelper = new Three.SpotLightHelper(spotLight);
scene.add(lightHelper);
spotLight.position.y = 20;
spotLight.target = cube;
spotLight.castShadow = true;
scene.add(spotLight);

const directionalLight = new Three.DirectionalLight(0xffffff, 2);
scene.add(directionalLight);
const directionalLightHelper = new Three.DirectionalLightHelper(
  directionalLight
);
directionalLight.position.set(2, 2, -1);
directionalLight.castShadow = true;

scene.add(directionalLightHelper);

rendrer.setPixelRatio(Math.max(window.devicePixelRatio, 5));
camera.lookAt(0, 0, 0, 0);
camera.position.z = 5;
const helper = new Three.AxesHelper(2);
cube.add(helper);
const controls = new OrbitControls(camera, canvas);
controls.autoRotate = false;
controls.enableDamping = true;
rendrer.shadowMap.enabled = true;
rendrer.shadowMap.type = Three.PCFShadowMap;

// initalizing the clock

const clock = new Three.Clock();
let previousTime = 0;

const animate = () => {
  // const currentTime = clock.getElapsedTime();
  // const delta = currentTime - previousTime;
  // previousTime = currentTime;

  // cube.rotation.y += Three.MathUtils.degToRad(1) * delta * 20;
  // cube.position.y = Math.sin(currentTime) + 1;
  rendrer.setSize(window.innerWidth, window.innerHeight);
  requestAnimationFrame(animate);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  controls.update();
  rendrer.render(scene, camera);
};
animate();

window.handle = () => {
  // cube.material.color.setHex(Math.random() * 0xffffff);
  // // Increase rotation speed
  // rotationSpeed += 0.01;
};
