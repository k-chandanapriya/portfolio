// All portfolio content lives here, taken from the CV (November 2026).
// Edit this file to update the site. No component changes needed.

export const profile = {
  name: 'Chandana Priya',
  surname: 'Kummarigunta',
  role: 'AI & Machine Learning Engineer',
  degree: 'M.Sc. Applied Computer Science',
  location: 'Stuttgart, Germany',
  availability: 'Open to entry-level AI/ML roles and relocation',
  email: 'chandanapriya.k2002@gmail.com',
  linkedin: 'https://www.linkedin.com/in/chandanapriyak',
  github: 'https://github.com/k-chandanapriya',
  cv: 'Chandana-Priya-Kummarigunta-CV.pdf',
  photo: 'chandana.jpg?v=bright',
  intro:
    'I turn cutting-edge AI into products people can trust. I fine-tune large language models, build RAG systems that reach 95.7% Recall@5, and engineer real-time ML pipelines that score transactions in under 10 ms. Fast, accurate and ready for the real world.',
  about: [
    'Computer scientist with an M.Sc. in Applied Computer Science from SRH University Stuttgart, specialising in LLM fine-tuning, Retrieval-Augmented Generation (RAG) and multimodal AI.',
    'I care about measurable results: retrieval quality, model accuracy, latency and security. I approach every system with a systematic, experimental mindset. I am looking for an entry-level role in AI/ML engineering, data science or software development in Germany.',
  ],
}

export const stats = [
  { value: 73540, label: 'vectors indexed in my thesis RAG pipeline', format: 'int' },
  { value: 95.7, label: 'average Recall@5 on hybrid retrieval', suffix: '%', format: 'dec' },
  { value: 511, label: 'ms average end-to-end latency', suffix: 'ms', format: 'int' },
  { value: 1.85, label: 'million transactions scored for fraud', suffix: 'M+', format: 'dec2' },
]

export const thesis = {
  kicker: "Master's Thesis, SRH University Stuttgart, 2026",
  title: 'RAG Adaptive Multimodal AI Chatbot for Elderly Care',
  summary:
    'A dual-interface multimodal assistant that listens, speaks and reads photos of medication, grounding every Gemini answer in trusted medical knowledge for elderly users and their caregivers.',
  pipeline: [
    { step: '01', name: 'Chunking', detail: '512-token chunks of curated medical knowledge' },
    { step: '02', name: 'Embeddings', detail: 'Sentence-transformer vectors' },
    { step: '03', name: 'Hybrid search', detail: 'FAISS dense + BM25 sparse retrieval' },
    { step: '04', name: 'Fusion', detail: 'Reciprocal Rank Fusion of both result lists' },
    { step: '05', name: 'Reranking', detail: 'Cross-encoder reranks the top candidates' },
    { step: '06', name: 'Generation', detail: 'LoRA-tuned Gemini 1.5 Flash answers, grounded' },
  ],
  metrics: [
    { value: '100%', label: 'pass rate (15/15 test queries)' },
    { value: '95.7%', label: 'average Recall@5' },
    { value: '511 ms', label: 'average end-to-end latency' },
    { value: '75%', label: 'accuracy of LoRA-tuned Gemini (rank 16) on held-out geriatric QA' },
  ],
  highlights: [
    'Hybrid retrieval over 73,540 vectors: FAISS + BM25, fused with Reciprocal Rank Fusion and reranked by a cross-encoder.',
    'Fine-tuned Gemini 1.5 Flash with LoRA (rank = 16) on a curated geriatric question-answering dataset.',
    'React caregiver UI on a FastAPI backend serving the combined RAG + fine-tuned LLM pipeline.',
    'Designed GCP IAM hardening, Vision / Document AI prescription recognition and event-driven alerts with Pub/Sub and Cloud Scheduler.',
  ],
  stack: [
    'Python', 'LangChain', 'FAISS', 'BM25', 'Vertex AI (Gemini)', 'Speech-to-Text', 'Text-to-Speech',
    'Vision AI', 'Document AI', 'Cloud Run', 'Firestore', 'Pub/Sub', 'BigQuery', 'React', 'FastAPI',
  ],
}

export const projects = [
  {
    title: 'FraudStream',
    subtitle: 'Real-time credit card fraud detection',
    tag: 'Personal project',
    description:
      'Scores card transactions as they stream through Apache Kafka. An XGBoost model trained on 1.85M+ transactions (~0.5% fraud) with weighted training, served by FastAPI in under 10 ms per request, with a live Streamlit monitoring dashboard. Five services, one Docker Compose command.',
    metrics: ['90% recall', '85% precision', 'PR-AUC 0.88', '<10 ms / request'],
    stack: ['Python', 'XGBoost', 'Kafka', 'FastAPI', 'Streamlit', 'Docker'],
    link: 'https://github.com/k-chandanapriya/Real-Time-Card-Fraud-Detection-Pipeline',
  },
  {
    title: 'ElderSense AI',
    subtitle: 'Multilingual elderly healthcare chatbot',
    tag: "Master's research project, 2025 to 2026",
    description:
      'Gemini 1.5 Flash fine-tuned on Vertex AI through a full JSONL-to-endpoint deployment pipeline, answering in German, Spanish, Hindi and more. React + FastAPI architecture with IAM-secured REST APIs and Cloud Text-to-Speech.',
    metrics: ['Sub-2 s average response', 'Multilingual', 'IAM-secured APIs'],
    stack: ['Vertex AI', 'Gemini 1.5 Flash', 'Cloud TTS', 'GCP IAM', 'React', 'FastAPI'],
  },
  {
    title: 'DevSecOps Pipeline',
    subtitle: 'Quality & security gates for TensorFlow projects',
    tag: '2024, DevSecOps engineer',
    description:
      'A CI/CD pipeline combining SonarQube static analysis, Bandit security linting and Trivy container scanning, with automated JSON reports so failing quality gates are visible before merge.',
    metrics: ['50+ CVE checks per build', '~40% less manual review'],
    stack: ['SonarQube', 'Bandit', 'Trivy', 'CI/CD', 'Docker'],
    link: 'https://github.com/k-chandanapriya/devSecOps-nov25',
  },
  {
    title: 'Satellite Tracker',
    subtitle: 'Live orbital positions on an interactive map',
    tag: 'Team project',
    description:
      'Web application that fetches live satellite data (TLE) from external APIs and visualises current positions and orbital paths on an interactive map.',
    metrics: ['Live TLE data', 'Interactive map'],
    stack: ['JavaScript', 'REST APIs', 'Orbital data'],
    link: 'https://github.com/mukilathuruvan/satellite-tracker-app',
  },
  {
    title: 'Object Detection',
    subtitle: 'Everyday objects with TensorFlow',
    tag: '2024',
    description: 'A TensorFlow object detection pipeline for everyday objects, evaluated with mean Average Precision (mAP).',
    metrics: ['mAP evaluation'],
    stack: ['TensorFlow', 'Python', 'Computer vision'],
  },
  {
    title: 'University Assistant Chatbots',
    subtitle: 'Gemini vs. OpenAI, compared systematically',
    tag: '2024',
    description:
      'Domain-specific university chatbots built with Gemini and the OpenAI API, with a systematic comparison of response quality, relevance and consistency.',
    metrics: ['LLM evaluation'],
    stack: ['Gemini', 'OpenAI API', 'Prompt engineering'],
  },
]

export const timeline = [
  {
    period: 'Oct 2024 to 2026',
    title: 'M.Sc. Applied Computer Science',
    place: 'SRH University Stuttgart, Germany',
    kind: 'Education',
    points: [
      'Coursework: Applied Artificial Intelligence, In-Memory Databases, IT Security, Software Architecture.',
      "Master's thesis (completed): RAG Adaptive Multimodal AI Chatbot for Elderly Care.",
    ],
  },
  {
    period: 'Jan 2024 to Jun 2024',
    title: 'Python Developer Intern',
    place: 'Vilindha Technologies, India',
    kind: 'Experience',
    points: [
      'Supported ML model optimisation for cab price prediction, including data preprocessing and feature engineering.',
      'Cleaned and preprocessed large datasets; contributed to model benchmarking and evaluation.',
      'Contributed to project documentation and technical presentations.',
    ],
  },
  {
    period: 'Aug 2020 to Apr 2024',
    title: 'B.Sc. Computer Science Engineering',
    place: 'Kuppam Engineering College, India',
    kind: 'Education',
    points: [],
  },
]

export const skills = [
  { group: 'LLMs & Generative AI', items: ['LLM fine-tuning (LoRA)', 'RAG', 'LangChain', 'Gemini (Vertex AI)', 'OpenAI API', 'Prompt engineering'] },
  { group: 'Information Retrieval', items: ['FAISS', 'BM25', 'Hybrid search', 'Reciprocal Rank Fusion', 'Sentence-transformers', 'Cross-encoder reranking'] },
  { group: 'Machine Learning', items: ['XGBoost', 'TensorFlow', 'PyTorch (fundamentals)', 'Deep learning', 'Feature engineering', 'Imbalanced data', 'Recall@k, PR-AUC, mAP'] },
  { group: 'Programming', items: ['Python', 'Java', 'JavaScript', 'R', 'SQL'] },
  { group: 'Backend & Frontend', items: ['FastAPI', 'REST APIs', 'React.js', 'Streamlit'] },
  { group: 'Data & Streaming', items: ['Apache Kafka', 'BigQuery', 'Pub/Sub', 'Real-time pipelines'] },
  { group: 'Google Cloud', items: ['Vertex AI', 'Cloud Run', 'Firestore', 'Speech-to-Text / TTS', 'Vision AI', 'Document AI', 'IAM'] },
  { group: 'DevOps & Security', items: ['Docker', 'Docker Compose', 'CI/CD', 'SonarQube', 'Bandit', 'Trivy'] },
  { group: 'Databases', items: ['SQL', 'MongoDB', 'Neo4j', 'Redis', 'Firestore', 'BigQuery'] },
]

export const languages = [
  { name: 'English', level: 'Fluent' },
  { name: 'German', level: 'Basic (A2)' },
]

export const marquee = [
  'RAG', 'LLM Fine-tuning', 'Multimodal AI', 'Vertex AI', 'Gemini', 'LangChain', 'FAISS',
  'XGBoost', 'Apache Kafka', 'FastAPI', 'React', 'Docker', 'MLOps',
]
