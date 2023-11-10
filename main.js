const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());

// En array för att lagra kurser
let courses = [
    { "_id": 1, "courseId": "DT162G", "courseName": "Javascript-baserad webbutveckling", "coursePeriod": 1 },
    { "_id": 2, "courseId": "IK060G", "courseName": "Projektledning", "coursePeriod": 1 },
    { "_id": 3, "courseId": "DT071G", "courseName": "Programmering i C#.NET", "coursePeriod": 2 },
    { "_id": 4, "courseId": "DT148G", "courseName": "Webbutveckling för mobila enheter", "coursePeriod": 2 },
    { "_id": 5, "courseId": "DT102G", "courseName": "ASP.NET med C#", "coursePeriod": 3 },
    { "_id": 6, "courseId": "IG021G", "courseName": "Affärsplaner och kommersialisering", "coursePeriod": 3 },
    { "_id": 7, "courseId": "DT069G", "courseName": "Multimedia för webben", "coursePeriod": 4 },
    { "_id": 8, "courseId": "DT080G", "courseName": "Självständigt arbete", "coursePeriod": 4 }
];

// GET, hämta alla kurser
app.get('/api/courses', (req, res) => {
    res.json(courses);
});

// GET, hämta enskilt ID
app.get('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const course = courses.find(course => course._id === id);

    if (course) {
        res.json(course);
    } else {
        res.status(404).send('Kan inte hitta kurs');
    }
});

// DELETE, för att radera enskild ID
app.delete('/api/courses/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const courseIndex = courses.findIndex(course => course._id === id);

    if (courseIndex !== -1) {
        courses.splice(courseIndex, 1);
        res.json({ message: 'Kurs raderad' });
    } else {
        res.status(404).json({ error: 'Kan ej hitta kurs' });
    }
});

app.listen(port, () => {
    console.log(`Server körs med port ${port}`);
});
