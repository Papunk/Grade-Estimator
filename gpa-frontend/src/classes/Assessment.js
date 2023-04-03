/**
 * Class representing an assessment
 * Attributes
 *  - name: the name of the assignment like 'Midterm 1' or 'Oral Report'
 *  - weight: the weight as a percange such as 0.25 or 0.10
 */
class Assessment {
    constructor(name, weight) {
        this.name = name;
        if (weight < 0 || weight > 1) {
            throw new Error('weight must be in the range (0, 1]');
        }
        this.weight = weight;
    }
}

export default Assessment;