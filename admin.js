let vehicleImgUrl="https://coding-platform.s3.amazonaws.com/dev/lms/tickets/5e80fcb6-3f8e-480c-945b-30a5359eb40e/JNmYjkVr3WOjsrbu.png"
        let vehicles=[];
        let nextId=1;

        const form =document.getElementById("fleetForm");
        const regNoInput=document.getElementById("regNo");
        const categoryInput=document.getElementById("category");
        const driverInput=document.getElementById("driver");
        const availabilityInput=document.getElementById("availability");

        form.addEventListener("submit",function(e){
            e.preventDefault();
            const regNo=regNoInput.value.trim();
            const category=categoryInput.value;
            const driver =driverInput.value.trim();
            const status=availabilityInput.value;

            if(regNo==="" || category==="" || driver==="" || status===""){
                alert("Please Fill all fields")
                return;
            }
            const newVehicles={
                id:nextId,
                regNo:regNo,
                category:category,
                driver:driver,
                status:status
            };
            nextId=nextId+1;
            vehicles.push(newVehicles);
            regNoInput.value="";
            categoryInput.value="";
            driverInput.value="";
            availabilityInput.value="";

            renderCards();
        });

        const filterCategory=document.getElementById("filterCategory")
        const filterAvailability=document.getElementById("filterAvailability")
        const clearFilterBtn=document.getElementById("clearFilterBtn")
        const cardsContainer=document.getElementById("cardsContainer");

        function renderCards(){
            cardsContainer.innerHtml="";
            const catFilter=filterCategory.value;
            const availFilter=filterAvailability.value;

            for(let i=0;i<vehicles.length;i++){
                const v=vehicles[i];
                if(catFilter!=="All" && v.category!== catFilter){ 
                    continue;
                }
                if(availFilter !=="All" && v.status !==availFilter){
                    continue;
                }

                const card = document.createElement("div");
                card.className="card";
                const img=document.createElement("img");
                img.src=vehicleImgUrl;
                card.appendChild(img);
                const p1=document.createElement("p");
                p1.textContent="Reg No: " + v,regNo;
                card.appendChild(p1);

                const p2=document.createElement("p");
                p2.textContent="Category: " + v.category;
                card.appendChild(p2);

                const p3=document.createElement("p");
                p3.textContent="Driver: " + v.driver;
                card.appendChild(p3);

                const p4=document.createElement("p");
                p4.textContent="Status: " + v.status;
                card.appendChild(p4);

                const btnUpdate=document.createElement("button ");
                btnUpdate.textContent="Update Driver ";
                btnUpdate.addEventListener("click", function(){
                    updateDriver(v.id);
                });
                card.appendChild(btnUpdate);

                const btnChange=document.createElement("button");
                btnChange.textContent="Change Availability";
                btnChange.addEventListener("click", function(){
                    changeAvailability(v.id)
                });
                card.appendChild(btnChange);

                const btnDelete=document.createElement("button");
                btnDelete.textContent="Delete Vehicle";
                btnDelete.addEventListener("click", function(){
                    deleteVehicle(v.id)
                });
                card.appendChild(btnDelete);

                cardsContainer.appendChild(card);

            }
        }

        function updateDriver(id){
            const index=findIndexById(id);
            if(index===-1) return;

            const currentName=vehicles[index].driver;
            const newName=prompt("Enter new driver name", currentName);
            if(newName.trim()===""){
                alert("Driver name cannot be empty")
                return;
            }

            vehicles[index].driver=newName.trim();
            renderCards();
        }
        function changeAvailability(id){
            const index=findIndexById(id);
            if(index===-1) return ;
            if(vehicles[index].status==="Available"){
                vehicles[index].status="Unavailable";
            }
            renderCards();
        }

        function deleteVehicle(id){
            const ok=confirm("Are you sure you want to delete this vehicle");
            if(!ok) return;

            vehicles.splice(index,1);
            renderCards();
        }

        function findIndexById(id){
            for(let i=0;i<vehicles.length;i++){
                if(vehicles[i].id===id){
                    return i;
                }
            }
            return -1;
        }

        filterCategory.addEventListener("change", renderCards);
        filterAvailability.addEventListener("change", renderCards);
        clearFilterBtn.addEventListener("click", function(){
            filterCategory.value-"All";
            filterAvailability.value="All";
            renderCards();
        });
        renderCards();