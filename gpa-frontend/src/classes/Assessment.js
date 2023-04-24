/**
 * Class representing an assessment
 * Attributes
 *  - name: the name of the assignment like 'Midterm 1' or 'Oral Report'
 *  - weight: the weight as a percange such as 0.25 or 0.10
 */
class Assessment {
    constructor(name, weight) {
        this.name = name;
        this.weight = parseFloat(weight);
    }
}

export default Assessment;