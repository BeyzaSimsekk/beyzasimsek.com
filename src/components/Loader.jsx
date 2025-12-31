import { Html, useProgress } from "@react-three/drei";

const CanvasLoader = () => {
  const { progress } = useProgress();

  return (
    // center prop'u merkeze hizalar ve transform hesaplamalarını daha stabil yapar
    <Html center>
      <div className="flex flex-col items-center justify-center">
        <span className="canvas-load"></span>
        <p
          style={{
            fontSize: 14,
            color: "#f1f1f1",
            fontWeight: 800,
            marginTop: 40,
          }}
        >
          {progress > 0 ? `${progress.toFixed(2)}%` : "Loading..."}
        </p>
      </div>
    </Html>
  );
};

export default CanvasLoader;
