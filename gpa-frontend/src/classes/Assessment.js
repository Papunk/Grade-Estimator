/**
 * Class representing an assessment
 * Attributes
 *  - name: the name of the assignment like 'Midterm 1' or 'Oral Report'
 *  - weight: the weight as a percentage such as 25 or 50
 */
class Assessment {
    constructor(name, grade, weight) {
        this.name = name;
        this.grade = parseFloat(grade);
        this.weight = parseFloat(weight);
    }
}

export default Assessment;