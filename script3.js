fetch("data3.json")
.then((reponse)=>reponse.json())
.then((data)=>{
    const table = document.getElementById('bookTable')
    Object.keys(data.library.books).forEach(categorie => {
        const categ = data.library.books[categorie]
        Object.keys(categ).forEach(scategorie => {
            const scateg = categ[scategorie]
            scateg.forEach(info => {
                table.innerHTML+=`
                <tr>
                <td>${categorie}</td>
                <td>${scategorie}</td>
                <td>${info.title}</td>
                <td>${info.author}</td>
                <td>${info.year}</td>
                </tr>
                `
            });
        });
    });

    const btn = document.getElementById('filter')
    btn.addEventListener('click',()=>{
        table.textContent=''
        Object.keys(data.library.books).forEach(categorie => {
            const categ = data.library.books[categorie]
            Object.keys(categ).forEach(scategorie => {
                const scateg = categ[scategorie]
                scateg.forEach(info => {
                    if(parseFloat(info.year)>=2000){
                    table.innerHTML+=`
                    <tr>
                    <td>${categorie}</td>
                    <td>${scategorie}</td>
                    <td>${info.title}</td>
                    <td>${info.author}</td>
                    <td>${info.year}</td>
                    </tr>
                    `
                    }
                    
                });
            });
        });
    })
})