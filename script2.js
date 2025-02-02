fetch('data2.json')
.then((response) => response.json())
.then((data) => {
    const table = document.getElementById('employeeTable');
    Object.keys(data.employees).forEach(departmentKey => {
        const department = data.employees[departmentKey];
        department.staff.forEach(info => {
            table.innerHTML += `<tr>
                <td>${info.id}</td>
                <td>${info.name}</td>
                <td>${info.role}</td>
                <td>${info.age}</td>
                <td>${department.name}</td>
            </tr>`;
        });
    });
    const btn = document.getElementById('Marketing')
    btn.addEventListener('click',()=>{
        table.innerHTML=''
        Object.keys(data.employees).forEach(departmentKey => {
            const department = data.employees[departmentKey];
            if(department.name==="Marketing"){
                department.staff.forEach(info => {
                    table.innerHTML += `<tr>
                        <td>${info.id}</td>
                        <td>${info.name}</td>
                        <td>${info.role}</td>
                        <td>${info.age}</td>
                        <td>${department.name}</td>
                    </tr>`;
                });
            }
            
        });
    })
})