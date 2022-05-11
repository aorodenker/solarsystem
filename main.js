import * as THREE from 'three';
import './style.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import starsTexture from './assets/stars.jpg';
import earthTexture from './assets/earth.jpg';
import jupiterTexture from './assets/jupiter.jpg';
import marsTexture from './assets/mars.jpg';
import mercuryTexture from './assets/mercury.jpg';
import neptuneTexture from './assets/neptune.jpg';
import plutoTexture from './assets/pluto.jpg';
import saturnRingTexture from './assets/saturnRing.png';
import sunTexture from './assets/sun.jpg';
import uranusRingTexture from './assets/uranusRing.png';
import saturnTexture from './assets/saturn.jpg';
import uranusTexture from './assets/uranus.jpg';
import venusTexture from './assets/venus.jpg';

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture,
    starsTexture
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(16, 30, 30);
const sunMat = new THREE.MeshBasicMaterial({
    map: textureLoader.load(sunTexture)
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanet(size, texture, position, ring) {
    const geo = new THREE.SphereGeometry(size, 30, 30);
    const mat = new THREE.MeshStandardMaterial({
        map: textureLoader.load(texture)
    });
    const mesh = new THREE.Mesh(geo, mat);
    const obj = new THREE.Object3D();
    obj.add(mesh);
    if (ring) {
        const ringGeo = new THREE.RingGeometry(
            ring.innerRadius,
            ring.outerRadius,
            32);
        const ringMat = new THREE.MeshBasicMaterial({
            map: textureLoader.load(ring.texture),
            side: THREE.DoubleSide
        });
        const ringMesh = new THREE.Mesh(ringGeo, ringMat);
        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    scene.add(obj);
    mesh.position.x = position;
    return {mesh, obj}
}

const mercury = createPlanet(3.2, mercuryTexture, 28);
const venus = createPlanet(5.8, venusTexture, 44);
const earth = createPlanet(6, earthTexture, 62);
const mars = createPlanet(4, marsTexture, 78);
const jupiter = createPlanet(12, jupiterTexture, 100);
const saturn = createPlanet(10, saturnTexture, 138, {
    innerRadius: 10,
    outerRadius: 20,
    texture: saturnRingTexture
});
const uranus = createPlanet(7, uranusTexture, 176, {
    innerRadius: 7,
    outerRadius: 12,
    texture: uranusRingTexture
});
const neptune = createPlanet(7, neptuneTexture, 200);
const pluto = createPlanet(2.8, plutoTexture, 216);

const pointLight = new THREE.PointLight(0xFFFFFF, 2, 300);
scene.add(pointLight);

function animate() {
    sun.rotateY(0.004);
    mercury.mesh.rotateY(0.004);
    venus.mesh.rotateY(0.002);
    earth.mesh.rotateY(0.02);
    mars.mesh.rotateY(0.018);
    jupiter.mesh.rotateY(0.04);
    saturn.mesh.rotateY(0.038);
    uranus.mesh.rotateY(0.03);
    neptune.mesh.rotateY(0.032);
    pluto.mesh.rotateY(0.008);

    mercury.obj.rotateY(0.04);
    venus.obj.rotateY(0.015);
    earth.obj.rotateY(0.01);
    mars.obj.rotateY(0.008);
    jupiter.obj.rotateY(0.002);
    saturn.obj.rotateY(0.0009);
    uranus.obj.rotateY(0.0004);
    neptune.obj.rotateY(0.0001);
    pluto.obj.rotateY(0.00007);

    renderer.render(scene, camera);

    // let pt = new THREE.Vector3(venus.mesh.position);
    // camera.lookAt(pt);
    // camera.autoRotate = true;
    // camera.autoRotateSpeed = 0.0009;
    // camera.lookAt(saturn.mesh.position);
    // console.log(camera.rotation)
    // console.log(saturn.obj.rotation)
}

renderer.setAnimationLoop(animate);

window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// renderer.render( scene, camera );

// // scene.add(torus);

// // const pointLight = new THREE.PointLight( 0xFFFFFF );
// // pointLight.position.set( 20, 20, 20 );

// // const lightHelper = new THREE.PointLightHelper( pointLight );
// // const gridHelper = new THREE.GridHelper( 200, 50 );
// // scene.add( lightHelper, gridHelper );


// function addStar() {
//   const geometry = new THREE.OctahedronGeometry( 0.25 );
//   const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );
//   const star = new THREE.Mesh( geometry, material );
//   const [ x, y, z ] = Array(3).fill().map( () => THREE.MathUtils.randFloatSpread( 100 ) );
//   star.rotateX(1);

//   star.position.set( x, y, z );
//   scene.add( star );
// };

// Array(200).fill().forEach( addStar );

// const spaceTexture = new THREE.TextureLoader().load( 'space.jpg' );
// scene.background = spaceTexture;

// // const meTexture = new THREE.TextureLoader().load( 'earth2.jpg' );

// // const me = new THREE.Mesh(
// //   new THREE.SphereGeometry( 10 ),
// //   new THREE.MeshBasicMaterial( { map: meTexture } )
// // );

// // scene.add( me );

// const moonTexture = new THREE.TextureLoader().load( 'moon.jpg' );
// const normalTexture = new THREE.TextureLoader().load( 'normal.jpg' );
// const moon = new THREE.Mesh(
//   new THREE.SphereGeometry( 3, 32, 32 ),
//   new THREE.MeshStandardMaterial( {
//     map: moonTexture,
//     normalMap: normalTexture
//   } )
// );

// const earthGeometry = new THREE.SphereGeometry(15, 32, 32);
// const earthMaterial = new THREE.MeshPhongMaterial();
// earthMaterial.map    = new THREE.TextureLoader().load('earth2.jpg');
// earthMaterial.bumpMap   = new THREE.TextureLoader().load('earthBump.jpg');
// earthMaterial.bumpScale = 0.05;
// earthMaterial.specularMap = new THREE.TextureLoader().load('earthShine.jpg')
// earthMaterial.specular  = new THREE.Color('grey');
// const earth = new THREE.Mesh(earthGeometry, earthMaterial);
// scene.add(earth);

// scene.add( moon );

// moon.position.z = 30;
// moon.position.setX( -10 );

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top;
//   moon.rotation.y += 0.05;

//   // earth.rotation.x += 0.01;
//   earth.rotation.y += 0.01;
//   // earth.rotation.z += 0.01;

//   camera.position.x = t * -0.0002;
//   camera.position.y = t * -0.0002;
//   camera.position.z = t * -0.01;
// };

// document.body.onscroll = moveCamera;

// function animate() {
//   requestAnimationFrame( animate );

//   moon.rotation.y += 0.005;
//   moon.rotation.z += 0.005;

//   // star.rotation.y += 0.005;
//   // star.rotation.z += 0.005;

//   earth.rotation.y += 0.005;

//   // torus.rotation.x += 0.01;
//   // torus.rotation.y += 0.005;
//   // torus.rotation.z += 0.01;

//   controls.update();
//   renderer.render( scene, camera );
// };

// animate();