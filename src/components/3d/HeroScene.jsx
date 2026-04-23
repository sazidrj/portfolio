import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import s from './HeroScene.module.css';

/* ── Knowledge Graph Data ── */
const CLUSTERS = [
  {
    // AI / LLM cluster — top
    center: [0.2, 0.9, 0.15],
    color: '#00d9ff',
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
    // Tools cluster — left
    center: [-0.9, -0.1, 0.25],
    color: '#10b981',
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
    // Vision cluster — right
    center: [0.85, -0.4, -0.25],
    color: '#f9a825',
    nodes: [
      { label: 'Computer Vision', offset: [0, 0, 0] },
      { label: 'OpenCV', offset: [0.4, 0.3, 0.1] },
      { label: 'Object Detection', offset: [-0.35, 0.35, -0.1] },
      { label: 'MMDetection', offset: [0.15, -0.4, 0.2] },
    ],
    edges: [[0,1],[0,2],[0,3],[1,3],[2,3]],
  },
  {
    // Cloud cluster — bottom-left
    center: [-0.55, -0.85, 0.05],
    color: '#7c3aed',
    nodes: [
      { label: 'Vertex AI', offset: [0, 0, 0] },
      { label: 'BigQuery', offset: [0.45, 0.2, -0.1] },
      { label: 'GCS', offset: [-0.3, 0.35, 0.15] },
      { label: 'AWS', offset: [0.15, -0.35, -0.2] },
    ],
    edges: [[0,1],[0,2],[0,3],[1,2]],
  },
  {
    // Data / Engineering cluster — top-left
    center: [-0.4, 0.7, -0.5],
    color: '#00d9ff',
    nodes: [
      { label: 'SQL', offset: [0, 0, 0] },
      { label: 'NL2SQL', offset: [0.4, -0.2, 0.1] },
      { label: 'Data Pipelines', offset: [-0.35, -0.3, -0.1] },
      { label: 'Vector Search', offset: [0.2, 0.35, 0.2] },
    ],
    edges: [[0,1],[0,2],[0,3],[1,3]],
  },
];

// Cross-cluster connections (by global node index)
const CROSS_EDGES = [
  [2, 6],   // LLM ↔ Python
  [0, 7],   // Agentic AI ↔ TensorFlow
  [4, 8],   // Fine-tuning ↔ HuggingFace
  [1, 24],  // RAG ↔ Vector Search
  [0, 22],  // Agentic AI ↔ NL2SQL
  [13, 6],  // Computer Vision ↔ Python
  [17, 0],  // Vertex AI ↔ Agentic AI
  [18, 21], // BigQuery ↔ SQL
];

/* Build flat node list with world positions */
function buildGraph(radius) {
  const nodes = [];
  const intraEdges = [];
  let globalIdx = 0;

  CLUSTERS.forEach(cluster => {
    const cx = cluster.center[0] * radius;
    const cy = cluster.center[1] * radius;
    const cz = cluster.center[2] * radius;
    const clusterStart = globalIdx;

    cluster.nodes.forEach(n => {
      nodes.push({
        label: n.label,
        position: [
          cx + n.offset[0] * radius * 0.9,
          cy + n.offset[1] * radius * 0.9,
          cz + n.offset[2] * radius * 0.9,
        ],
        color: cluster.color,
      });
      globalIdx++;
    });

    cluster.edges.forEach(([a, b]) => {
      intraEdges.push([clusterStart + a, clusterStart + b]);
    });
  });

  return { nodes, intraEdges };
}

/* ── Glowing node dot ── */
function NodeDot({ position, color }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.9} />
    </mesh>
  );
}

/* ── Node label using Html overlay ── */
function NodeLabel({ position, label, color }) {
  return (
    <Html
      position={position}
      center={false}
      distanceFactor={8}
      style={{
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}
      occlude={false}
      zIndexRange={[10, 0]}
    >
      <span
        className={s.nodeLabel}
        style={{
          color,
          textShadow: `0 0 8px ${color}44, 0 0 2px #000`,
        }}
      >
        {label}
      </span>
    </Html>
  );
}

/* ── Edge lines ── */
function Edges({ edges, nodes, opacity = 0.15, color = '#00d9ff' }) {
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts = [];
    edges.forEach(([a, b]) => {
      if (nodes[a] && nodes[b]) {
        verts.push(...nodes[a].position, ...nodes[b].position);
      }
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

/* ── Subtle outer wireframe shell ── */
function WireShell({ radius }) {
  return (
    <mesh>
      <icosahedronGeometry args={[radius * 1.15, 1]} />
      <meshBasicMaterial color="#00d9ff" wireframe transparent opacity={0.06} />
    </mesh>
  );
}

/* ── Ambient particles ── */
function AmbientParticles({ count = 120, radius }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * (0.6 + Math.random() * 0.8);
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  }, [count, radius]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00d9ff"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ── Main graph group ── */
function KnowledgeGraph() {
  const groupRef = useRef();
  const { pointer } = useThree();

  const RADIUS = 6.5;
  const { nodes, intraEdges } = useMemo(() => buildGraph(RADIUS), []);

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    // slow auto-rotation
    groupRef.current.rotation.y += delta * 0.08;
    // mouse-follow tilt
    groupRef.current.rotation.x += (pointer.y * 0.25 - groupRef.current.rotation.x) * 0.015;
    groupRef.current.rotation.z += (pointer.x * 0.15 - groupRef.current.rotation.z) * 0.015;
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Wireframe shell */}
        <WireShell radius={RADIUS} />

        {/* Intra-cluster edges */}
        <Edges edges={intraEdges} nodes={nodes} opacity={0.2} color="#00d9ff" />

        {/* Cross-cluster edges (dimmer) */}
        <Edges edges={CROSS_EDGES} nodes={nodes} opacity={0.07} color="#7c3aed" />

        {/* Nodes and labels */}
        {nodes.map((n, i) => (
          <group key={i}>
            <NodeDot position={n.position} color={n.color} />
            <NodeLabel position={n.position} label={n.label} color={n.color} />
          </group>
        ))}

        {/* Ambient particles */}
        <AmbientParticles count={100} radius={RADIUS} />
      </group>
    </Float>
  );
}

/* ── Main Scene ── */
export default function HeroScene() {
  return (
    <div className={s.wrapper}>
      <Canvas
        className={s.canvas}
        camera={{ position: [0, 0, 16], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <KnowledgeGraph />
      </Canvas>
    </div>
  );
}
