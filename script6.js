fetch('data6.json')
.then((reponse)=>reponse.json())
.then((data)=>{
    const select = document.getElementById('filterStatus')
    const one = new Set()
    const array = []
    Object.keys(data.organization.departments).forEach(typeDep => {
        const proj = data.organization.departments[typeDep]
        proj.projects.map(item=>one.add(item.status))
    });
    one.forEach(st => {
        const option = document.createElement('option')
        option.value = st
        option.textContent = st
        select.appendChild(option)
    });
    const table = document.getElementById('affichage')
    Object.keys(data.organization.departments).forEach(typeDep => {
        const proj = data.organization.departments[typeDep]
        proj.projects.forEach(info => {
            array.push({typeDep,...info})
            table.innerHTML+=`
            <tr>
            <td>${typeDep}</td>
            <td>${info.name}</td>
            <td>${info.team}</td>
            <td>${info.budget}</td>
            <td>${info.status}</td>
            </tr>
            `
        });
    });
    const btn = document.getElementById('applyFilters')
    btn.addEventListener('click',()=>{
        table.textContent=""
        const selectvalur = select.value
        const sort = document.getElementById('sortBudget').value
        let filtred = array.filter(e=> selectvalur==="" || selectvalur===e.status)
        if(sort==='asc' ){
            filtred.sort((a,b)=>a.budget-b.budget)
        }else{
            filtred.sort((a,b)=>b.budget-a.budget)
        }
        filtred.forEach(element => {
            table.innerHTML+=`
            <tr>
            <td>${element.typeDep}</td>
            <td>${element.name}</td>
            <td>${element.team}</td>
            <td>${element.budget}</td>
            <td>${element.status}</td>
            </tr>
            `
        });
    })
})
