import * as THREE from "three";
import { useEffect, useState } from "react";
import TrackComponent from "./TrackComponent";

export default function SceneComponent() {
  const [scene, setScene] = useState(null);

  useEffect(() => {
    // Создание новой сцены
    const newScene = new THREE.Scene();

    // Создание и позиционирование камеры
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    // Создание рендерера
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);
    renderer.setClearColor("rgb(32,33,36)");

    // Добавление света к newScene
    const light = new THREE.AmbientLight(0xffffff);
    newScene.add(light);

    // Создание и добавление куба к newScene
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff12 });
    const cube = new THREE.Mesh(geometry, material);
    newScene.add(cube);

    // Функция анимации
    function animate() {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(newScene, camera);
    }
    animate();

    // Обновление состояния scene
    setScene(newScene);

    // Обработка изменения размера окна
    function onWindowResize() {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    }
    window.addEventListener("resize", onWindowResize);

    // Очистка при размонтировании компонента
    return () => {
      window.removeEventListener("resize", onWindowResize);
      renderer.dispose();
    };
  }, []);

  return <div>{scene && <TrackComponent scene={scene} />}</div>;
}
