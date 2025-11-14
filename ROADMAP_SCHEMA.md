# AI Engineering Roadmap — JSON Schema

This document defines the canonical JSON Schema for the static, client‑side AI Engineering Roadmap.

Use this to validate `site/roadmap.json` and any imported/exported plans.

## Schema (Draft 2020-12 compatible)

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/schemas/ai-roadmap.schema.json",
  "title": "AI Engineering Roadmap",
  "type": "object",
  "required": ["topics", "capstones", "version"],
  "properties": {
    "version": {"type": "string"},
    "topics": {
      "type": "array",
      "minItems": 1,
      "items": {"$ref": "#/$defs/topic"}
    },
    "capstones": {
      "type": "array",
      "minItems": 1,
      "items": {"$ref": "#/$defs/capstone"}
    }
  },
  "$defs": {
    "resource": {
      "type": "object",
      "required": ["type", "title", "url"],
      "properties": {
        "type": {"enum": ["course", "doc", "repo", "article", "video"]},
        "title": {"type": "string", "minLength": 1},
        "url": {"type": "string", "format": "uri"},
        "why": {"type": "string"}
      },
      "additionalProperties": false
    },
    "rubric": {
      "type": "object",
      "properties": {
        "functionality": {"type": "integer", "minimum": 0},
        "reproducibility": {"type": "integer", "minimum": 0},
        "tests": {"type": "integer", "minimum": 0},
        "writeup": {"type": "integer", "minimum": 0}
      },
      "required": ["functionality", "reproducibility", "tests", "writeup"],
      "additionalProperties": false
    },
    "project": {
      "type": "object",
      "required": ["title", "deliverables", "rubric"],
      "properties": {
        "title": {"type": "string"},
        "deliverables": {
          "type": "array",
          "minItems": 1,
          "items": {"type": "string"}
        },
        "rubric": {"$ref": "#/$defs/rubric"}
      },
      "additionalProperties": false
    },
    "assessments": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["type", "description"],
        "properties": {
          "type": {"enum": ["quiz", "checkpoint", "review"]},
          "description": {"type": "string"},
          "answer_key_url": {"type": "string", "format": "uri"}
        },
        "additionalProperties": false
      }
    },
    "topic": {
      "type": "object",
      "required": [
        "id",
        "title",
        "category",
        "level",
        "estimated_hours",
        "prerequisites",
        "learning_objectives",
        "resources",
        "project",
        "assessments",
        "tags",
        "role_mapping"
      ],
      "properties": {
        "id": {"type": "string", "pattern": "^[a-z0-9-]+$"},
        "title": {"type": "string"},
        "category": {"enum": ["Core", "High ROI", "Optional", "Advanced", "LLM", "MLOps"]},
        "level": {"enum": ["Beginner", "Intermediate", "Advanced"]},
        "estimated_hours": {"type": "integer", "minimum": 1},
        "prerequisites": {"type": "array", "items": {"type": "string"}},
        "learning_objectives": {
          "type": "array",
          "minItems": 3,
          "items": {"type": "string"}
        },
        "resources": {
          "type": "array",
          "minItems": 2,
          "maxItems": 4,
          "items": {"$ref": "#/$defs/resource"}
        },
        "project": {"$ref": "#/$defs/project"},
        "assessments": {"$ref": "#/$defs/assessments"},
        "tags": {"type": "array", "items": {"type": "string"}},
        "role_mapping": {
          "type": "object",
          "minProperties": 1,
          "additionalProperties": {
            "type": "array",
            "items": {"type": "string"}
          }
        },
        "notes": {"type": "string"}
      },
      "additionalProperties": false
    },
    "capstone": {
      "type": "object",
      "required": ["id", "title", "roles", "project"],
      "properties": {
        "id": {"type": "string", "pattern": "^[a-z0-9-]+$"},
        "title": {"type": "string"},
        "roles": {"type": "array", "items": {"type": "string"}},
        "project": {"$ref": "#/$defs/project"},
        "rubric_url": {"type": "string", "format": "uri"}
      },
      "additionalProperties": false
    }
  },
  "additionalProperties": false
}
```

## Field Explanations

- version: semantic string for dataset versioning (e.g., "2.0.0-phase0").
- topics: array of topic objects. Each topic represents a unit with measurable objectives and a mini‑project.
- capstones: array of capstone definitions aligned to roles.

### Topic fields (high level)
- id: stable kebab-case slug.
- category: one of Core, High ROI, Optional, Advanced, LLM, MLOps.
- level: Beginner, Intermediate, Advanced.
- estimated_hours: integer estimate to complete.
- prerequisites: array of topic ids.
- learning_objectives: at least 3 objectives.
- resources: 2–4 high‑quality links with a short “why”.
- project: title, deliverables, rubric with points.
- assessments: optional quiz/checkpoints.
- role_mapping: which roles benefit and how.
- notes: optional tips, compute/cost guidance.

## Validation

A minimal in‑browser validator is provided at `site/index.html` using `site/validator.js`. It validates `site/roadmap.json` and any uploaded JSON file against the schema above.
