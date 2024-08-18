
const xhr = new XMLHttpRequest();

const body = document.querySelector('body');
body.className='wrapper';
const h1 = document.createElement('h1');
h1.innerText = 'Address Book';
body.appendChild(h1);



const user = document.createElement('div');
user.className = 'user';
const students_input = document.createElement('input');
students_input.name ='students';
students_input.id ='students';
students_input.type ='radio';
students_input.value ='student';
students_input.checked = 'checked';
user.appendChild(students_input);
const students_label = document.createElement('label');
students_label.innerHTML = 'Students';
user.appendChild(students_label);

const teachers_input = document.createElement('input');
teachers_input.name ='teachers';
teachers_input.id ='teachers';
teachers_input.type ='radio';
teachers_input.value ='teacher';
user.appendChild(teachers_input);
const teachers_label = document.createElement('label');
teachers_label.innerHTML = 'Teachers';
user.appendChild(teachers_label);

const add = document.createElement('input');
add.name ='add';
add.type ='button';
add.value = 'Add';
add.className = 'btn btn-primary';
add.setAttribute('data-bs-toggle','modal');
add.setAttribute('data-bs-target','#exampleModal');
user.appendChild(add);
body.appendChild(user);


const search = document.createElement('div');
search.className = 'search';
const search_input = document.createElement('input');
search_input.name ='search_input';
search_input.type ='text';
search_input.placeholder = 'Search for names...';
search.appendChild(search_input);


body.appendChild(search);



const list = document.createElement('div');
list.className = 'list';
body.appendChild(list);


const radios = document.querySelectorAll('input[type="radio"]');

const save = document.querySelector('#save');



document.addEventListener('DOMContentLoaded', function() {
     
    radios.forEach(function(radio) {
      radio.addEventListener('click', function() {
        radios.forEach(function(radio) {
          radio.checked = false;
        });
        this.checked = true; 
      });
    });
  });

render(students_input.value);


students_input.addEventListener('click', ()=>{
    render(students_input.value);
});

teachers_input.addEventListener('click', ()=>{
    render(teachers_input.value);
});


search_input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        let search_words = search_input.value;
        render(search_words)
        
    }
});

save.addEventListener('click', function(){

  
  const username = document.querySelector('#username').value.trim();
  
  const useraddress = document.querySelector('#useraddress').value.trim();
 
  const userrole = document.querySelector('#userrole').value.trim();
  
    
    let img = `images/${userrole}.JPG`; 

   const userObj = {
      img: img,
      name: username,
      address: useraddress,
      position: userrole
  }


  axios({
    url: 'http://localhost:80/add-data',
    method: 'POST',
    data: {
      ...userObj
    }
  }).then(result => {
    console.log(result.data.message)
  }).catch(error => {
    console.log(error)
    console.log(error.response.data.message)
  })    

  });


function render(user = ''){


  axios({
    url: 'http://localhost:80/get-data',
    
  }).then(result => {

data = result.data.data;
    list.innerHTML='';
        let titleUl = document.createElement('ul');
        titleUl.innerHTML = `
            <li>Image</li>
            <li>Name</li>
            <li>Address</li>
        `;
        list.appendChild(titleUl);

        

        for (let i=0; i<data.length; i++){
            
            let temp = data[i].name.toLowerCase();
            if(temp.includes(user.toLocaleLowerCase())|| user === data[i].position  || user == '' ){
                
                let ul = document.createElement('ul');
                ul.innerHTML=`
                <li><a href="#"><img src="${data[i].img}"></a></li>
                <li>${data[i].name}</li>
                <li>${data[i].address}</li>
                 `; 
                list.appendChild(ul);

            }
            
          }

  })  

}





