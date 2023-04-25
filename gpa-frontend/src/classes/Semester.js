import { v4 as uuid } from 'uuid';

/**
 * Class representing an Semester
 * Attributes
 *  - name: the name of the semsester like 'Spring 2023' or 'Summer Season'
 *  - courses: the list of courses for that semester
 */
class Semester {
    constructor(name, courses, id) {
        this.name = name;
        this.courses = courses;
        this.id = id ? id : uuid();
    }
}

export default Semester;