// Toggle class active
const navbarNav =  document.querySelector('.navbar-nav');

//ketika wisata-menu diklik
document.querySelector('#wisata-menu').onclick = () => {
    navbarNav.classList.toggle('active');
};

//klik diluar side bar untuk menghilangkan nav
const wisata = document.querySelector('#wisata-menu');

document.addEventListener('click', function(e){
    if (!wisata.contains(e.target) && !navbarNav.contains(e.target)){
        navbarNav.classList.remove('active');
    }
});

var typing = new Typed (".typingHeader", {
  strings : [" Menyatu dengan alam, nikmati ketulusan alam dalam membagi keindahan dan kesejukan."],
  typeSpeed:100,
  backSpped:50,
  loop:true
});

const transition = new IntersectionObserver((entries) => {
  entries.forEach((entry)=> {
    if(entry.isIntersecting){
      entry.target.classList.add("show");
    }else{
      entry.target.classList.remove("show");
    }
  });
});

const hiddenElements = document.querySelectorAll('.hidden')
hiddenElements.forEach((el)=>transition.observe(el))


