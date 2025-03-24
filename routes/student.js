const express = require("express");
const router = express.Router();
const { createStudent, getAllStudents, updateStudent, deleteStudent } = require("../controllers/student");

router.post("/", createStudent);
router.get("/", getAllStudents);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
