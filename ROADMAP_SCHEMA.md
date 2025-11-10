# AI Engineering Roadmap - JSON Schema Documentation

## Overview

This document defines the canonical JSON schema for the AI Engineering Roadmap. All roadmap data must conform to this schema to ensure consistency, validation, and proper rendering in the application.

## Schema Version

**Version:** 2.0.0  
**Last Updated:** 2025-11-10

---

## Full JSON Schema

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "AI Engineering Roadmap Schema",
  "description": "Schema for the AI Engineering Roadmap curriculum data",
  "type": "object",
  "required": ["version", "topics", "capstones"],
  "properties": {
    "version": {
      "type": "string",
      "description": "Schema version for compatibility tracking",
      "pattern": "^\\d+\\.\\d+\\.\\d+$"
    },
    "topics": {
      "type": "array",
      "description": "Array of learning topics in the roadmap",
      "minItems": 30,
      "items": {
        "$ref": "#/definitions/topic"
      }
    },
    "capstones": {
      "type": "array",
      "description": "Array of capstone projects",
      "minItems": 9,
      "items": {
        "$ref": "#/definitions/capstone"
      }
    }
  },
  "definitions": {
    "topic": {
      "type": "object",
      "required": [
        "id",
        "title",
        "category",
        "level",
        "estimated_hours",
        "learning_objectives",
        "resources",
        "project"
      ],
      "properties": {
        "id": {
          "type": "string",
          "description": "Stable slug identifier (lowercase, hyphenated)",
          "pattern": "^[a-z0-9-]+$"
        },
        "title": {
          "type": "string",
          "description": "Short, descriptive title of the topic",
          "minLength": 3,
          "maxLength": 80
        },
        "category": {
          "type": "string",
          "description": "Primary category for organization",
          "enum": ["Core", "High ROI", "Optional", "Advanced", "LLM", "MLOps"]
        },
        "level": {
          "type": "string",
          "description": "Difficulty level",
          "enum": ["Beginner", "Intermediate", "Advanced"]
        },
        "estimated_hours": {
          "type": "number",
          "description": "Estimated time to complete (in hours)",
          "minimum": 1,
          "maximum": 200
        },
        "prerequisites": {
          "type": "array",
          "description": "Array of topic IDs that should be completed first",
          "items": {
            "type": "string"
          },
          "default": []
        },
        "learning_objectives": {
          "type": "array",
          "description": "3 measurable learning outcomes",
          "minItems": 3,
          "maxItems": 3,
          "items": {
            "type": "string",
            "minLength": 10
          }
        },
        "resources": {
          "type": "array",
          "description": "2-4 curated learning resources",
          "minItems": 2,
          "maxItems": 4,
          "items": {
            "$ref": "#/definitions/resource"
          }
        },
        "project": {
          "$ref": "#/definitions/project",
          "description": "Hands-on project for this topic"
        },
        "assessments": {
          "type": "array",
          "description": "Optional assessments (quizzes, challenges)",
          "items": {
            "$ref": "#/definitions/assessment"
          },
          "default": []
        },
        "tags": {
          "type": "array",
          "description": "Searchable tags (technologies, concepts)",
          "items": {
            "type": "string"
          },
          "default": []
        },
        "role_mapping": {
          "type": "object",
          "description": "Mapping of this topic to AI engineering roles",
          "properties": {
            "NLP Engineer": {
              "type": "array",
              "items": { "type": "string" }
            },
            "MLOps Engineer": {
              "type": "array",
              "items": { "type": "string" }
            },
            "ML Engineer": {
              "type": "array",
              "items": { "type": "string" }
            }
          },
          "default": {}
        },
        "notes": {
          "type": "string",
          "description": "Optional notes on compute requirements, cost, common pitfalls",
          "default": ""
        }
      }
    },
    "resource": {
      "type": "object",
      "required": ["type", "title", "url"],
      "properties": {
        "type": {
          "type": "string",
          "enum": ["course", "doc", "repo", "article", "video", "book"]
        },
        "title": {
          "type": "string",
          "minLength": 3
        },
        "url": {
          "type": "string",
          "format": "uri"
        },
        "why": {
          "type": "string",
          "description": "Why this resource is recommended",
          "default": ""
        }
      }
    },
    "project": {
      "type": "object",
      "required": ["title", "deliverables", "rubric"],
      "properties": {
        "title": {
          "type": "string",
          "minLength": 5
        },
        "deliverables": {
          "type": "array",
          "description": "What the learner must produce",
          "minItems": 1,
          "items": {
            "type": "string"
          }
        },
        "rubric": {
          "type": "object",
          "description": "Grading criteria (key: criteria, value: max points)",
          "properties": {
            "functionality": {
              "type": "number",
              "minimum": 0,
              "maximum": 50
            },
            "reproducibility": {
              "type": "number",
              "minimum": 0,
              "maximum": 20
            },
            "tests": {
              "type": "number",
              "minimum": 0,
              "maximum": 15
            },
            "writeup": {
              "type": "number",
              "minimum": 0,
              "maximum": 15
            }
          },
          "additionalProperties": {
            "type": "number"
          }
        }
      }
    },
    "assessment": {
      "type": "object",
      "required": ["type", "description"],
      "properties": {
        "type": {
          "type": "string",
          "enum": ["quiz", "challenge", "peer-review"]
        },
        "description": {
          "type": "string"
        },
        "answer_key_url": {
          "type": "string",
          "format": "uri",
          "description": "Optional link to answer key or solution"
        }
      }
    },
    "capstone": {
      "type": "object",
      "required": [
        "id",
        "title",
        "role",
        "description",
        "estimated_hours",
        "deliverables",
        "rubric",
        "starter_template"
      ],
      "properties": {
        "id": {
          "type": "string",
          "pattern": "^[a-z0-9-]+$"
        },
        "title": {
          "type": "string"
        },
        "role": {
          "type": "string",
          "enum": ["NLP Engineer", "MLOps Engineer", "ML Engineer"]
        },
        "description": {
          "type": "string",
          "minLength": 50
        },
        "estimated_hours": {
          "type": "number",
          "minimum": 20,
          "maximum": 200
        },
        "prerequisites": {
          "type": "array",
          "items": { "type": "string" }
        },
        "deliverables": {
          "type": "array",
          "items": { "type": "string" },
          "minItems": 3
        },
        "rubric": {
          "type": "object",
          "additionalProperties": {
            "type": "number"
          }
        },
        "starter_template": {
          "type": "object",
          "properties": {
            "type": {
              "type": "string",
              "enum": ["notebook", "repo", "readme"]
            },
            "url": {
              "type": "string"
            }
          }
        },
        "dataset": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "url": { "type": "string" },
            "size": { "type": "string" }
          }
        },
        "compute_guidance": {
          "type": "string",
          "description": "Recommendations for compute resources and estimated costs"
        }
      }
    }
  }
}
```

---

## Field Explanations

### Root Object

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | Yes | Schema version (semver format) for compatibility tracking |
| `topics` | array | Yes | Array of at least 30 learning topics |
| `capstones` | array | Yes | Array of at least 9 capstone projects (3 per role) |

---

### Topic Object

Each topic represents a discrete learning unit in the roadmap.

#### Core Fields

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `id` | string | Yes | Stable slug identifier (lowercase, hyphenated) | `"python-fundamentals"` |
| `title` | string | Yes | Short, descriptive title (3-80 chars) | `"Python Programming for AI"` |
| `category` | enum | Yes | One of: `Core`, `High ROI`, `Optional`, `Advanced`, `LLM`, `MLOps` | `"Core"` |
| `level` | enum | Yes | One of: `Beginner`, `Intermediate`, `Advanced` | `"Beginner"` |
| `estimated_hours` | number | Yes | Time to complete (1-200 hours) | `40` |
| `prerequisites` | array | No | List of topic `id`s that should be completed first | `["python-fundamentals"]` |
| `learning_objectives` | array | Yes | Exactly 3 measurable learning outcomes | See example below |
| `resources` | array | Yes | 2-4 curated learning resources | See Resource Object |
| `project` | object | Yes | Hands-on project definition | See Project Object |
| `assessments` | array | No | Optional quizzes or challenges | See Assessment Object |
| `tags` | array | No | Searchable keywords (technologies, concepts) | `["pytorch", "deep-learning"]` |
| `role_mapping` | object | No | How this topic maps to different AI roles | See Role Mapping |
| `notes` | string | No | Compute/cost tips, common pitfalls | `"Requires GPU for training"` |

#### Learning Objectives

Must be **exactly 3** measurable outcomes. Use action verbs (implement, explain, build, analyze).

**Good examples:**
- `"Build a neural network from scratch using NumPy"`
- `"Explain the backpropagation algorithm mathematically"`
- `"Deploy a trained model to a REST API endpoint"`

**Avoid vague objectives:**
- ❌ `"Understand deep learning"`
- ❌ `"Learn about transformers"`

---

### Resource Object

Each resource is a curated learning material.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `type` | enum | Yes | One of: `course`, `doc`, `repo`, `article`, `video`, `book` | `"course"` |
| `title` | string | Yes | Resource name | `"CS231n: CNN for Visual Recognition"` |
| `url` | string (URI) | Yes | Valid URL to the resource | `"https://cs231n.stanford.edu/"` |
| `why` | string | No | Why this resource is recommended | `"Best structured course for CV fundamentals"` |

---

### Project Object

Defines the hands-on deliverable for each topic.

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `title` | string | Yes | Project name | `"Sentiment Classifier with BERT"` |
| `deliverables` | array | Yes | What the learner must produce | `["GitHub repo", "Deployed demo", "Technical writeup"]` |
| `rubric` | object | Yes | Grading criteria (see below) | See Rubric Object |

#### Rubric Object

Standard rubric categories with point values:

```json
{
  "functionality": 10,
  "reproducibility": 10,
  "tests": 5,
  "writeup": 5
}
```

You can add custom criteria, but these four are recommended for consistency.

---

### Assessment Object (Optional)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `type` | enum | Yes | One of: `quiz`, `challenge`, `peer-review` |
| `description` | string | Yes | What the assessment covers |
| `answer_key_url` | string (URI) | No | Link to solutions (if public) |

---

### Role Mapping Object (Optional)

Maps the topic to AI engineering roles. Each role can have an array of relevance notes.

```json
{
  "NLP Engineer": ["Core skill for text preprocessing", "Required for transformer models"],
  "MLOps Engineer": ["Useful for pipeline scripting"],
  "ML Engineer": ["Foundation for all ML work"]
}
```

Supported roles:
- `NLP Engineer`
- `MLOps Engineer`
- `ML Engineer`

---

### Capstone Object

Large-scale projects that integrate multiple topics, organized by role.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Stable identifier |
| `title` | string | Yes | Capstone project name |
| `role` | enum | Yes | One of: `NLP Engineer`, `MLOps Engineer`, `ML Engineer` |
| `description` | string | Yes | Detailed project description (min 50 chars) |
| `estimated_hours` | number | Yes | Time to complete (20-200 hours) |
| `prerequisites` | array | No | Required topic IDs |
| `deliverables` | array | Yes | At least 3 deliverables |
| `rubric` | object | Yes | Grading criteria with point values |
| `starter_template` | object | Yes | Link to template (notebook, repo, or README) |
| `dataset` | object | No | Dataset information if applicable |
| `compute_guidance` | string | No | Compute requirements and cost estimates |

---

## Category Descriptions

### Core
Foundational skills every AI engineer needs before tackling advanced systems.

### High ROI
High-impact topics that provide the best learning-to-career-value ratio.

### Optional
Useful but not critical skills that depend on specialization.

### Advanced
Cutting-edge or specialized topics for experienced practitioners.

### LLM
Large Language Model engineering, including prompt engineering, fine-tuning, RAG, and agents.

### MLOps
Production ML systems: deployment, monitoring, CI/CD, infrastructure.

---

## Example Topic (Minimal)

```json
{
  "id": "python-fundamentals",
  "title": "Python Programming for AI",
  "category": "Core",
  "level": "Beginner",
  "estimated_hours": 40,
  "prerequisites": [],
  "learning_objectives": [
    "Write clean, efficient Python code following PEP 8 standards",
    "Manipulate data structures (lists, dicts, sets) for ML preprocessing",
    "Use NumPy and pandas for data analysis tasks"
  ],
  "resources": [
    {
      "type": "course",
      "title": "Python for Everybody",
      "url": "https://www.py4e.com/",
      "why": "Comprehensive intro with free video lectures"
    },
    {
      "type": "doc",
      "title": "Official Python Tutorial",
      "url": "https://docs.python.org/3/tutorial/",
      "why": "Authoritative reference for language features"
    }
  ],
  "project": {
    "title": "Data Analysis CLI Tool",
    "deliverables": [
      "GitHub repo with source code",
      "README with usage examples",
      "Unit tests with >80% coverage"
    ],
    "rubric": {
      "functionality": 10,
      "reproducibility": 10,
      "tests": 5,
      "writeup": 5
    }
  },
  "tags": ["python", "programming", "basics"],
  "role_mapping": {
    "NLP Engineer": ["Foundation for all Python-based NLP work"],
    "MLOps Engineer": ["Required for scripting and automation"],
    "ML Engineer": ["Core programming skill"]
  },
  "notes": "No special compute requirements. Works on any laptop."
}
```

---

## Example Capstone (Minimal)

```json
{
  "id": "rag-qa-system",
  "title": "Production RAG Q&A System",
  "role": "NLP Engineer",
  "description": "Build a Retrieval-Augmented Generation system that answers questions using a custom knowledge base. Includes vector database, embeddings, and LLM integration.",
  "estimated_hours": 80,
  "prerequisites": ["llm-fundamentals", "vector-databases", "prompt-engineering"],
  "deliverables": [
    "GitHub repo with complete source code",
    "Deployed API endpoint (e.g., on Hugging Face Spaces)",
    "Technical writeup explaining architecture and design decisions",
    "Demo video showing query examples"
  ],
  "rubric": {
    "functionality": 30,
    "reproducibility": 15,
    "tests": 10,
    "writeup": 10,
    "deployment": 10
  },
  "starter_template": {
    "type": "notebook",
    "url": "https://github.com/example/rag-starter"
  },
  "dataset": {
    "name": "Wikipedia subset",
    "url": "https://huggingface.co/datasets/wikipedia",
    "size": "500MB subset recommended"
  },
  "compute_guidance": "Can run on free tier (Colab/HF Spaces). Embedding generation may take 1-2 hours on CPU. Optional: Use A100 for faster processing (~$1-2 on cloud)."
}
```

---

## Validation Rules Summary

✅ **Must have:**
- At least 30 topics
- At least 9 capstones (3 per role)
- Each topic has exactly 3 learning objectives
- Each topic has 2-4 resources
- Each topic has a project with rubric
- All IDs are lowercase-hyphenated strings
- All URLs are valid URIs

❌ **Must avoid:**
- Duplicate topic or capstone IDs
- Invalid category or level values
- Empty required fields
- Prerequisites referencing non-existent topic IDs

---

## How to Validate

Use the included `validator.js` to validate your `roadmap.json`:

```javascript
// In browser console or Node.js
const isValid = validateRoadmap(roadmapData);
if (!isValid) {
  console.error("Validation errors:", validator.errors);
}
```

Validation runs automatically when importing JSON in the UI.

---

## Schema Changelog

### Version 2.0.0 (2025-11-10)
- Initial schema definition for modular roadmap
- Defined topic, resource, project, assessment, and capstone objects
- Set minimum requirements (30 topics, 9 capstones)
- Added role mapping and compute guidance fields

---

## Questions or Feedback?

If you have questions about the schema or suggestions for improvements, please open an issue in the repository.
