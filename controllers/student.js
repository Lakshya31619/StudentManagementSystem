const studentSchema = require("../models/student.js");

async function createStudent(req, res) {
    const { name, age, email } = req.body;

    if (!name || !age || !email) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const lastStudent = await studentSchema.findOne().sort({ id: -1 });
        const newId = lastStudent && !isNaN(lastStudent.id) ? lastStudent.id + 1 : 1;

        const student = await studentSchema.create({ id: newId, name, age, email });

        return res.status(201).json(student);
    } catch (error) {
        console.error("Error creating student:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
}

async function getAllStudents(req, res) {
    try {
        const students = await studentSchema.find();
        return res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        return res.status(500).json({ error: "Failed to fetch students" });
    }
}

async function updateStudent(req, res) {
    const id = parseInt(req.params.id); // Convert ID to a number
    const updates = req.body;

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const student = await studentSchema.findOneAndUpdate({ id: id }, updates, { new: true });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        return res.status(200).json(student);
    } catch (error) {
        console.error("Error updating student:", error);
        return res.status(500).json({ error: "Failed to update student" });
    }
}

async function deleteStudent(req, res) {
    const id = parseInt(req.params.id); // Convert ID to a number

    if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid ID format" });
    }

    try {
        const student = await studentSchema.findOneAndDelete({ id: id });

        if (!student) {
            return res.status(404).json({ error: "Student not found" });
        }

        return res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error("Error deleting student:", error);
        return res.status(500).json({ error: "Failed to delete student" });
    }
}

module.exports = {
    createStudent,
    getAllStudents,
    updateStudent,
    deleteStudent
};
