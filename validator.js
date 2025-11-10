/**
 * AI Engineering Roadmap - Schema Validator
 * 
 * Validates roadmap.json against the canonical schema defined in ROADMAP_SCHEMA.md
 * This validator runs in-browser and provides human-readable error messages.
 * 
 * Usage:
 *   const result = validateRoadmap(roadmapData);
 *   if (!result.valid) {
 *     console.error('Validation errors:', result.errors);
 *   }
 */

/**
 * JSON Schema for AI Engineering Roadmap
 * This is the canonical schema - must match ROADMAP_SCHEMA.md
 */
const ROADMAP_SCHEMA = {
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
          }
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
          }
        },
        "tags": {
          "type": "array",
          "description": "Searchable tags (technologies, concepts)",
          "items": {
            "type": "string"
          }
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
          }
        },
        "notes": {
          "type": "string",
          "description": "Optional notes on compute requirements, cost, common pitfalls"
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
          "description": "Why this resource is recommended"
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
};

/**
 * Simple JSON Schema validator (subset implementation)
 * This is a lightweight validator that handles the most common schema features.
 * For production, consider using ajv or similar library.
 */
class SchemaValidator {
  constructor(schema) {
    this.schema = schema;
    this.errors = [];
  }

  validate(data, schema = this.schema, path = 'root') {
    this.errors = [];
    this._validate(data, schema, path);
    return {
      valid: this.errors.length === 0,
      errors: this.errors
    };
  }

  _validate(data, schema, path) {
    // Type validation
    if (schema.type) {
      if (!this._checkType(data, schema.type)) {
        this._addError(path, `Expected type ${schema.type}, got ${typeof data}`);
        return;
      }
    }

    // Required properties
    if (schema.required && schema.type === 'object') {
      for (const prop of schema.required) {
        if (!(prop in data)) {
          this._addError(`${path}.${prop}`, `Required property missing`);
        }
      }
    }

    // Properties validation
    if (schema.properties && schema.type === 'object') {
      for (const [prop, propSchema] of Object.entries(schema.properties)) {
        if (prop in data) {
          this._validate(data[prop], propSchema, `${path}.${prop}`);
        }
      }
    }

    // Array validation
    if (schema.type === 'array') {
      if (schema.minItems !== undefined && data.length < schema.minItems) {
        this._addError(path, `Array must have at least ${schema.minItems} items, got ${data.length}`);
      }
      if (schema.maxItems !== undefined && data.length > schema.maxItems) {
        this._addError(path, `Array must have at most ${schema.maxItems} items, got ${data.length}`);
      }
      if (schema.items) {
        data.forEach((item, index) => {
          this._validate(item, schema.items, `${path}[${index}]`);
        });
      }
    }

    // String validation
    if (schema.type === 'string') {
      if (schema.minLength !== undefined && data.length < schema.minLength) {
        this._addError(path, `String must be at least ${schema.minLength} characters, got ${data.length}`);
      }
      if (schema.maxLength !== undefined && data.length > schema.maxLength) {
        this._addError(path, `String must be at most ${schema.maxLength} characters, got ${data.length}`);
      }
      if (schema.pattern) {
        const regex = new RegExp(schema.pattern);
        if (!regex.test(data)) {
          this._addError(path, `String does not match pattern ${schema.pattern}`);
        }
      }
      if (schema.enum && !schema.enum.includes(data)) {
        this._addError(path, `Value must be one of: ${schema.enum.join(', ')}. Got: ${data}`);
      }
    }

    // Number validation
    if (schema.type === 'number') {
      if (schema.minimum !== undefined && data < schema.minimum) {
        this._addError(path, `Number must be at least ${schema.minimum}, got ${data}`);
      }
      if (schema.maximum !== undefined && data > schema.maximum) {
        this._addError(path, `Number must be at most ${schema.maximum}, got ${data}`);
      }
    }

    // $ref resolution
    if (schema.$ref) {
      const refPath = schema.$ref.split('/');
      let refSchema = this.schema;
      for (const part of refPath.slice(1)) {
        refSchema = refSchema[part];
      }
      this._validate(data, refSchema, path);
    }
  }

  _checkType(data, type) {
    if (type === 'array') {
      return Array.isArray(data);
    }
    if (type === 'object') {
      return typeof data === 'object' && data !== null && !Array.isArray(data);
    }
    if (type === 'number') {
      return typeof data === 'number' && !isNaN(data);
    }
    return typeof data === type;
  }

  _addError(path, message) {
    this.errors.push({ path, message });
  }
}

/**
 * Validates roadmap data against the schema
 * @param {Object} roadmapData - The roadmap data to validate
 * @returns {Object} - { valid: boolean, errors: Array, warnings: Array }
 */
function validateRoadmap(roadmapData) {
  const validator = new SchemaValidator(ROADMAP_SCHEMA);
  const result = validator.validate(roadmapData);

  // Additional custom validations
  const warnings = [];

  if (result.valid && roadmapData.topics) {
    // Check for duplicate topic IDs
    const topicIds = new Set();
    roadmapData.topics.forEach((topic, index) => {
      if (topicIds.has(topic.id)) {
        result.errors.push({
          path: `root.topics[${index}].id`,
          message: `Duplicate topic ID: ${topic.id}`
        });
        result.valid = false;
      }
      topicIds.add(topic.id);
    });

    // Check for invalid prerequisite references
    roadmapData.topics.forEach((topic, index) => {
      if (topic.prerequisites) {
        topic.prerequisites.forEach(prereqId => {
          if (!topicIds.has(prereqId)) {
            warnings.push({
              path: `root.topics[${index}].prerequisites`,
              message: `Prerequisite ID "${prereqId}" not found in topics`
            });
          }
        });
      }
    });

    // Check capstone prerequisites
    if (roadmapData.capstones) {
      roadmapData.capstones.forEach((capstone, index) => {
        if (capstone.prerequisites) {
          capstone.prerequisites.forEach(prereqId => {
            if (!topicIds.has(prereqId)) {
              warnings.push({
                path: `root.capstones[${index}].prerequisites`,
                message: `Prerequisite ID "${prereqId}" not found in topics`
              });
            }
          });
        }
      });

      // Check for duplicate capstone IDs
      const capstoneIds = new Set();
      roadmapData.capstones.forEach((capstone, index) => {
        if (capstoneIds.has(capstone.id)) {
          result.errors.push({
            path: `root.capstones[${index}].id`,
            message: `Duplicate capstone ID: ${capstone.id}`
          });
          result.valid = false;
        }
        capstoneIds.add(capstone.id);
      });

      // Check role distribution for capstones
      const roleCount = {};
      roadmapData.capstones.forEach(capstone => {
        roleCount[capstone.role] = (roleCount[capstone.role] || 0) + 1;
      });

      const expectedRoles = ['NLP Engineer', 'MLOps Engineer', 'ML Engineer'];
      expectedRoles.forEach(role => {
        if (!roleCount[role] || roleCount[role] < 3) {
          warnings.push({
            path: 'root.capstones',
            message: `Expected at least 3 capstones for role "${role}", found ${roleCount[role] || 0}`
          });
        }
      });
    }
  }

  return {
    valid: result.valid,
    errors: result.errors,
    warnings: warnings
  };
}

/**
 * Format validation results as human-readable text
 * @param {Object} result - Validation result from validateRoadmap
 * @returns {string} - Formatted message
 */
function formatValidationResult(result) {
  if (result.valid && result.warnings.length === 0) {
    return '✅ Validation passed! No errors or warnings.';
  }

  let output = [];

  if (!result.valid) {
    output.push('❌ VALIDATION FAILED\n');
    output.push('Errors:');
    result.errors.forEach(err => {
      output.push(`  • ${err.path}: ${err.message}`);
    });
  } else {
    output.push('✅ Validation passed with warnings\n');
  }

  if (result.warnings.length > 0) {
    output.push('\nWarnings:');
    result.warnings.forEach(warn => {
      output.push(`  ⚠ ${warn.path}: ${warn.message}`);
    });
  }

  return output.join('\n');
}

// Export for use in Node.js or browser
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ROADMAP_SCHEMA,
    validateRoadmap,
    formatValidationResult,
    SchemaValidator
  };
}
