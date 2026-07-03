const courses = [
  { code: 'CIT 160', title: 'Introduction to Programming', credits: 3, completed: true, category: 'cse' },
  { code: 'CIT 230', title: 'Web Frontend Development', credits: 3, completed: false, category: 'wdd' },
  { code: 'CSE 121', title: 'Introduction to Programming', credits: 3, completed: true, category: 'cse' },
  { code: 'WDD 130', title: 'Web Fundamentals', credits: 3, completed: true, category: 'wdd' },
  { code: 'WDD 131', title: 'Dynamic Web Pages', credits: 3, completed: false, category: 'wdd' },
  { code: 'WDD 230', title: 'Web Frontend Development II', credits: 3, completed: false, category: 'wdd' },
  { code: 'WDD 231', title: 'Advanced Frontend Development', credits: 3, completed: false, category: 'wdd' },
  { code: 'CSE 210', title: 'Programming with Classes', credits: 3, completed: false, category: 'cse' }
];

const courseGrid = document.getElementById('course-grid');
const summary = document.getElementById('course-summary');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(filter = 'all') {
  const visibleCourses = courses.filter((course) => filter === 'all' || course.category === filter);
  const totalCredits = visibleCourses.reduce((sum, course) => sum + course.credits, 0);

  if (courseGrid) {
    courseGrid.innerHTML = '';
    visibleCourses.forEach((course) => {
      const card = document.createElement('article');
      card.className = `course-card-item${course.completed ? ' completed' : ''}`;
      card.innerHTML = `
        <h3>${course.code}</h3>
        <p>${course.title}</p>
        <p><strong>${course.credits} credits</strong></p>
        ${course.completed ? '<span class="badge">Completed</span>' : ''}
      `;
      courseGrid.appendChild(card);
    });
  }

  if (summary) {
    summary.textContent = `Showing ${visibleCourses.length} courses • ${totalCredits} credits`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderCourses(button.dataset.filter);
  });
});

if (courseGrid) {
  renderCourses();
}
