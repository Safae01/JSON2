fetch('data7.json')
.then((reponse)=>reponse.json())
.then((data)=>{
    const select = document.getElementById('subjectFilter')
    const table = document.getElementById('courseList')
    let   liste = []
    data.university.courses.forEach(cours => {
            const option = document.createElement('option')
            option.value=cours.subject
            option.textContent=cours.subject
            select.appendChild(option)
            cours.students.forEach(info => {
                liste.push({...cours,...info})
            table.innerHTML+=`<tr>
            <td>${cours.courseName}</td>
            <td>${cours.professor}</td>
            <td>${cours.subject}</td>
            <td>Name ${info.name}, grade : ${info.grade}</td>
            </tr>`
            });
    });
    const btn = document.getElementById('applyFilters')
    btn.addEventListener('click',()=>{
        table.innerHTML = '';
        const select_value = select.value
        const gradee = parseFloat(document.getElementById('gradeFilter').value) || 0
        
        let filtré = liste.filter(e=> 
            (e.subject === select_value || select_value === "") && 
            (parseFloat(e.grade) >= gradee)
        )
        
        filtré.forEach(C => {
            table.innerHTML+=`<tr>
            <td>${C.courseName}</td>
            <td>${C.professor}</td>
            <td>${C.subject}</td>
            <td>Name ${C.name}, grade : ${C.grade}</td>
            </tr>`
        });
    })
})