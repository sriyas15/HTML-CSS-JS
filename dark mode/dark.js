const toggleBtn = document.getElementById("theme-toggle");

if(localStorage.getItem('active') === 'darkmode'){
    document.documentElement.classList.add("darkmode");
}else{
    document.documentElement.classList.remove('darkmode')
}

toggleBtn.addEventListener("click", () => {

  document.documentElement.classList.toggle("darkmode");

  if(document.documentElement.className === "darkmode"){
    localStorage.setItem('active','darkmode');
  }else{
    localStorage.setItem('active','lightmode');
  }

});
   
