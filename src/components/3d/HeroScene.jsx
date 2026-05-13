import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import s from './HeroScene.module.css';

const CLUSTERS = [
  {
    center: [0.2, 0.9, 0.15], color: '#00d9ff',
    nodes: [
      { label: 'Agentic AI', offset: [0, 0, 0] },
      { label: 'RAG', offset: [0.45, -0.3, 0.1] },
      { label: 'LLM', offset: [-0.4, -0.15, -0.1] },
      { label: 'NLP', offset: [0.1, 0.4, -0.2] },
      { label: 'Fine-tuning', offset: [-0.35, 0.35, 0.2] },
      { label: 'Prompt Eng.', offset: [0.5, 0.2, -0.1] },
    ],
    edges: [[0,1],[0,2],[0,5],[1,2],[2,3],[2,4],[4,5],[3,0]],
  },
  {
    center: [-0.9, -0.1, 0.25], color: '#10b981',
    nodes: [
      { label: 'Python', offset: [0, 0, 0] },
      { label: 'TensorFlow', offset: [0.4, 0.35, -0.1] },
      { label: 'HuggingFace', offset: [-0.3, 0.4, 0.1] },
      { label: 'Scikit-learn', offset: [0.2, -0.4, -0.15] },
      { label: 'NumPy', offset: [-0.45, -0.2, 0.15] },
    ],
    edges: [[0,1],[0,2],[0,3],[0,4],[1,2],[3,4]],
  },
  {
    center: [0.85, -0.4, -0.25], color: '#f9a825',
    nodes: [
      { label: 'Computer Vision', offset: [0, 0, 0] },
      { label: 'OpenCV', offset: [0.4, 0.3, 0.1] },
      { label: 'Object Detection', offset: [-0.35, 0.35, -0.1] },
      { label: 'MMDetection', offset: [0.15, -0.4, 0.2] },
    ],
    edges: [[0,1],[0,2],[0,3],[1,3],[2,3]],
  },
  {
    center: [-0.55, -0.85, 0.05], color: '#7c3aed',
    nodes: [
      { label: 'Vertex AI', offset: [0, 0, 0] },
      { label: 'BigQuery', offset: [0.45, 0.2, -0.1] },
      { label: 'GCS', offset: [-0.3, 0.35, 0.15] },
      { label: 'AWS', offset: [0.15, -0.35, -0.2] },
    ],
    edges: [[0,1],[0,2],[0,3],[1,2]],
  },
  {
    center: [-0.4, 0.7, -0.5], color: '#00d9ff',
    nodes: [
      { label: 'SQL', offset: [0, 0, 0] },
      { label: 'NL2SQL', offset: [0.4, -0.2, 0.1] },
      { label: 'Data Pipelines', offset: [-0.35, -0.3, -0.1] },
      { label: 'Vector Search', offset: [0.2, 0.35, 0.2] },
    ],
    edges: [[0,1],[0,2],[0,3],[1,3]],
  },
];

const CROSS_EDGES = [
  [2, 6], [0, 7], [4, 8], [1, 24],
  [0, 22], [13, 6], [17, 0], [18, 21],
];

function buildGraph(radius) {
  const nodes = [], intraEdges = [];
  let idx = 0;
  CLUSTERS.forEach(cluster => {
    const [cx, cy, cz] = cluster.center.map(v => v * radius);
    const start = idx;
    cluster.nodes.forEach(n => {
      nodes.push({
        label: n.label,
        position: [
          cx + n.offset[0] * radius * 0.88,
          cy + n.offset[1] * radius * 0.88,
          cz + n.offset[2] * radius * 0.88,
        ],
        color: cluster.color,
      });
      idx++;
    });
    cluster.edges.forEach(([a, b]) => intraEdges.push([start + a, start + b]));
  });
  return { nodes, intraEdges };
}

function NodeDot({ position, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.09, 12, 12]} />
      <meshBasicMaterial color={color} transparent opacity={0.95} />
    </mesh>
  );
}

function NodeLabel({ position, label, color }) {
  return (
    <Html position={position} center={false} distanceFactor={8} occlude={false} zIndexRange={[10, 0]}
      style={{ pointerEvents: 'none', userSelect: 'none', whiteSpace: 'nowrap' }}
    >
      <span className={s.nodeLabel} style={{ color, textShadow: `0 0 10px ${color}55` }}>
        {label}
      </span>
    </Html>
  );
}

function Edges({ edges, nodes, opacity = 0.18, color = '#00d9ff' }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = [];
    edges.forEach(([a, b]) => {
      if (nodes[a] && nodes[b]) verts.push(...nodes[a].position, ...nodes[b].position);
    });
    geo.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3));
    return geo;
  }, [edges, nodes]);
  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={opacity} />
    </lineSegments>
  );
}

function CoreOrb() {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.6; });
  return (
    <mesh ref={ref}>
      <icosahedronGeometry args={[1.0, 2]} />
      <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.35} />
    </mesh>
  );
}

function WireShell({ radius }) {
  return (
    <mesh>
      <icosahedronGeometry args={[radius * 1.12, 1]} />
      <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.04} />
    </mesh>
  );
}

function Particles({ count = 160, radius }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.55 + Math.random() * 0.9);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#00d9ff" transparent opacity={0.45} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function KnowledgeGraph() {
  const groupRef = useRef();
  const { pointer } = useThree();
  const RADIUS = 7;
  const { nodes, intraEdges } = useMemo(() => buildGraph(RADIUS), []);

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += dt * 0.09;
    groupRef.current.rotation.x += (pointer.y * 0.28 - groupRef.current.rotation.x) * 0.014;
    groupRef.current.rotation.z += (pointer.x * 0.16 - groupRef.current.rotation.z) * 0.014;
  });

  return (
    <Float speed={0.8} rotationIntensity={0.12} floatIntensity={0.25}>
      <group ref={groupRef}>
        <CoreOrb />
        <WireShell radius={RADIUS} />
        <Edges edges={intraEdges} nodes={nodes} opacity={0.22} color="#00d9ff" />
        <Edges edges={CROSS_EDGES} nodes={nodes} opacity={0.07} color="#7c3aed" />
        {nodes.map((n, i) => (
          <group key={i}>
            <NodeDot position={n.position} color={n.color} />
            <NodeLabel position={n.position} label={n.label} color={n.color} />
          </group>
        ))}
        <Particles count={140} radius={RADIUS} />
      </group>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className={s.wrapper}>
      <Canvas
        camera={{ position: [0, 0, 17], fov: 48 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[0, 0, 0]} intensity={1.5} color="#00d9ff" />
        <KnowledgeGraph />
      </Canvas>
    </div>
  );
}
