fetch('data9.json')
.then((reponse)=>reponse.json())
.then((data)=>{
    const array = []
    const table = document.getElementById('reservationList')
    data.hotel.reservations.forEach(res => {
        res.rooms.forEach(room => {
        array.push({...res,...room})
        const info = data.hotel.rooms.find(e=> e.id=== room.roomId)
        table.innerHTML+=`
        <tr>
        <td>${res.reservationId}</td>
        <td>${res.customer}</td>
        <td>${res.checkIn}</td>
        <td>${res.checkOut}</td>
        <td>${res.totalAmount}</td>
        <td>${res.status}</td>
        <td>${info? `${info.type} : ${room.nights} nights` : `not found`}</td>
        </tr>
        `
        });
        const btn = document.getElementById('applyFilters')
        btn.addEventListener('click',()=>{
            table.textContent=''
            const statut = document.getElementById('statusFilter').value
            const startdat = document.getElementById('dateFilterStart').value
            const enddat = document.getElementById('dateFilterEnd').value
            const sort = document.getElementById('sortFilter').value
            const filtre = array.filter(f => (statut===f.status || statut==="") && (startdat===f.checkIn || startdat==="")&&(enddat===f.checkOut || enddat===""))
            if(sort==='date'){
                filtre.sort((a,b)=> new Date(a.checkIn) - new Date(b.checkIn))
            }else if(sort==="amount"){
                filtre.sort((a,b)=> a.totalAmount - b.totalAmount)
            }
            filtre.forEach(res => {
            const info = data.hotel.rooms.find(e=> e.id=== res.roomId)
            table.innerHTML+=`
            <tr>
            <td>${res.reservationId}</td>
            <td>${res.customer}</td>
            <td>${res.checkIn}</td>
            <td>${res.checkOut}</td>
            <td>${res.totalAmount}</td>
            <td>${res.status}</td>
            <td>${info? `${info.type} : ${res.nights} nights` : `not found`}</td>
            </tr>
            `
            });
        })
    });
})