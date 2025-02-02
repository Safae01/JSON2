fetch('data8.json')
.then((reponse)=>reponse.json())
.then((data)=>{
    const table = document.getElementById('orderList')
    const allorders =[]
    data.store.orders.forEach(info => {
        info.products.forEach(prod => {
            allorders.push({...info,...prod})
            const typeprod = data.store.products.find(p=>p.id===prod.productId)
            table.innerHTML+=`
            <tr>
            <td>${info.orderId}</td>
            <td>${info.customer}</td>
            <td>${info.date}</td>
            <td>${info.totalAmount}</td>
            <td>${info.status}</td>
            <td>${typeprod?`${typeprod.name} (qtt : ${prod.quantity})` : `not found`}</td>
            </tr>
            `
        });
    });

    const btn = document.getElementById('applyFilters')
    btn.addEventListener('click',()=>{
        table.textContent=''
        const statut = document.getElementById('statusFilter').value
        const amount = document.getElementById('amountFilter').value 
        const datee = document.getElementById('dateFilter').value
        const sorting = document.getElementById('sortFilter').value
        let filtré = allorders.filter(s=> (s.status=== statut || statut==="")&& (s.date===datee || datee==="") )
        if(amount==="lessThan1000"){
            filtré = filtré.filter(a=> a.totalAmount<1000)
        }else if(amount==="1000to2000"){
            filtré = filtré.filter(a=> a.totalAmount>=1000 && a.totalAmount<=2000 )
        }else if(amount==="greaterThan2000"){
            filtré = filtré.filter(a=> a.totalAmount>2000)
        }
        if(sorting==="date-asc"){
            filtré.sort((a,b)=> new Date (a.date) - new Date(b.date))
        }else if(sorting==="date-desc"){
            filtré.sort((a,b)=> new Date (b.date) - new Date(a.date)) 
        }else if(sorting==="amount-asc"){
            filtré.sort((a,b)=> a.totalAmount - b.totalAmount)
        }else if(sorting==="amount-desc"){
            filtré.sort((a,b)=> b.totalAmount - a.totalAmount)
        }

        filtré.forEach(info => {
            const typeprod = data.store.products.find(p=>p.id===info.productId)
            table.innerHTML+=`
            <tr>
            <td>${info.orderId}</td>
            <td>${info.customer}</td>
            <td>${info.date}</td>
            <td>${info.totalAmount}</td>
            <td>${info.status}</td>
            <td>${typeprod?`${typeprod.name} (qtt : ${info.quantity})` : `not found`}</td>
            </tr>
            `
        });
    })
})