const courses = [
  { code: 'WDD 130', title: 'Web Fundamentals', credits: 3, completed: true, category: 'wdd' },
  { code: 'CSE 121', title: 'Programming with Functions', credits: 3, completed: true, category: 'cse' },
  { code: 'WDD 131', title: 'Dynamic Web Fundamentals', credits: 3, completed: false, category: 'wdd' },
  { code: 'CSE 122', title: 'Programming with Objects', credits: 3, completed: false, category: 'cse' },
  { code: 'WDD 230', title: 'Web Frontend Development I', credits: 3, completed: false, category: 'wdd' },
  { code: 'CSE 213', title: 'Data Structures', credits: 3, completed: false, category: 'cse' },
  { code: 'WDD 231', title: 'Web Frontend Development II', credits: 3, completed: false, category: 'wdd' },
  { code: 'CSE 220', title: 'Programming Languages', credits: 3, completed: false, category: 'cse' }
];

const courseList = document.getElementById('course-list');
const creditSummary = document.getElementById('credit-summary');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(filter = 'all') {
  const filteredCourses = courses.filter((course) => {
    if (filter === 'all') return true;
    return course.category === filter;
  });

  if (courseList) {
    courseList.innerHTML = '';
    filteredCourses.forEach((course) => {
      const card = document.createElement('article');
      card.className = `course-card${course.completed ? ' completed' : ''}`;
      card.innerHTML = `
        <div class="course-meta">
          <strong>${course.code}</strong>
          <span class="status-pill">${course.completed ? 'Completed' : 'In Progress'}</span>
        </div>
        <h3>${course.title}</h3>
        <p>${course.credits} credits</p>
      `;
      courseList.appendChild(card);
    });
  }

  if (creditSummary) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    creditSummary.textContent = `Showing ${filteredCourses.length} courses • ${totalCredits} total credits`;
  }
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    filterButtons.forEach((btn) => btn.classList.remove('active'));
    button.classList.add('active');
    renderCourses(button.dataset.filter);
  });
});

renderCourses();
