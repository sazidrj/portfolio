const b = () => import.meta.env.BASE_URL.replace(/\/$/, '');

export const personalInfo = {
  name: "Sazid Ali",
  title: "AI / ML Engineer",
  phone: "+91 892 016 3733",
  email: "sazid.ali52@gmail.com",
  linkedin: "https://www.linkedin.com/in/sazid-ali-932571159/?skipRedirect=true",
  github: "https://github.com/sazidrj",
  location: "Chennai, India",
  tagline: "Building production-grade AI systems — multi-agent pipelines, LLM applications, and intelligent data infrastructure.",
};

export const roles = [
  'AI / ML Engineer',
  'LLM Developer',
  'Full-Stack Developer',
  'ML Researcher',
];

export const experience = [
  {
    id: "tiger",
    company: "Tiger Analytics",
    location: "Chennai, India",
    period: "Jan 2025 — Present",
    role: "AIML Associate",
    color: "#00d9ff",
    bullets: [
      "Built a production-grade <b>LLM-powered analytical assistant</b> using multi-agent architecture handling SQL, simulations, and FAQ workflows.",
      "Developed a <b>Natural Language → SQL agent</b> that converts business questions into optimized queries and auto-generates insights & visualizations.",
      "Designed hybrid reasoning pipeline to detect ambiguity in queries, <b>reducing incorrect executions by 30%</b>.",
      "Implemented a <b>document intelligence pipeline</b> using Vertex AI to convert lease agreements into JSON knowledge tables — processed 1000+ pages.",
      "Built semantic retrieval + structured data agents for clause-level Q&A, <b>improving response accuracy by 35%</b>.",
    ],
  },
  {
    id: "deepedge",
    company: "DeepEdge.ai",
    location: "Hyderabad, India",
    period: "Sep 2024 — Nov 2024",
    role: "Machine Learning Engineer Intern",
    color: "#7c3aed",
    bullets: [
      "Spearheaded enhancement of a <b>video annotation tool</b>, improving accuracy and efficiency for large-scale ML training datasets.",
      "Developed <b>Constructor and De-Constructor models</b> using VLMs for Security & Surveillance — object detection, tracking, and event analysis.",
    ],
  },
  {
    id: "iitropar",
    company: "IIT Ropar",
    location: "Rupnagar, India",
    period: "Jul 2023 — May 2024",
    role: "Researcher",
    color: "#10b981",
    bullets: [
      "Conducted research on <b>automated chart data extraction and summarization</b> using deep learning on diverse chart image datasets.",
      "Fine-tuned and evaluated LLMs (BART, T5, Phi-2, LLaMA2) for <b>accessible chart summaries</b> targeting visually impaired users.",
      "Built end-to-end pipelines using Python, TensorFlow, MMDetection for visual-to-language generation.",
    ],
  },
  {
    id: "cognizant",
    company: "Cognizant",
    location: "Kolkata, India",
    period: "Mar 2021 — Aug 2022",
    role: "Programmer Analyst",
    color: "#f9a825",
    bullets: [
      "Developed and maintained <b>high-performance web applications</b> using Angular, Core Java, Spring Framework, and MySQL.",
      "Built scalable, reliable applications with HTML, Bootstrap, JavaScript, and JUnit test coverage.",
    ],
  },
];

export const skills = [
  { label: "Languages", tags: ["Python", "Core Java", "C++", "SQL", "JavaScript"], color: "#00d9ff" },
  { label: "AI / ML", tags: ["Agentic AI", "RAG", "Prompt Engineering", "LLM Fine-tuning", "Vector Search", "NLP", "HuggingFace", "TensorFlow", "Scikit-learn"], color: "#7c3aed" },
  { label: "Cloud", tags: ["Vertex AI", "BigQuery", "GCS Buckets", "AWS S3", "AWS EC2", "Log Explorer"], color: "#10b981" },
  { label: "Tools & Frameworks", tags: ["Git", "GitHub", "BitBucket", "MySQL", "MMDetection", "Spring Framework", "Angular"], color: "#f9a825" },
];

export const stats = [
  { num: "700+", label: "LeetCode Problems" },
  { num: "200+", label: "Codeforces Problems" },
  { num: "3+", label: "Years Experience" },
];

export const projects = [
  {
    id: "chart-summarization",
    num: "01",
    title: "Chart Data Extraction & Summarization",
    shortDesc: "Deep learning pipeline for extracting structured data from charts and generating accessible LLM-powered summaries.",
    longDesc: "Engineered a full pipeline for extracting structured data from diverse chart types (bar, line, pie, scatter) using deep learning models trained on large chart image datasets. Applied heuristic-based data preprocessing to enhance accuracy. Fine-tuned multiple LLMs — BART, T5, Phi-2, and LLaMA2 — to generate concise, accurate, and accessible summaries specifically targeting visually impaired users.",
    tech: ["Python", "TensorFlow", "MMDetection", "BART", "T5", "LLaMA2", "Phi-2", "OpenCV"],
    period: "Jul 2023 — May 2024",
    type: "research",
    github: "https://github.com/sazidrj/MTP-2024",
    highlights: [
      "Trained on 10,000+ chart images across 6 chart types",
      "Fine-tuned 4 different LLM architectures",
      "Designed for accessibility — screen-reader friendly summaries",
      "End-to-end pipeline: image → data → natural language",
    ],
    media: { type: "highlights" },
  },
  {
    id: "jpeg-codec",
    num: "02",
    title: "JPEG Encoder & Decoder",
    shortDesc: "Custom JPEG codec from scratch with DCT compression, quantization, and visual quality comparison tools.",
    longDesc: "Implemented a full JPEG encode/decode pipeline from scratch. The encoder applies color space conversion (RGB → YCbCr), 8×8 block DCT, quantization with configurable quality matrices, and Huffman entropy coding. The decoder reverses all steps to reconstruct the image. Built a visual comparison tool to inspect compression artifacts at various quality levels.",
    tech: ["Python", "NumPy", "OpenCV", "Matplotlib", "SciPy"],
    period: "2023",
    type: "vision",
    github: "https://github.com/sazidrj/JPEG_LZW/tree/main",
    highlights: [
      "Full DCT-based compression pipeline from scratch",
      "Configurable quality factor (1–100)",
      "PSNR & SSIM metrics for quality assessment",
      "Side-by-side visual comparison at multiple quality levels",
    ],
    media: {
      type: "jpeg-demo",
      examples: [
        {
          label: "Portrait",
          original: b() +'/projects/jpeg/original.jpeg',
          encoded: b() + '/projects/jpeg/encoded.png',
          quality: 50,
          compressionRatio: "8.2x",
          psnr: "34.1 dB",
          placeholder: "Portrait — Q50",
        },
        {
          label: "Landscape",
          original: null,
          encoded: null,
          quality: 25,
          compressionRatio: "15.4x",
          psnr: "28.7 dB",
          placeholder: "Landscape — Q25",
        },
        {
          label: "High Detail",
          original: null,
          encoded: null,
          quality: 75,
          compressionRatio: "4.1x",
          psnr: "39.5 dB",
          placeholder: "High Detail — Q75",
        },
      ],
    },
  },
  {
    id: "image-morphing",
    num: "03",
    title: "Image Morphing",
    shortDesc: "Smooth facial and object morphing using Delaunay triangulation warping and cross-dissolve blending.",
    longDesc: "Implemented a geometry-based image morphing system using Delaunay triangulation for mesh warping combined with cross-dissolve blending. The system identifies corresponding feature points between two images, subdivides both into triangular meshes, and interpolates between them to create smooth transition frames compiled into animated GIFs.",
    tech: ["Python", "OpenCV", "SciPy", "NumPy", "Delaunay Triangulation"],
    period: "2023",
    type: "vision",
    github: "https://github.com/sazidrj/Image-Morphing",
    highlights: [
      "Delaunay triangulation for mesh-based warping",
      "Affine transformation per triangle pair",
      "Cross-dissolve alpha blending across frames",
      "Exports to GIF and MP4",
    ],
    media: {
      type: "morphing",
      sourceA: b() +'/projects/morphing/img1.jpg',
      sourceB: b() + '/projects/morphing/img21.jpg',
      gif: b() + '/projects/morphing/morphed2.gif',
      strip: b() + '/projects/morphing/imagemorphing.png',
      fromLabel: "Source A",
      toLabel: "Source B",
      frames: 20,
      duration: "3s",
    },
  },
  {
    id: "ml-course",
    num: "04",
    title: "ML Algorithms from Scratch",
    shortDesc: "Implemented core ML algorithms from scratch in Python during M.Tech — covering classification, regression, SVMs, PCA, and neural networks.",
    longDesc: "As part of the Machine Learning course at IIT Ropar, implemented foundational ML algorithms entirely from scratch without sklearn model implementations — building deep intuition for the mathematics behind each method. Covered PAC learnability, hypothesis testing, linear & polynomial regression, logistic regression, SVM with kernel tricks, PCA for dimensionality reduction, decision trees, gradient descent variants, and a multi-layer neural network.",
    tech: ["Python", "NumPy", "Matplotlib", "SciPy", "Gradient Descent", "Backpropagation"],
    period: "Jan 2023 — Apr 2023",
    type: "research",
    github: "https://github.com/sazidrj/Machine-Learning-Course",
    highlights: [
      "Implemented 10+ algorithms from scratch — zero sklearn model dependencies",
      "KNN decision boundary visualization on Gate vs UGC score dataset",
      "Neural network trained on hand gesture dataset (digits 1–9, 9 classes)",
      "Covered PAC learnability, kernel SVMs, PCA, decision trees & backpropagation",
    ],
    media: {
      type: "image-slider",
      slides: [
        { src: b() + '/projects/ml/kernel_svm.png', title: "Kernel SVM", caption: "" },
        {
          src: b() + '/projects/ml/neural_network.png',
          title: "Hand Gesture Dataset — Neural Network",
          caption: "9-class hand gesture dataset (digits 1–9) used to train a multi-layer neural network implemented from scratch.",
        },
        { src: b() +'/projects/ml/polynomial.png', title: "Polynomial Regression", caption: "" },
        { src: b() +'/projects/ml/support_vectors.png', title: "Support Vector", caption: "" },
        { src: b() + '/projects/ml/ridge.png', title: "Ridge Regression", caption: "" },
      ],
    },
  },
];

export const showcase = [
  {
    id: "portfolio-site",
    title: "AI Engineer Portfolio",
    url: "sazidrj.github.io/portfolio",
    desc: "This site — production-grade 3D portfolio with WebGL knowledge graph, interactive project demos, and smooth scroll animations.",
    tech: ["React", "Three.js", "Vite"],
    status: "live",
    color1: "rgba(0,217,255,0.15)",
    color2: "rgba(124,58,237,0.15)",
  },
  {
    id: "client-saas",
    title: "SaaS Dashboard",
    url: "your-saas-project.com",
    desc: "Full-stack analytics dashboard with real-time data visualization, role-based access control, and REST API integration.",
    tech: ["Next.js", "Tailwind", "Prisma"],
    status: "coming-soon",
    color1: "rgba(124,58,237,0.15)",
    color2: "rgba(249,168,37,0.15)",
  },
  {
    id: "client-ecom",
    title: "E-Commerce Platform",
    url: "your-ecommerce.com",
    desc: "Modern e-commerce site with product catalog, cart, checkout flow, Stripe payments, and admin panel.",
    tech: ["Next.js", "Stripe", "Sanity"],
    status: "coming-soon",
    color1: "rgba(16,185,129,0.15)",
    color2: "rgba(0,217,255,0.15)",
  },
];

export const education = [
  {
    id: "iitropar-edu",
    degree: "M.Tech — Artificial Intelligence",
    school: "IIT Ropar",
    period: "Aug 2022 — May 2024",
    location: "Rupnagar, Punjab",
    color: "#00d9ff",
    icon: "AI",
  },
  {
    id: "kiet",
    degree: "B.Tech — Computer Science & Engineering",
    school: "KIET Group of Institutions",
    period: "Aug 2017 — Jul 2021",
    location: "Ghaziabad, UP",
    color: "#7c3aed",
    icon: "CS",
  },
];
