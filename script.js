const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  const renderer = new THREE.WebGLRenderer({
    antialias: false //  <========= Turn this on if you have a powerful PC and you wanna see the shapes with detail and sharpness
  });
  
  renderer.shadowMap.enabled = true;
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // renderer.outputEncoding = THREE.sRGBEncoding;
  // renderer.toneMapping = THREE.ACESFilmicToneMapping;
  // renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x1f1e1c, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  
  const scene = new THREE.Scene();
  const renderPass = new THREE.RenderPass(scene, camera);
  const bloomPass = new THREE.UnrealBloomPass(
    new THREE.Vector2(window.innerWidth, window.innerHeight),
    0.5,
    0.33,
    0.85
  );
  
  const composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(bloomPass);
  
  camera.position.set(1, -4, 10);
  
  const orbit = new THREE.OrbitControls(camera, renderer.domElement);
  orbit.autoRotate = true;
  console.log(orbit.autoRotate);
  orbit.autoRotateSpeed = 0.5;
  orbit.enableDamping = true;
  
  // =====plane behind
  const bgTexture = new THREE.TextureLoader().load(
    "https://www.yudiz.com/codepen/textured-glass/abstract-bg-texture.png"
  );
  const bgGeometry = new THREE.PlaneGeometry(5, 5);
  const bgMaterial = new THREE.MeshBasicMaterial({ map: bgTexture });
  const bgMesh = new THREE.Mesh(bgGeometry, bgMaterial);
  bgMesh.position.set(0, -1, -1);
  
  scene.add(bgMesh);
  
  const light = new THREE.DirectionalLight(0xfff0dd, 1);
  light.position.set(0, 0, 10);
  light.castShadow = true;
  scene.add(light);
  
  let envMap;
  let envmapLoader = new THREE.PMREMGenerator(renderer);
  
  const hdrEquirect = new THREE.RGBELoader().load(
    "https://www.yudiz.com/codepen/textured-glass/empty_warehouse_01_4k.hdr",
    () => {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      envMap = envmapLoader.fromCubemap(hdrEquirect);
    }
  );
  
  const textureLoader = new THREE.TextureLoader();
  const normalMapTexture = textureLoader.load(
    "https://www.yudiz.com/codepen/textured-glass/normalMap.jpg"
  );
  normalMapTexture.wrapS = THREE.RepeatWrapping;
  normalMapTexture.wrapT = THREE.RepeatWrapping;
  normalMapTexture.repeat.set(1, 1);
  
  const bubbleGeometry = new THREE.IcosahedronGeometry(0.67, 24);
  const bubbleMaterial = new THREE.MeshPhysicalMaterial({
    transmission: 1,
    thickness: 0.5,
    roughness: 0.2,
    envMap: hdrEquirect,
    envMapIntensity: 1.5,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
    normalScale: new THREE.Vector2(1),
    normalMap: normalMapTexture,
    clearcoatNormalMap: normalMapTexture,
    clearcoatNormalScale: new THREE.Vector2(0.3)
  });
  const bubbleSphere = new THREE.Mesh(bubbleGeometry, bubbleMaterial);
  bubbleSphere.position.set(-0.85, 0.85, 0);
  bubbleSphere.castShadow = true;
  bubbleSphere.receiveShadow = true;
  scene.add(bubbleSphere);
  
  const hexagon = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1, 0),
    new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 0.4,
      roughness: 0.4,
      envMap: hdrEquirect,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      normalScale: new THREE.Vector2(1, 1),
      normalMap: normalMapTexture,
      clearcoatNormalMap: normalMapTexture,
      clearcoatNormalScale: new THREE.Vector2(0.3, 0.3)
    })
  );
  hexagon.position.set(0.85, 0.85, 0);
  hexagon.castShadow = true;
  hexagon.receiveShadow = true;
  scene.add(hexagon);
  
  const torusKnot = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.5, 0.1, 300, 20, 4, 3),
    new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 0.4,
      roughness: 0.1,
      envMap: hdrEquirect,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      normalScale: new THREE.Vector2(1, 1),
      normalMap: normalMapTexture,
      clearcoatNormalMap: normalMapTexture,
      clearcoatNormalScale: new THREE.Vector2(0.3, 0.3)
    })
  );
  torusKnot.position.set(0.85, -2, 0);
  torusKnot.castShadow = true;
  torusKnot.receiveShadow = true;
  scene.add(torusKnot);
  
  const torus = new THREE.Mesh(
    new THREE.TorusBufferGeometry(4, 0.4, 16, 100),
    new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 0.4,
      roughness: 0.4,
      envMap: hdrEquirect,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      normalScale: new THREE.Vector2(1, 1),
      normalMap: normalMapTexture,
      clearcoatNormalMap: normalMapTexture,
      clearcoatNormalScale: new THREE.Vector2(0.7, 0.7)
    })
  );
  torus.position.set(0, -1, 0);
  torus.castShadow = true;
  torus.receiveShadow = true;
  scene.add(torus);
  
  const box = new THREE.Mesh(
    new THREE.RoundedBoxGeometry(1.12, 1.12, 1.12, 16, 0.2),
    new THREE.MeshPhysicalMaterial({
      transmission: 1,
      thickness: 0.4,
      roughness: 0.1,
      envMap: hdrEquirect,
      envMapIntensity: 1.5,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      normalScale: new THREE.Vector2(1, 1),
      normalMap: normalMapTexture,
      clearcoatNormalMap: normalMapTexture,
      clearcoatNormalScale: new THREE.Vector2(0.3, 0.3)
    })
  );
  box.position.set(-0.85, -2, 0);
  box.castShadow = true;
  box.receiveShadow = true;
  scene.add(box);
  
  const clock = new THREE.Clock();
  let lastElapsedTime = 0;
  
  // animate
  function animate(time) {
    orbit.update();
  
    const elapsedTime = clock.getElapsedTime();
    const deltaTime = elapsedTime - lastElapsedTime;
    lastElapsedTime = elapsedTime;
    bubbleSphere.position.y = Math.sin(elapsedTime * 1) * 0.3 - 0.1;
    hexagon.position.y = Math.sin(elapsedTime * 0.5) * 0.1 - 0.1;
    hexagon.rotation.y = elapsedTime * 0.5;
    hexagon.rotation.x = -elapsedTime * 0.5;
    box.rotation.x = elapsedTime * 0.5;
    box.rotation.z = elapsedTime * 0.5;
    torusKnot.rotation.z = elapsedTime * 0.5;
    torus.rotation.z = -elapsedTime * 0.5;
  
    renderer.render(scene, camera);
    camera.lookAt(scene.position);
  }
  
  renderer.setAnimationLoop(animate);
  
  // resize code
  window.addEventListener("resize", function () {
    // const dpr = Math.min(pixelRatio, 2); // Cap DPR scaling to 2x
  
    bloomPass.resolution.set(window.innerWidth, window.innerHeight);
  
    // renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
  
    // composer.setPixelRatio(dpr);
    composer.setSize(window.innerWidth, window.innerHeight);
  
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  