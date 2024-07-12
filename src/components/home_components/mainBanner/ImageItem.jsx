import React, { useEffect, useRef, useState } from 'react';

const ImageItem = ({ src, alt, url }) => {
  const [bgColorLeft, setBgColorLeft] = useState('#ffffff');
  const [bgColorRight, setBgColorRight] = useState('#ffffff');
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = src;
    img.onload = () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);
      
      // Obtener el color del píxel en la esquina superior izquierda (0,0)
      const pixelDataLeft = ctx.getImageData(0, 0, 1, 1).data;
      const colorLeft = `rgb(${pixelDataLeft[0]}, ${pixelDataLeft[1]}, ${pixelDataLeft[2]})`;
      
      // Obtener el color del píxel en la esquina superior derecha (img.width - 1, 0)
      const pixelDataRight = ctx.getImageData(img.width - 1, 0, 1, 1).data;
      const colorRight = `rgb(${pixelDataRight[0]}, ${pixelDataRight[1]}, ${pixelDataRight[2]})`;
      
      setBgColorLeft(colorLeft);
      setBgColorRight(colorRight);
    };
  }, [src]);

  return (
    <div className="w-full flex items-stretch cursor-pointer" onClick={() => window.open(url)}>
      <div style={{ backgroundColor: bgColorLeft }} className="w-1/2"></div>
      <img src={src} alt={alt} crossOrigin="anonymous" className="object-contain flex-grow-0" />
      <div style={{ backgroundColor: bgColorRight }} className="w-1/2"></div>
      <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
    </div>
  );
};

export default ImageItem;
