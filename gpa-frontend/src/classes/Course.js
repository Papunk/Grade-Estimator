import { v4 as uuid } from 'uuid';

/**
 * Class representing a course
 * Attributes
 *  - name: a name such as 'Italian' or 'Computer Architecture'
 *  - code: an alphanumeric code such as 'INSO4010-040'
 *  - assessments: the list of assessments for the semester
 */
class Course {
    constructor(name, code, id) {
        this.id = id ? id : uuid();
        this.name = name;
        this.code = code;
        this.assessments = [];
        this.totalWeight = 0;
    }

    addAssessment(newAssessment) {
        if (newAssessment.name && newAssessment.weight) {
            const sum = this.totalWeight + newAssessment.weight;
            if (sum <= 100) {
                this.assessments.push(newAssessment);
                this.totalWeight += newAssessment.weight;
            }
        }
    }
}

export default Course;