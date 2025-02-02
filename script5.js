fetch('data5.json')
.then((reponse)=>reponse.json())
.then((data)=>{
    const allmovie=[]
    const table = document.getElementById('movieTable')
    Object.keys(data.movies).forEach(types => {
        const type = data.movies[types]
        type.forEach(info => {
            allmovie.push({types,...info})
            table.innerHTML+=`
            <tr>
            <td>${types}</td>
            <td>${info.title}</td>
            <td>${info.director}</td>
            <td>${info.year}</td>
            <td>${info.rating}</td>
            </tr>
            `
        });
    });
    const btn = document.getElementById('filterRating')
    btn.addEventListener('click',()=>{
        table.textContent=''
        const rate = parseFloat(document.getElementById('minRating').value)
        Object.keys(data.movies).forEach(types => {
            const type = data.movies[types]
            type.forEach(info => {
                if(info.rating>=rate || rate===''){
                    table.innerHTML+=`
                <tr>
                <td>${types}</td>
                <td>${info.title}</td>
                <td>${info.director}</td>
                <td>${info.year}</td>
                <td>${info.rating}</td>
                </tr>
                `
                }
            });
        });
    })
    const tri = document.getElementById('sortYear')
    tri.addEventListener('click',()=>{
        table.textContent=''
        let tri_valur = tri.value
        if(tri_valur==='asc'){
            allmovie.sort((a,b)=>a.year-b.year)
        }else{
            allmovie.sort((a,b)=>b.year-a.year)
        }
        allmovie.forEach(e => {
            table.innerHTML+=`
                <tr>
                <td>${e.types}</td>
                <td>${e.title}</td>
                <td>${e.director}</td>
                <td>${e.year}</td>
                <td>${e.rating}</td>
                </tr>
                `
        });
    })
})
