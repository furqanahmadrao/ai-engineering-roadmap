/**
 * AI Engineering Roadmap - Main Application
 * Phase 1: Core functionality with localStorage progress tracking
 */

// Global state
let roadmapData = null;
let progress = {
  completedTopics: new Set(),
  timestamps: {}
};

// Constants
const STORAGE_KEY = 'ai-roadmap-progress';

/**
 * Initialize the application
 */
async function init() {
  console.log('Initializing AI Engineering Roadmap...');
  
  // Load progress from localStorage
  loadProgress();
  
  // Load roadmap data
  try {
    const response = await fetch('roadmap.json');
    roadmapData = await response.json();
    
    // Validate the data
    const validationResult = validateRoadmap(roadmapData);
    if (!validationResult.valid) {
      console.error('Roadmap validation failed:', validationResult.errors);
      showError('Invalid roadmap data. Please check the console for details.');
      return;
    }
    
    console.log(`✅ Loaded ${roadmapData.topics.length} topics and ${roadmapData.capstones.length} capstones`);
    
    // Render the roadmap
    renderRoadmap();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update progress display
    updateProgressDisplay();
    
  } catch (error) {
    console.error('Failed to load roadmap:', error);
    showError('Failed to load roadmap data. Please refresh the page.');
  }
}

/**
 * Load progress from localStorage
 */
function loadProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const data = JSON.parse(stored);
      progress.completedTopics = new Set(data.completedTopics || []);
      progress.timestamps = data.timestamps || {};
      console.log(`✅ Loaded progress: ${progress.completedTopics.size} topics completed`);
    }
  } catch (error) {
    console.error('Failed to load progress:', error);
  }
}

/**
 * Save progress to localStorage
 */
function saveProgress() {
  try {
    const data = {
      completedTopics: Array.from(progress.completedTopics),
      timestamps: progress.timestamps,
      lastUpdated: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('✅ Progress saved');
  } catch (error) {
    console.error('Failed to save progress:', error);
  }
}

/**
 * Render the roadmap
 */
function renderRoadmap() {
  const container = document.getElementById('roadmap-container');
  if (!container || !roadmapData) return;
  
  // Group topics by category
  const categories = groupByCategory(roadmapData.topics);
  
  // Clear loading message
  container.innerHTML = '';
  
  // Render each category
  Object.keys(categories).sort().forEach(categoryName => {
    const categorySection = createCategorySection(categoryName, categories[categoryName]);
    container.appendChild(categorySection);
  });
}

/**
 * Group topics by category
 */
function groupByCategory(topics) {
  const groups = {};
  topics.forEach(topic => {
    if (!groups[topic.category]) {
      groups[topic.category] = [];
    }
    groups[topic.category].push(topic);
  });
  return groups;
}

/**
 * Create a category section
 */
function createCategorySection(categoryName, topics) {
  const section = document.createElement('section');
  section.className = 'category-section';
  section.setAttribute('data-category', categoryName);
  
  // Category header
  const header = document.createElement('h2');
  header.className = 'category-header';
  header.innerHTML = `
    <span class="category-badge">${categoryName}</span>
    <span class="category-count">${topics.length} topics</span>
  `;
  section.appendChild(header);
  
  // Topics grid
  const grid = document.createElement('div');
  grid.className = 'topics-grid';
  
  topics.forEach(topic => {
    const topicCard = createTopicCard(topic);
    grid.appendChild(topicCard);
  });
  
  section.appendChild(grid);
  return section;
}

/**
 * Create a topic card
 */
function createTopicCard(topic) {
  const isCompleted = progress.completedTopics.has(topic.id);
  
  const card = document.createElement('details');
  card.className = `topic-card ${isCompleted ? 'completed' : ''}`;
  card.setAttribute('data-topic-id', topic.id);
  card.setAttribute('data-level', topic.level);
  
  // Summary (card header)
  const summary = document.createElement('summary');
  summary.className = 'topic-summary';
  summary.innerHTML = `
    <div class="topic-header">
      <div class="topic-title-row">
        <h3 class="topic-title">${topic.title}</h3>
        <span class="topic-level level-${topic.level.toLowerCase()}">${topic.level}</span>
      </div>
      <div class="topic-meta">
        <span class="topic-hours">⏱️ ${topic.estimated_hours}h</span>
        <span class="topic-category">${topic.category}</span>
      </div>
    </div>
    <label class="checkbox-label" onclick="event.stopPropagation()">
      <input type="checkbox" class="topic-checkbox" data-topic-id="${topic.id}" ${isCompleted ? 'checked' : ''}>
      <span>${isCompleted ? 'Completed' : 'Mark Complete'}</span>
    </label>
  `;
  card.appendChild(summary);
  
  // Details (card content)
  const content = document.createElement('div');
  content.className = 'topic-content';
  
  // Learning objectives
  content.innerHTML += `
    <div class="topic-section">
      <h4>📋 Learning Objectives</h4>
      <ul>
        ${topic.learning_objectives.map(obj => `<li>${obj}</li>`).join('')}
      </ul>
    </div>
  `;
  
  // Resources
  content.innerHTML += `
    <div class="topic-section">
      <h4>📚 Resources</h4>
      <ul class="resources-list">
        ${topic.resources.map(res => `
          <li>
            <a href="${res.url}" target="_blank" rel="noopener noreferrer">
              <span class="resource-type">[${res.type}]</span> ${res.title}
            </a>
            ${res.why ? `<p class="resource-why">${res.why}</p>` : ''}
          </li>
        `).join('')}
      </ul>
    </div>
  `;
  
  // Project
  if (topic.project) {
    content.innerHTML += `
      <div class="topic-section">
        <h4>🚀 Project: ${topic.project.title}</h4>
        <p><strong>Deliverables:</strong></p>
        <ul>
          ${topic.project.deliverables.map(d => `<li>${d}</li>`).join('')}
        </ul>
        <p><strong>Grading Rubric:</strong></p>
        <ul class="rubric-list">
          ${Object.entries(topic.project.rubric).map(([criterion, points]) => 
            `<li>${criterion}: ${points} points</li>`
          ).join('')}
        </ul>
      </div>
    `;
  }
  
  // Prerequisites
  if (topic.prerequisites && topic.prerequisites.length > 0) {
    content.innerHTML += `
      <div class="topic-section">
        <p><strong>Prerequisites:</strong> ${topic.prerequisites.join(', ')}</p>
      </div>
    `;
  }
  
  // Tags
  if (topic.tags && topic.tags.length > 0) {
    content.innerHTML += `
      <div class="topic-section">
        <div class="tags">
          ${topic.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
  }
  
  // Notes
  if (topic.notes) {
    content.innerHTML += `
      <div class="topic-section topic-notes">
        <p>💡 <strong>Note:</strong> ${topic.notes}</p>
      </div>
    `;
  }
  
  card.appendChild(content);
  return card;
}

/**
 * Setup event listeners
 */
function setupEventListeners() {
  // Topic completion checkboxes
  document.addEventListener('change', (e) => {
    if (e.target.classList.contains('topic-checkbox')) {
      const topicId = e.target.dataset.topicId;
      toggleTopicCompletion(topicId, e.target.checked);
    }
  });
  
  // Category filter
  document.getElementById('category-filter')?.addEventListener('change', applyFilters);
  
  // Level filter
  document.getElementById('level-filter')?.addEventListener('change', applyFilters);
  
  // Export progress
  document.getElementById('export-progress')?.addEventListener('click', exportProgress);
  
  // Import progress
  document.getElementById('import-progress')?.addEventListener('click', () => {
    document.getElementById('import-file-input')?.click();
  });
  
  document.getElementById('import-file-input')?.addEventListener('change', importProgress);
  
  // Reset progress
  document.getElementById('reset-progress')?.addEventListener('click', resetProgress);
}

/**
 * Toggle topic completion
 */
function toggleTopicCompletion(topicId, completed) {
  if (completed) {
    progress.completedTopics.add(topicId);
    progress.timestamps[topicId] = new Date().toISOString();
  } else {
    progress.completedTopics.delete(topicId);
    delete progress.timestamps[topicId];
  }
  
  // Update UI
  const card = document.querySelector(`[data-topic-id="${topicId}"]`);
  if (card) {
    card.classList.toggle('completed', completed);
  }
  
  // Save and update display
  saveProgress();
  updateProgressDisplay();
}

/**
 * Update progress display
 */
function updateProgressDisplay() {
  if (!roadmapData) return;
  
  const total = roadmapData.topics.length;
  const completed = progress.completedTopics.size;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Update progress bar
  const progressFill = document.getElementById('progress-fill');
  if (progressFill) {
    progressFill.style.width = `${percentage}%`;
  }
  
  // Update progress text
  const progressText = document.getElementById('progress-text');
  if (progressText) {
    progressText.textContent = `${completed} of ${total} topics completed (${percentage}%)`;
  }
}

/**
 * Apply filters
 */
function applyFilters() {
  const categoryFilter = document.getElementById('category-filter')?.value || 'all';
  const levelFilter = document.getElementById('level-filter')?.value || 'all';
  
  document.querySelectorAll('.category-section').forEach(section => {
    const category = section.dataset.category;
    const shouldShowCategory = categoryFilter === 'all' || categoryFilter === category;
    section.style.display = shouldShowCategory ? 'block' : 'none';
  });
  
  document.querySelectorAll('.topic-card').forEach(card => {
    const level = card.dataset.level;
    const shouldShowLevel = levelFilter === 'all' || levelFilter === level;
    card.style.display = shouldShowLevel ? 'block' : 'none';
  });
}

/**
 * Export progress as JSON
 */
function exportProgress() {
  const data = {
    completedTopics: Array.from(progress.completedTopics),
    timestamps: progress.timestamps,
    exportedAt: new Date().toISOString()
  };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `ai-roadmap-progress-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
  
  console.log('✅ Progress exported');
}

/**
 * Import progress from JSON
 */
function importProgress(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const data = JSON.parse(e.target.result);
      
      // Validate imported data
      if (!data.completedTopics || !Array.isArray(data.completedTopics)) {
        throw new Error('Invalid progress data format');
      }
      
      // Load the data
      progress.completedTopics = new Set(data.completedTopics);
      progress.timestamps = data.timestamps || {};
      
      // Save and update UI
      saveProgress();
      renderRoadmap();
      updateProgressDisplay();
      
      alert(`✅ Successfully imported progress: ${progress.completedTopics.size} topics completed`);
      console.log('✅ Progress imported');
      
    } catch (error) {
      console.error('Failed to import progress:', error);
      alert('❌ Failed to import progress. Please check the file format.');
    }
  };
  reader.readAsText(file);
  
  // Reset file input
  event.target.value = '';
}

/**
 * Reset all progress
 */
function resetProgress() {
  if (!confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
    return;
  }
  
  progress.completedTopics.clear();
  progress.timestamps = {};
  
  saveProgress();
  renderRoadmap();
  updateProgressDisplay();
  
  console.log('✅ Progress reset');
}

/**
 * Show error message
 */
function showError(message) {
  const container = document.getElementById('roadmap-container');
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <h2>❌ Error</h2>
        <p>${message}</p>
      </div>
    `;
  }
}

// Initialize on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
