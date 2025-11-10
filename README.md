# AI Engineering Roadmap

A comprehensive, production-ready roadmap for becoming an AI Engineer. This interactive curriculum covers everything from foundational skills to advanced LLM engineering and MLOps, with hands-on projects and measurable learning objectives.

## 🎯 Project Status

**✅ Phase 0 Complete:** Schema & Validation Infrastructure  
**✅ Phase 1 Complete:** Modular Site Refactor  
**🟡 Phase 2 In Progress:** Content Expansion (capstones 3/9 detailed)  
**✅ Phase 5 Complete:** Single-File Build  
**⏳ Phase 3-4 Remaining:** Advanced Features & Polish

### What's Working Now

✅ **30 validated topics** across 6 categories (Core, High ROI, Optional, Advanced, LLM, MLOps)  
✅ **9 capstone projects** with 3 fully detailed specifications  
✅ **Modular site** (`site/` directory) with HTML, CSS, JS, and JSON  
✅ **Single-file build** (`dist/index.html`) ready for deployment  
✅ **localStorage progress tracking** with import/export  
✅ **Category and level filters** for topic browsing  
✅ **SEO-optimized** with structured data and noscript fallback  
✅ **Schema validation** for data quality assurance

## 📋 Project Structure

```
.
├── index.html                 # Original single-file app (to be replaced)
├── ROADMAP_SCHEMA.md          # Canonical JSON schema documentation
├── validator.js               # Schema validator (browser + Node.js)
├── build-single-file.js       # Build script for dist/index.html
├── test-validator.html        # Browser test page for validator
│
├── site/                      # Modular source files (for development)
│   ├── index.html            # Main HTML structure (7.2 KB)
│   ├── style.css             # All styles (28.6 KB)
│   ├── app.js                # Application logic (12.4 KB)
│   └── roadmap.json          # Data: 30 topics + 9 capstones (51.2 KB)
│
├── dist/                      # Single-file build (for deployment)
│   ├── index.html            # Self-contained app (100 KB)
│   └── README.md             # Deployment guide
│
├── capstones/                 # Capstone project specifications
│   ├── README.md             # Capstones overview
│   ├── nlp-rag-qa-system.md              # ⭐ Detailed (9 KB)
│   ├── mlops-deployment-pipeline.md      # ⭐ Detailed (9.3 KB)
│   └── ml-recommendation-system.md       # ⭐ Detailed (11 KB)
│
├── seed/                      # Example data for testing
│   └── seed-example.json     # 12 topics + 1 capstone
│
└── README.md                  # This file
```

## 🚀 Quick Start

### Option 1: View Modular Site (Development)

```bash
cd site
python3 -m http.server 8080
# Visit http://localhost:8080
```

### Option 2: View Single-File Build (Production)

```bash
cd dist
python3 -m http.server 8080
# Visit http://localhost:8080
```

Or just open `dist/index.html` directly in your browser.

### Option 3: Rebuild from Source

```bash
node build-single-file.js
# Generates dist/index.html from site/ files
```

## ✨ Features

### For Learners

- **30 Curated Topics** across 6 categories with clear learning paths
- **Progress Tracking** with localStorage (persists across sessions)
- **Import/Export** your progress as JSON
- **Smart Filters** by category (Core, High ROI, LLM, MLOps, etc.) and level
- **Detailed Projects** for each topic with rubrics and deliverables
- **Resource Curation** with 2-4 hand-picked resources per topic
- **Capstone Projects** demonstrating production-ready skills

### For Developers

- **Modular Architecture** (`site/` directory for easy maintenance)
- **Single-File Build** (`dist/index.html` for easy deployment)
- **Schema Validation** ensuring data quality
- **Static & Fast** - no backend, no build tools required (except for dist)
- **SEO-Optimized** with structured data and noscript support
- **Open Source** - contribute improvements and new topics

## 📚 Topics Covered

### Core Skills (6 topics)
Python programming, linear algebra, statistics, calculus, git, shell

### High ROI (3 topics)  
Machine learning foundations, data engineering, feature engineering

### Optional (18 topics)
Various specialized skills and tools

### Advanced (3 topics)
Deep learning, computer vision, reinforcement learning

### LLM Engineering (0 topics - coming in Phase 2+)
Prompt engineering, fine-tuning, RAG, agents

### MLOps (0 topics - coming in Phase 2+)
Deployment, monitoring, CI/CD, infrastructure

## 🎓 Capstone Projects

**3 Fully Detailed** (with complete specifications, rubrics, templates):
1. **Production RAG Q&A System** (NLP Engineer) - 100-120 hours
2. **End-to-End ML Deployment Pipeline** (MLOps Engineer) - 100-120 hours
3. **Multi-Modal Recommendation System** (ML Engineer) - 100-120 hours

**6 Outlined** (basic descriptions, to be expanded):
- NLP: Sentiment Analysis API, Named Entity Recognition
- MLOps: Kubernetes Model Serving, Automated ML Pipeline  
- ML: Time Series Forecasting, Computer Vision Object Detection

## 📚 Documentation

### Schema Documentation

See [ROADMAP_SCHEMA.md](./ROADMAP_SCHEMA.md) for:
- Complete JSON Schema specification
- Field-by-field explanations
- Example topic and capstone objects
- Validation rules and best practices

### Data Requirements

**For full roadmap (production):**
- Minimum 30 topics across 6 categories (Core, High ROI, Optional, Advanced, LLM, MLOps)
- Minimum 9 capstone projects (3 per role: NLP Engineer, MLOps Engineer, ML Engineer)
- Each topic must have exactly 3 learning objectives
- Each topic must have 2-4 curated resources
- All IDs must be unique and follow kebab-case format

**For seed example (Phase 0):**
- 8-12 example topics showing schema structure
- 1 example capstone showing capstone schema
- Valid against schema structure (but not minimum count requirements)

## 🛠️ Development

### Testing the Validator

```bash
# Browser test
open test-validator.html

# Command line test
node -e "
const {validateRoadmap, formatValidationResult} = require('./validator.js');
const data = require('./site/roadmap.json');
console.log(formatValidationResult(validateRoadmap(data)));
"
```

### Building for Production

```bash
node build-single-file.js
# Output: dist/index.html (100 KB, target <500 KB ✅)
```

### Contributing

This project follows a phased development approach (see [Epic Issue](#)). 

**Current Focus:** Phase 2 content expansion
- Expanding remaining 6 capstone specifications
- Enriching existing topics with better resources
- Adding LLM and MLOps category topics

**PR Guidelines:**
- Reference the Epic issue number
- Use commit prefix `[phaseX]` (e.g., `[phase2] Add LLM topics`)
- Include validation results for data changes
- Provide screenshots for UI changes

## 📄 License

This roadmap is open source and available for educational purposes.

## 🙏 Acknowledgments

Built to help aspiring AI engineers navigate the rapidly evolving field of AI/ML with a structured, project-based curriculum.

---

**Current Version:** 2.0.0 (Schema Version)  
**Last Updated:** 2025-11-10
