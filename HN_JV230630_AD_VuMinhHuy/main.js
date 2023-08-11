// Danh sách học viên được lưu trong một mảng với tên students

let students = [
    {
        id: 1,
        name: "rikkei",
        email: "rikkei@gmail.com",
        phone: "0823868888",
        hometown: "Hà Nội",
        gender: "Nam",
    },
    {
        id: 2,
        name: "academy",
        email: "academy@gmail.com",
        phone: "0828638888",
        hometown: "HCM",
        gender: "Nữ",
    },
];

// hiện mảng students lên trên bảng trong HTML

let newId;
let index;

function showList(data=students) {
    let string = "";
    for (let i = 0; i < data.length; i++) {
        const e = data[i];
        string += ` <tr>
                    <td>${e.id}</td>
                    <td>${e.name}</td>
                    <td>${e.email}</td>
                    <td>${e.phone}</td>
                    <td>${e.hometown}</td>
                    <td>${e.gender}</td>
                    <td>
                        <a onclick="fix(${e.id})">Edit</a><span> |</span>
                        <a onclick="del(${i})">Delete</a>
                    </td>
                </tr>`
    }
    document.getElementById("list_students").innerHTML = string;
}
showList();

// hàm thêm ID mới
function getNewId() {
    if (students.length == 0) {
        return newId = 1;
    }
    return newId = students.length + 1;
}

let inputName = document.getElementById("name");
let inputEmail = document.getElementById("email");
let inputPhone = document.getElementById("phone");
let inputAdress = document.getElementById("hometown");
let inputGender = document.getElementsByName("gender");

// hàm lấy value của input radio
function checkRadio() {
    let checkValue = "";
    for (let i = 0; i < inputGender.length; i++) {
        if (inputGender.item(i).checked) {
            checkValue = inputGender.item(i).value;
        }
    }
    return checkValue;
}

let warn = document.getElementById("warn-box");

document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault();
    if (inputName.value == "" || inputEmail.value == "" || inputPhone.value == "" || inputAdress.value == "") {
        warn.innerHTML = "Không được để trống !";
    } else if (inputPhone.value.length != 10) {
        warn.innerHTML = "Số điện thoại bị sai";
    } else {
        if (index >= 0) {
            students[index].name = inputName.value;
            students[index].email = inputEmail.value;
            students[index].phone = inputPhone.value;
            students[index].hometown = inputAdress.value;
            students[index].gender = checkRadio(),
                index = -1;
        } else {
            let newStudent = {
                id: getNewId(),
                name: inputName.value,
                email: inputEmail.value,
                phone: inputPhone.value,
                hometown: inputAdress.value,
                gender: checkRadio(),
            };
            students.push(newStudent);
        }
    }
    showList()
    inputName.value = "";
    inputEmail.value = "";
    inputPhone.value = "";
    inputAdress.value = "";
    inputGender.value = "";
})

function findIndexById(iD) {
    for (let i = 0; i < students.length; i++) {
        if (iD == students[i].id) {
            return i;
        }
    }
    return -1;
}

// xóa 1 sinh viên

function del(index) {
    students.splice(index, 1);
    showList();
}

function fix(id) {
    index = findIndexById(id);
    inputName.value = students[index].name;
    inputEmail.value = students[index].email;
    inputPhone.value = students[index].phone;
    inputAdress.value = students[index].hometown;
    console.log(index);
    return index;
}

// tìm kiếm sinh viên theo tên

function findStudent() {
    let text = document.getElementById("search").value;
    let textX = text.trim().toLowerCase();
    let foundStudent = students.filter(stu => stu.name.toLowerCase().includes(textX));
    showList(foundStudent);
}

// sắp xếp thứ tự theo alpha b

function sortStudent() {
    students.sort((a, b) => a.name.localeCompare(b.name));
    showList();
}