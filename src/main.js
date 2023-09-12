const studentCreateFrom = document.getElementById("student_crete_from");
const addStudentResultFrom = document.getElementById("add_student_result_from");
const msg = document.querySelector(".msg");
const msgEdit = document.querySelector(".msg-edit");
const studentList = document.querySelector(".all-student-data");
const singleStudent = document.querySelector(".single-student-data");
const studentEditFrom = document.getElementById("student_edit_from");
const view_student_result_from = document.getElementById("view_student_result_from");



//get Students

const getStudents = () => { 
    const students = getDataLs("students"); 
    console.log(students);
 
    
    let content = "";

    if (students.length > 0) {
        students.map((student, index) => {
        content += `<tr class="align-middle">
                        <th scope="row">${index + 1}</th>
                        <td><img style="width:40px;height: 40px; border-radius:50%;object-fit: cover;"
                                src="${student.photo}"
                                alt="${student.name}"></td>
                        <td>${student.name}</td>
                        <td>${student.roll}</td>
                        <td>${student.reg}</td>
                        <td>${timeAgo(student.createdAt)}</td>
                        <td>
                        ${student.result === null ? `<button type="submit" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#add_student_result" onclick="addResult( '${student.id}' )" >Add Marks</button>` : `<button type="submit" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#view_student_result" onclick="viewStudentResult('${student.id}')">View Marks</button>`}
                        </td>
                        <td>
                            <button type="submit" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#single_view_student_modal" onclick="showSingleStudent('${student.roll}')"><i class="fa fa-eye" ></i></button>
                            <button type="submit" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#edit_student_data" onclick="editStudentData('${student.id}')"><i class="fa fa-edit"></i></button>
                            <button class="btn btn-danger" onclick="deleteStudent('${student.roll}')"><i class="fa fa-trash"></i></button>
                        </td>
                    </tr>`;
        });
        
    } else {
        content = `<tr>
        <td colspan="8" class="text-center">No Data Found</td>
        </tr>`;
   }

    studentList.innerHTML = content;
    
};
getStudents();


// show single student 
const showSingleStudent = (roll) => {
    const oldStudent = getDataLs("students");
    const student = oldStudent.find((data) => data.roll === roll);
    singleStudent.innerHTML=` <img class="justify-content-center" style="width:150px;height: auto; border-radius:5px;object-fit: cover;" src="${student.photo}"
                        alt="${student.name}">
                    <h2>Name: ${student.name}</h2>
                    <h4>Roll # ${student.roll}</h4>
                    <h4>Reg # ${student.reg}</h4>`
};
 //add result
const addResult = (id) => { 
    addStudentResultFrom.querySelector('input[name="id"]').value = id;
   
};

// view student result

const viewStudentResult = (id) => {
    const data = getDataLs("students");
    const editResultData = data.find(data => data.id === id);
    view_student_result_from.querySelector('input[placeholder = "Bangla"]').value =editResultData.result.bangla;
    view_student_result_from.querySelector('input[placeholder = "English"]').value =editResultData.result.english;
    view_student_result_from.querySelector('input[placeholder = "Math"]').value =editResultData.result.math;
    view_student_result_from.querySelector('input[placeholder = "Science"]').value =editResultData.result.science;
    view_student_result_from.querySelector('input[placeholder = "Social Science"]').value =editResultData.result.social_science;
    view_student_result_from.querySelector('input[placeholder = "Religion"]').value =editResultData.result.religion;
    view_student_result_from.querySelector('input[placeholder = "id"]').value =id;
 };

//submit student result data form
view_student_result_from.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // update data
   const oldData = getDataLs("students");
    oldData[oldData.findIndex((item) => item.id == data.id)] = {
        ...oldData[oldData.findIndex((item) => item.id == data.id)],
        result: data,
    };
    setDataLs("students", oldData);
    getStudents();
 }; 

// student result form submit
addStudentResultFrom.onsubmit = (e) => { 
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
    
    //update data
    const oldData = getDataLs("students");
    oldData[oldData.findIndex((item) => item.id == data.id)] = {
        ...oldData[oldData.findIndex((item) => item.id == data.id)],
        result: data,
    };
    setDataLs("students", oldData);
    getStudents();

    e.target.reset();
};


// edit student data

const editStudentData = (id) => {
    const oldData = getDataLs("students");
    const data = oldData.find(data => data.id === id);
    studentEditFrom.querySelector('input[name="name"]').value = data.name;
    studentEditFrom.querySelector('input[name="roll"]').value = data.roll;
    studentEditFrom.querySelector('input[name="reg"]').value = data.reg;
    studentEditFrom.querySelector('input[name="photo"]').value = data.photo;
    studentEditFrom.querySelector('input[name="id"]').value = data.id;
    studentEditFrom.querySelector('img#imagePreview').setAttribute("src", data.photo);
};
 
// edit student data form submit

studentEditFrom.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const getOldData = getDataLs("students");

//  //roll number check
//         if (getOldData.some((item) => item.roll === data.roll)) { 
//             msgEdit.innerHTML = createAlert("roll number already exist");
//             return;
//         }
// //reg number check
//         if (getOldData.some((item) => item.reg === data.reg)) { 
//             msgEdit.innerHTML = createAlert("reg number already exist");
//             return;
//         }
    
    getOldData[getOldData.findIndex((item) => item.id === data.id)] = {
        ... getOldData[getOldData.findIndex((item) => item.id === data.id)],
        ...data,

    }
    setDataLs("students",getOldData);
    getStudents();
 };
// delete student
const deleteStudent = (roll) => { 
    const conf = confirm('Are you sure you want to delete')
    if (conf) {
          const oldStudent = getDataLs("students");
          const updateStudent = oldStudent.filter((data) => data.roll !== roll);
          setDataLs("students", updateStudent);
          getStudents();
    } else {
        alert(`your data is safe`);
    }
};

//submit student crete form
studentCreateFrom.onsubmit = (e) => {
    e.preventDefault();
    const form_data = new FormData(e.target);
    const data = Object.fromEntries(form_data.entries());
//validation
    if (!data.name || !data.roll || !data.reg) {
        msg.innerHTML = createAlert("All Fields are required")
    } else if (!isNumber(data.roll)) {
        msg.innerHTML="Invalid numbers"
    }else if (!isNumber(data.reg)) {
        msg.innerHTML="Invalid registration number"
    } else {
        const oldStudent = getDataLs("students");
//roll number check
        if (oldStudent.some((item) => item.roll === data.roll)) { 
            msg.innerHTML = createAlert("roll number already exist");
            return;
        };
//reg number check
        if (oldStudent.some((item) => item.reg === data.reg)) { 
            msg.innerHTML = createAlert("reg number already exist");
            return;
        };

        oldStudent.push({
            ...data,
            result: null,
            createdAt: Date.now(),
            id: generateRandomString(20),
        });
        setDataLs("students", oldStudent);
        e.target.reset();
        msg.innerHTML = createAlert(`<strong>${data.name}</strong> created successful`, "success");
        getStudents();
    }
    
};

