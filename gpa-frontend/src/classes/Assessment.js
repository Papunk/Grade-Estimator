/**
 * Class representing an assessment
 * Attributes
 *  - name: the name of the assignment like 'Midterm 1' or 'Oral Report'
 *  - weight: the weight as a percentage such as 25 or 50
 */
class Assessment {
    constructor(name, score, maxScore, weight) {
        this.name = name;
        this.score = parseFloat(score);
        this.maxScore = parseFloat(maxScore);
        this.weight = parseFloat(weight);
    }

    grade(){
        return ((this.score/this.maxScore) * 100).toFixed(2);
    }

    gradeWeight(){
        return Math.round((this.weight/100) * this.grade() + 'e2') + 'e-2';
    }



}

export default Assessment;