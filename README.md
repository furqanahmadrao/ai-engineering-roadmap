# AI Engineering Roadmap

A comprehensive, production-ready roadmap for becoming an AI Engineer. This interactive curriculum covers everything from foundational skills to advanced LLM engineering and MLOps, with hands-on projects and measurable learning objectives.

## 🎯 Project Status

**Phase 0 Complete:** Schema & Validation Infrastructure
- ✅ JSON Schema documented in `ROADMAP_SCHEMA.md`
- ✅ Seed example with 12 topics + 1 capstone in `seed/seed-example.json`
- ✅ Browser-compatible validator in `validator.js`

**Coming Soon:**
- Phase 1: Modular site refactor (HTML/CSS/JS separation)
- Phase 2: Full curriculum (≥30 topics + 9 capstones)
- Phase 3: Import/export, role filters, planning tools
- Phase 4: Accessibility, testing, documentation
- Phase 5: Single-file build for GitHub Pages

## 📋 Current Structure

```
.
├── index.html              # Current single-file GitHub Pages app
├── ROADMAP_SCHEMA.md       # Canonical JSON schema documentation
├── validator.js            # Schema validator (browser-compatible)
├── test-validator.html     # Browser test page for validator
└── seed/
    └── seed-example.json   # Example roadmap data (12 topics + 1 capstone)
```

## 🚀 Quick Start

### Preview the Current Site

Simply open `index.html` in a web browser or visit the [GitHub Pages deployment](https://furqanahmadrao.github.io/ai-engineering-roadmap/).

### Test the Validator

1. Open `test-validator.html` in a web browser
2. Click "Validate Seed Example" to test the seed data
3. Or upload your own `roadmap.json` file to validate

### Validate Programmatically

#### In Browser

```html
<script src="validator.js"></script>
<script>
  fetch('roadmap.json')
    .then(r => r.json())
    .then(data => {
      const result = validateRoadmap(data);
      console.log(formatValidationResult(result));
    });
</script>
```

#### In Node.js

```javascript
const { validateRoadmap, formatValidationResult } = require('./validator.js');
const roadmapData = require('./roadmap.json');

const result = validateRoadmap(roadmapData);
console.log(formatValidationResult(result));
```

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

### Phase 0 Validation Testing

The seed example intentionally has fewer items than required for production:
- Has 12 topics (production requires ≥30)
- Has 1 capstone (production requires ≥9)

This is expected for Phase 0. The validator correctly identifies these as errors.

To test schema structure validation without count errors, you can:
1. Use `test-validator.html` in a browser
2. Check that individual topics and capstones pass validation
3. Verify prerequisite references and ID uniqueness checks work

### Contributing

This project follows a phased development approach. See the [Epic Issue](#) for the full roadmap and contribution guidelines.

**PR Requirements:**
- Reference the Epic issue number
- Use commit prefix `[phaseX]` (e.g., `[phase0] Add schema validator`)
- Include validation results
- Provide demo/screenshot for UI changes

## 📄 License

This roadmap is open source and available for educational purposes.

## 🙏 Acknowledgments

Built to help aspiring AI engineers navigate the rapidly evolving field of AI/ML with a structured, project-based curriculum.

---

**Current Version:** 2.0.0 (Schema Version)  
**Last Updated:** 2025-11-10
