

//number checker
const isNumber = (num) => { 
    const pattern = /^[0-9]{6,}$/
    return pattern.test(num)
};

//set data to local Storage
const setDataLs = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

//get data from local Storage
const getDataLs = (key) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key));
    }
    return [];
};

//create alert function

const createAlert = (msg, type = "danger") => {
    return `<p class="alert alert-${type} d-flex justify-content-between">${msg}
  <button class="btn-close" data-bs-dismiss="alert"></button>
</p>`;
};

//time ago 
const timeAgo = (timestamp) => {
    const now = new Date();
    const postedTime = new Date(timestamp);
    const timeDiff = now - postedTime;

    const seconds = Math.floor(timeDiff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) {
        return `${years} year${years > 1 ? 's' : ''} ago`;
    } else if (months > 0) {
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else if (weeks > 0) {
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else {
        return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
    }
};

/**
 * random unique id generator function
 */

const generateRandomString = (length = 10) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    const randomValues = new Uint8Array(length);

    if (window.crypto) {
        window.crypto.getRandomValues(randomValues);
    } else if (window.msCrypto) {
        window.msCrypto.getRandomValues(randomValues);
    } else {
        throw new Error('Browser does not support crypto.getRandomValues()');
    }

    let uniqueId = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = randomValues[i] % charactersLength;
        uniqueId += characters.charAt(randomIndex);
    }
    return uniqueId;
};
const getGpaGrade = (marks) => {
    let gpa;
    let grade;
    if (marks >= 0 && marks < 33) {
        gpa = 0;
        grade = "F"
    } else if (marks >= 33 && marks <= 39) {
        gpa = 1;
        grade = "D";
    } else if (marks >= 40 && marks <= 49) {
        gpa = 2;
        grade = "C";
    } else if (marks >= 50 && marks <= 59) {
        gpa = 3;
        grade = "B";
    } else if (marks >= 60 && marks <= 69) {
        gpa = 4;
        grade = "A-";
    } else if (marks >= 70 && marks <= 79) {
        gpa = 4.5;
        grade = "A";
    } else if (marks >= 80 && marks <= 100) {
        gpa = 5;
        grade = "A+";
    } 
    
    return {
        gpa: gpa,
        grade: grade,
    }
};

const finaleResult = (marks) => {
    let cgpa;
    let result;

    let totalGpa = getGpaGrade(marks.bangla).gpa + getGpaGrade(marks.english).gpa + getGpaGrade(marks.math).gpa + getGpaGrade(marks.science).gpa + getGpaGrade(marks.social_science).gpa + getGpaGrade(marks.religion).gpa;

    cgpa = totalGpa / 6;

    if (marks.bangla >= 33 && marks.english >=33 && marks.math >=33 && marks.science >=33 && marks.social_science >=33 && marks.religion >=33) {
        if (cgpa >=1 && cgpa > 2) {
            result = "D";
        } else if (cgpa >= 2 && cgpa > 3) {
            result = "C";
        }else if (cgpa >= 3 && cgpa > 3.5) {
            result = "B";
        }else if (cgpa >= 3.4 && cgpa > 4) {
            result = "A-";
        }else if (cgpa >= 4 && cgpa > 5) {
            result = "A";
        }else if (cgpa = 5) {
            result = "A+";
        }
        return {
            result: result,
            cgpa: cgpa,

        };
        
        
        
        
    } else {
        return {
            result: "F",
            CGPA: cgpa,
        };
    }
 };