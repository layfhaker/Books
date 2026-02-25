// State Management
const state = {
    books: {},
    currentBook: null,
    currentChapter: null,
    currentData: null
};

// DOM Elements
const bookSelect = document.getElementById('bookSelect');
const chapterSelect = document.getElementById('chapterSelect');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const contentArea = document.getElementById('content');
const metadata = document.getElementById('metadata');
const modal = document.getElementById('modal');
const modalOverlay = document.getElementById('modalOverlay');
const modalTranslation = document.getElementById('modalTranslation');
const modalNotes = document.getElementById('modalNotes');
const modalTags = document.getElementById('modalTags');
const closeModalBtn = document.getElementById('closeModal');
const chapterTitle = document.getElementById('chapterTitle');
const levelBadge = document.getElementById('levelBadge');
const wordCountBadge = document.getElementById('wordCountBadge');
const description = document.getElementById('description');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadBookList();
    setupEventListeners();
});

// Event Listeners
function setupEventListeners() {
    bookSelect.addEventListener('change', handleBookSelect);
    chapterSelect.addEventListener('change', handleChapterSelect);
    prevBtn.addEventListener('click', goToPreviousChapter);
    nextBtn.addEventListener('click', goToNextChapter);
    closeModalBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', closeModal);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

// Load list of available books
async function loadBookList() {
    try {
        const response = await fetch('texts/books.json');
        if (!response.ok) throw new Error('books.json not found');
        
        const booksList = await response.json();
        state.books = booksList;
        
        populateBookSelect(booksList);
    } catch (error) {
        console.error('Error loading books list:', error);
        showError('Ошибка при загрузке списка книг');
    }
}

// Populate book select dropdown
function populateBookSelect(books) {
    bookSelect.innerHTML = '<option value="">Выберите книгу...</option>';
    
    books.forEach(book => {
        const option = document.createElement('option');
        option.value = book.bookId;
        option.textContent = `${book.bookTitle} - ${book.bookAuthor}`;
        bookSelect.appendChild(option);
    });
}

// Handle book selection
function handleBookSelect(e) {
    const bookId = e.target.value;
    
    if (!bookId) {
        chapterSelect.innerHTML = '<option value="">Выберите главу...</option>';
        chapterSelect.disabled = true;
        contentArea.innerHTML = '';
        metadata.classList.add('hidden');
        return;
    }
    
    state.currentBook = bookId;
    state.currentChapter = null;
    
    const book = state.books.find(b => b.bookId === bookId);
    populateChapterSelect(book);
}

// Populate chapter select dropdown
function populateChapterSelect(book) {
    chapterSelect.innerHTML = '<option value="">Выберите главу...</option>';
    chapterSelect.disabled = false;
    
    book.chapters.forEach(chapter => {
        const option = document.createElement('option');
        option.value = chapter.chapterId;
        const num = chapter.chapterNumber;
        const title = chapter.chapterTitle ? ` - ${chapter.chapterTitle}` : '';
        option.textContent = `Глава ${num}${title}`;
        chapterSelect.appendChild(option);
    });
}

// Handle chapter selection
async function handleChapterSelect(e) {
    const chapterId = e.target.value;
    
    if (!chapterId) {
        contentArea.innerHTML = '';
        metadata.classList.add('hidden');
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }
    
    await loadChapter(state.currentBook, chapterId);
    updateNavigationButtons();
}

// Load chapter content
async function loadChapter(bookId, chapterId) {
    try {
        contentArea.innerHTML = '<div class="loading">Загрузка...</div>';
        
        const filePath = `texts/${bookId}/${chapterId}.json`;
        const response = await fetch(filePath);
        
        if (!response.ok) throw new Error(`Chapter not found: ${filePath}`);
        
        const data = await response.json();
        validateChapterData(data);
        
        state.currentChapter = chapterId;
        state.currentData = data;
        
        renderChapter(data);
        updateMetadata(data);
    } catch (error) {
        console.error('Error loading chapter:', error);
        contentArea.innerHTML = '';
        showError(`Ошибка при загрузке главы: ${error.message}`);
    }
}

// Validate chapter data structure
function validateChapterData(data) {
    if (!data.metadata) throw new Error('Missing metadata');
    if (!data.content || !Array.isArray(data.content)) throw new Error('Missing content');
    
    const required = ['level', 'language', 'createdDate'];
    required.forEach(field => {
        if (!data.metadata[field]) throw new Error(`Missing metadata.${field}`);
    });
}

// Render chapter content
function renderChapter(data) {
    const settings = data.settings || {};
    contentArea.innerHTML = '';
    
    data.content.forEach(item => {
        const sentenceDiv = document.createElement('div');
        sentenceDiv.className = 'sentence';
        
        let html = `<span class="text-id">[${item.id}]</span>`;
        html += `<span class="german-text" data-id="${item.id}">${escapeHtml(item.de)}</span>`;
        
        if (item.difficulty && settings.showDifficulty !== false) {
            html += `<span class="difficulty-indicator">${item.difficulty}</span>`;
        }
        
        sentenceDiv.innerHTML = html;
        sentenceDiv.addEventListener('click', (e) => {
            if (e.target.classList.contains('german-text')) {
                openModal(item);
            }
        });
        
        contentArea.appendChild(sentenceDiv);
    });
}

// Update metadata display
function updateMetadata(data) {
    const meta = data.metadata;
    const settings = data.settings || {};
    
    chapterTitle.textContent = `${meta.chapterNumber}. ${meta.chapterTitle || 'Глава'}`;
    
    levelBadge.className = `badge level-${meta.level.toLowerCase()}`;
    levelBadge.textContent = `Уровень: ${meta.level}`;
    
    if (settings.showWordCount) {
        const wordCount = data.content.reduce((sum, item) => {
            return sum + item.de.split(/\s+/).length;
        }, 0);
        wordCountBadge.textContent = `Слов: ${wordCount}`;
        wordCountBadge.style.display = 'inline-block';
    } else {
        wordCountBadge.style.display = 'none';
    }
    
    description.textContent = meta.description || `${meta.bookTitle} - Глава ${meta.chapterNumber}`;
    metadata.classList.remove('hidden');
}

// Open modal with translation
function openModal(item) {
    modalTranslation.textContent = item.ru;
    
    if (item.notes) {
        modalNotes.innerHTML = `<strong>Примечание:</strong> ${escapeHtml(item.notes)}`;
        modalNotes.classList.remove('hidden');
    } else {
        modalNotes.classList.add('hidden');
    }
    
    if (item.tags && item.tags.length > 0) {
        modalTags.innerHTML = item.tags
            .map(tag => `<span class="tag">${escapeHtml(tag)}</span>`)
            .join('');
        modalTags.classList.remove('hidden');
    } else {
        modalTags.classList.add('hidden');
    }
    
    modal.classList.remove('hidden');
    modalOverlay.classList.remove('hidden');
}

// Close modal
function closeModal() {
    modal.classList.add('hidden');
    modalOverlay.classList.add('hidden');
}

// Update navigation buttons
function updateNavigationButtons() {
    const book = state.books.find(b => b.bookId === state.currentBook);
    const chapters = book.chapters;
    const currentIndex = chapters.findIndex(ch => ch.chapterId === state.currentChapter);
    
    prevBtn.disabled = currentIndex <= 0;
    nextBtn.disabled = currentIndex >= chapters.length - 1;
}

// Navigation
function goToPreviousChapter() {
    const book = state.books.find(b => b.bookId === state.currentBook);
    const chapters = book.chapters;
    const currentIndex = chapters.findIndex(ch => ch.chapterId === state.currentChapter);
    
    if (currentIndex > 0) {
        const prevChapter = chapters[currentIndex - 1];
        chapterSelect.value = prevChapter.chapterId;
        loadChapter(state.currentBook, prevChapter.chapterId);
        updateNavigationButtons();
    }
}

function goToNextChapter() {
    const book = state.books.find(b => b.bookId === state.currentBook);
    const chapters = book.chapters;
    const currentIndex = chapters.findIndex(ch => ch.chapterId === state.currentChapter);
    
    if (currentIndex < chapters.length - 1) {
        const nextChapter = chapters[currentIndex + 1];
        chapterSelect.value = nextChapter.chapterId;
        loadChapter(state.currentBook, nextChapter.chapterId);
        updateNavigationButtons();
    }
}

// Utilities
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function showError(message) {
    contentArea.innerHTML = `<div class="error">${escapeHtml(message)}</div>`;
}
