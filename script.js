fetch("data1.json")
.then((reponse)=>reponse.json())
.then((data)=>{
    const btn = document.getElementById("show-products")
    btn.addEventListener('click',()=>{
        const listeProduits= document.getElementById('product-list')
        listeProduits.textContent=''
        data.forEach(element => {
            const div = document.createElement('div')
            div.textContent=element.name
            listeProduits.appendChild(div)
        });
    })
    const btn_search =document.getElementById('find-product')
    btn_search.addEventListener('click',()=>{
        const produit_filtré=document.getElementById("search-result")
        produit_filtré.textContent=''
        data.forEach(info => {
            const id_selected = parseFloat(document.getElementById("search-id").value)
            const produit_id = info.id
            if(id_selected===produit_id){
                const div = document.createElement('div')
                div.textContent=info.name
                produit_filtré.appendChild(div)
            }
        });
    })
    const select_category = document.getElementById('filter-category')
    // Créer un Set pour avoir des catégories uniques
    const uniqueCategories = new Set(data.map(item => item.category))
    uniqueCategories.forEach(category => {
        const option = document.createElement('option')
        option.value = category
        option.textContent = category
        select_category.appendChild(option)
    });
    const btn_filtre=document.getElementById('filter-products')
    btn_filtre.addEventListener('click',()=>{
        const liste_filtre =document.getElementById('filter-result')
        liste_filtre.textContent=''
        const value_categ =select_category.value
        data.forEach(element => {
            if(value_categ===element.category){
                const div = document.createElement('div')
                div.textContent=element.name
                liste_filtre.appendChild(div)
            }
        });
    })
    const total_btn = document.getElementById('calculate-stock')
    total_btn.addEventListener('click',()=>{
        const total_stock = document.getElementById('total-stock')
        let total = 0
        data.forEach(element => {
            total += parseFloat(element.stock)
        });
        const div = document.createElement('div')
            div.textContent=total
            total_stock.appendChild(div)
    })
})

// data.forEach(element => {
//     let total = 0
//     for (let i = 0; i < data.length; i++) {
//         total =+ element.stock
//     const div = document.createElement('div')
//     div.textContent=total
//     total_stock.appendChild(div)
//     }
    
// });