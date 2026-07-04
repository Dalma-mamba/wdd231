const courses = [
  { code: 'CSE 121B', title: 'JavaScript Language', credits: 1, category: 'CSE', completed: true },
  { code: 'WDD 130', title: 'Web Fundamentals', credits: 3, category: 'WDD', completed: true },
  { code: 'WDD 131', title: 'Dynamic Web Pages', credits: 3, category: 'WDD', completed: true },
  { code: 'WDD 230', title: 'Web Frontend Development I', credits: 3, category: 'WDD', completed: false },
  { code: 'WDD 231', title: 'Web Frontend Development II', credits: 3, category: 'WDD', completed: false },
  { code: 'CSE 210', title: 'Programming with Classes', credits: 3, category: 'CSE', completed: false },
  { code: 'CSE 213', title: 'Data Structures', credits: 3, category: 'CSE', completed: false },
  { code: 'CSE 214', title: 'Programming Languages and Paradigms', credits: 3, category: 'CSE', completed: false }
];

const coursesGrid = document.querySelector('#courses-grid');
const creditsTotal = document.querySelector('#credits-total');
const filterButtons = document.querySelectorAll('.filter-btn');

function renderCourses(filter = 'all') {
  let visibleCourses = courses;

  if (filter === 'WDD') {
    visibleCourses = courses.filter((course) => course.category === 'WDD');
  } else if (filter === 'CSE') {
    visibleCourses = courses.filter((course) => course.category === 'CSE');
  }

  if (coursesGrid) {
    coursesGrid.innerHTML = '';

    visibleCourses.forEach((course) => {
      const card = document.createElement('article');
      card.className = `course-card${course.completed ? ' completed' : ''}`;
      card.innerHTML = `
        <h3>${course.code}</h3>
        <p>${course.title}</p>
        <p><strong>Credits:</strong> ${course.credits}</p>
        <p>${course.completed ? 'Completed' : 'In progress'}</p>
      `;
      coursesGrid.appendChild(card);
    });
  }

  if (creditsTotal) {
    const totalCredits = visibleCourses.reduce((sum, course) => sum + course.credits, 0);
    creditsTotal.textContent = totalCredits;
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
