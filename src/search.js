const searchResult = document.getElementById('searchResult');
const resultSheet = document.querySelector(".result-sheet");

searchResult.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    const oldData = getDataLs("students");
   
    
    const studentResult = oldData.find((item) => item.roll === data.roll && item.reg === data.reg);
    let content ;
    
    if (studentResult) {
        content = `
        <div class="student-result">
                            <div class="my-3 text-center">
                                <img class=" w-25 "
                                    src="${studentResult.photo}" alt="">
                            </div>
                            <h2>Name:${studentResult.name}</h2>
                            <h4>Roll:${studentResult.roll}</h4>
                            <h4>Reg:${studentResult.reg}</h4>
                            ${finaleResult(
                                        {
                                            bangla: studentResult.result.bangla,
                                            english: studentResult.result.english,
                                            math: studentResult.result.math,
                                            science: studentResult.result.science,
                                            social_science: studentResult.result.social_science,
                                            religion: studentResult.result.religion,
                                        }
        ).result === "F"
            ? '<h2 style="color: red">Failed</h2>'
            :
            '<h2 style="color: green">Passed</h2>'}
                            <hr>
                            <table class="table table-striped table-bordered ">
                                <tr>
                                    <td>SL.No</td>
                                    <td>Name Of Subject</td>
                                    <td>Marks</td>
                                    <td>Letter Grade</td>
                                    <td>Grade Point</td>
                                    <td>Grade Point Average(GPA)</td>
                                    <td>GPA with Additional Subject</td>
                                </tr>
                                <tr>
                                    <td>01</td>
                                    <td>Bangla</td>
                                    <td>${studentResult.result.bangla}</td>
                                    <td>${getGpaGrade(studentResult.result.bangla).gpa}</td>
                                    <td>${getGpaGrade(studentResult.result.bangla).grade}</td>
                                    <td rowspan="6">${finaleResult(
                                        {
                                            bangla: studentResult.result.bangla,
                                            english: studentResult.result.english,
                                            math: studentResult.result.math,
                                            science: studentResult.result.science,
                                            social_science: studentResult.result.social_science,
                                            religion: studentResult.result.religion,
                                        }
                                    ).cgpa.toFixed(2)}</td>
                                    <td rowspan="6"> ${finaleResult(
                                        {
                                            bangla: studentResult.result.bangla,
                                            english: studentResult.result.english,
                                            math: studentResult.result.math,
                                            science: studentResult.result.science,
                                            social_science: studentResult.result.social_science,
                                            religion: studentResult.result.religion,
                                        }
                                    ).result}</td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td>English</td>
                                    <td>${studentResult.result.english}</td>
                                    <td>${getGpaGrade(studentResult.result.english).gpa}</td>
                                    <td>${getGpaGrade(studentResult.result.english).grade}</td>

                                </tr>
                                <tr>
                                    <td>03</td>
                                    <td>Math</td>
                                    <td>${studentResult.result.math}</td>
                                    <td>${getGpaGrade(studentResult.result.math).gpa}</td>
                                    <td>${getGpaGrade(studentResult.result.math).grade}</td>
                                </tr>
                                <tr>
                                    <td>04</td>
                                    <td>Science</td>
                                    <td>${studentResult.result.science}</td>
                                    <td>${getGpaGrade(studentResult.result.science).gpa}</td>
                                    <td>${getGpaGrade(studentResult.result.science).grade}</td>
                                </tr>
                                <tr>
                                    <td>05</td>
                                    <td>Social Science</td>
                                    <td>${studentResult.result.social_science}</td>
                                    <td>${getGpaGrade(studentResult.result.social_science).gpa}</td>
                                    <td>${getGpaGrade(studentResult.result.social_science).grade}</td>
                                </tr>
                                <tr>
                                    <td>06</td>
                                    <td>Religion</td>
                                    <td>${studentResult.result.religion}</td>
                                    <td>${getGpaGrade(studentResult.result.religion).gpa}</td>
                                    <td>${getGpaGrade(studentResult.result.religion).grade}</td>
                                    
                                </tr>
                            </table>
                        </div>
        `
    } else { "Result not found" };

    resultSheet.innerHTML = content;
    e.target.reset();
 };