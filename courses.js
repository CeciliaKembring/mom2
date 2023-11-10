
document.addEventListener('DOMContentLoaded', () => {
    const courseTable = document.getElementById('courses-table');


    // Hämta kurser från servern
    fetch('http://localhost:3000/api/courses')
        .then(response => response.json())
        .then(courses => {
            // Lägg till kurser i tabellen
            courses.forEach(course => {
                const tableRow = document.createElement('tr');
                tableRow.innerHTML = `
                    <td>${course._id}</td>
                    <td>${course.courseId}</td>
                    <td>${course.courseName}</td>
                    <td>${course.coursePeriod}</td>
                    <td><input type="checkbox" id="checkbox"></td>
                `;
                courseTable.appendChild(tableRow);
            });
        })
        .catch(error => console.error('Error fetching courses:', error));
});
