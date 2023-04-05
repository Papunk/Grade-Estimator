/**
 * Class representing a course
 * Attributes
 *  - name: a name such as 'Italian' or 'Computer Architecture'
 *  - code: an alphanumeric code such as 'INSO4010-040'
 *  - assessments: the list of assessments for the semester
 */
class Course {
    constructor(name, code) {
        this.name = name;
        this.code = code;
        this.assessments = [];
        this.totalWeight = 0;
    }

    addAssessment(newAssessment) {
        if (this.totalWeight + newAssessment.weight <= 1) {
            this.assessments.push(newAssessment)
            this.totalWeight += newAssessment.weight
            console.log(this.assessments)
        }
        else {
            throw new Error('');
        }
    }
}

export default Course;