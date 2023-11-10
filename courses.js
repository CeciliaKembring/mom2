document.addEventListener('DOMContentLoaded', () => {
    const courseTableBody = document.getElementById('courses-table');

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
                    <td><input type="checkbox" id="checkbox" data-course-id="${course._id}"></td>
                `;
                courseTableBody.appendChild(tableRow);
            });

            // Lyssna på ändringar i checkboxar och anropa deleteCourse vid behov
            const checkboxes = document.querySelectorAll('#courses-table input[type="checkbox"]');
            checkboxes.forEach(checkbox => {
                checkbox.addEventListener('change', () => {
                    if (checkbox.checked) {
                        const courseId = checkbox.getAttribute('data-course-id');
                        deleteCourse(courseId);
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching courses:', error));

    // Funktion för att ta bort kurs
    function deleteCourse(courseId) {
        // Anropa servern för att radera kursen med det angivna courseId
        fetch(`http://localhost:3000/api/courses/${courseId}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error deleting course');
            }
            return response.json();
        })
        .then(data => {
        //    Ladda om sidan
            location.reload();
        })
        .catch(error => console.error('Error deleting course:', error));
    }
});

