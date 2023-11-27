import * as THREE from "three";
import { useEffect } from "react";

const TrackComponent = ({ scene }) => {
  useEffect(() => {
    // Создание геометрии и материала для трассы
    const geometry = new THREE.PlaneGeometry(10, 10);
    const material = new THREE.MeshBasicMaterial({
      color: 0x555555,
      side: THREE.DoubleSide,
    });

    // Создание меша (сетки) для трассы
    const track = new THREE.Mesh(geometry, material);
    track.rotation.x = -Math.PI / 2; // Поворот, чтобы плоскость лежала горизонтально
    track.position.y = -0.5; // Позиционирование трассы чуть ниже уровня куба

    // Добавление трассы на сцену
    scene.add(track);

    // Очистка при размонтировании компонента
    return () => {
      scene.remove(track);
      geometry.dispose();
      material.dispose();
    };
  }, [scene]);

  return null; // Компонент не рендерит JSX
};

export default TrackComponent;
