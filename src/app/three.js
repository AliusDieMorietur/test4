import { useEffect } from "react";
import * as THREE from "three";

const WIDTH = 500;
const HEIGHT = 500;

export const Test = () => {
  useEffect(() => {
    const rootEl = document.getElementById("box");
    const box = rootEl.getBoundingClientRect();

    const textureLoader = new THREE.TextureLoader();

    const scene = new THREE.Scene();
    const bgTexture = textureLoader.load("background.jpg");
    scene.background = bgTexture;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    rootEl.appendChild(renderer.domElement);

    // table
    const tableTexture = textureLoader.load("table.png");
    const tableG = new THREE.BoxGeometry(11, 7.5, 0);
    const tableM = new THREE.MeshBasicMaterial({
      map: tableTexture,
      transparent: true,
    });
    const table = new THREE.Mesh(tableG, tableM);
    scene.add(table);

    const t = textureLoader.load("coin.png");
    const face1 = new THREE.MeshBasicMaterial({ map: t, transparent: true });
    const face2 = new THREE.MeshBasicMaterial({ map: t, transparent: true });
    const edge = new THREE.MeshBasicMaterial({ color: 0xf9d5a1 });

    const coinMaterials = [edge, face1, face2];

    const coinGeometry = new THREE.CylinderGeometry(
      0.25,
      0.25,
      0.1,
      50,
      50,
      false
    );
    const coin = new THREE.Mesh(coinGeometry, coinMaterials);

    coin.rotateX(1.5);
    coin.rotateY(1.6);
    coin.rotateZ(3.14);

    console.log("coin", coin);

    const group = new THREE.Group();
    group.add(coin);

    group.translateY(-3);
    scene.add(group);

    const destination = new THREE.Vector3(0, -3, 0);
    let startY = -3;
    let path = 0;

    function animate() {
      requestAnimationFrame(animate);

      // coin animation
      if (
        destination.x !== group.position.x ||
        destination.y !== group.position.y ||
        destination.z !== group.position.z
      ) {
        const speed = 0.1;
        const angle = 0.1;

        const deltaX = destination.x - group.position.x;
        console.log("deltaX * speed", deltaX * speed);
        if (Math.abs(deltaX) > 0.001) {
          group.translateX(deltaX * speed);
          // coin.rotateZ(angle);
        } else {
          group.translateX(deltaX);
        }

        const deltaY = destination.y - group.position.y;
        if (Math.abs(deltaY) > 0.001) {
          group.translateY(deltaY * speed);
          // console.log(
          //   "Math.abs(path) / 2 < Math.abs(deltaY)",
          //   Math.abs(path) / 2 < Math.abs(deltaY)
          // );
          // if (Math.abs(path) / 2 < Math.abs(deltaY)) {
          //   group.translateZ(-0.01);
          // } else {
          //   group.translateZ(0.01);
          // }
        } else {
          group.translateY(deltaY);
        }
      }

      renderer.render(scene, camera);
    }

    animate();

    console.log("coin.position1", coin);

    window.addEventListener("click", (e) => {
      console.log("group", group);
      console.log("destination", destination);
      destination.x = ((e.clientX / window.innerWidth) * 2 - 1) * 5;
      destination.y = (-(e.clientY / window.innerHeight) * 2 + 1) * 4;
      startY = coin.position.y;
      path = destination.y - startY;

      console.log("path", path);
    });
  }, []);

  return <div id="box" className="w-full h-screen"></div>;
};
