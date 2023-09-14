const header = document.querySelector("header");

window.addEventListener("scroll", function () {
    header.classList.toggle("sticky", window.scrollY > 0);
});

///////////////////

const boxes = document.querySelectorAll('.row, .sub-box');
const tiltAngle = 10; // Adjust this value to control the amount of tilt

function calculateRotation(x, y, box) {
    const boxRect = box.getBoundingClientRect();
    const boxCenterX = boxRect.left + boxRect.width / 2;
    const boxCenterY = boxRect.top + boxRect.height / 2;
    const deltaX = x - boxCenterX;
    const deltaY = y - boxCenterY;
    const angleX = -tiltAngle * (deltaY / (boxRect.height / 2));
    const angleY = tiltAngle * (deltaX / (boxRect.width / 2));
    return `rotateX(${angleX}deg) rotateY(${angleY}deg)`;
}

function tiltBox(event) {
    boxes.forEach(box => {
        const boxRect = box.getBoundingClientRect();
        const isMouseOver = (event.clientX >= boxRect.left && event.clientX <= boxRect.right && event.clientY >= boxRect.top && event.clientY <= boxRect.bottom);
        if (isMouseOver) {
            const rotation = calculateRotation(event.clientX, event.clientY, box);
            box.style.transform = `perspective(1000px) ${rotation} scale3d(1.0, 1.0, 1.0)`;
        } else {
            box.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1.0, 1.0, 1.0)`;
        }
    });
}

document.addEventListener('mousemove', tiltBox);

///////////////////

let menu = document.querySelector('#menu-icon');
let navlist = document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navlist.classList.toggle('active');
};

window.onscroll = () => {
    menu.classList.remove('bx-x');
    navlist.classList.remove('active');
};

const sr = ScrollReveal({
    distance: '45px',
    duration: 2700,
    reset: false
})

sr.reveal('.home-text', { delay: 150, origin: 'left' })
sr.reveal('.home-img', { delay: 150, origin: 'right' })

sr.reveal('.sub-service,.about,.portfolio,.service,.cta,.contact', { delay: 100, origin: 'bottom' })


gsap.set('.motiv img',{xPercent:-50, yPercent:-50})

const imgs = gsap.utils.toArray("#imgContainer .motiv");
const next = 5; // time to change
const fade = 1.5; // fade time 



//only for the first 
gsap.set(imgs[0], {autoAlpha:1})

let split = new SplitText('.motiv01 h1', {type:"chars"}),
    chars = split.chars;
gsap.from(chars, {autoAlpha:0, x: -10, duration:0.3, ease: 'Power2.in', stagger:0.1, delay:1});

// ====================
function crossfade(){

  split = new SplitText(imgs[1], {type:"chars"});
  chars = split.chars;

  const action = gsap.timeline()
  .to(imgs[0], {autoAlpha:0, duration:fade})
  .to(imgs[1], {autoAlpha:1, duration:fade},0)

  .from(chars, {autoAlpha:0, x: -10, duration:0.3, ease: 'Power2.in', stagger:0.1}, 1);

  imgs.push( imgs.shift() );
  // start endless run
  gsap.delayedCall(next, crossfade);
}

// start the crossfade after next = 3 sec
gsap.delayedCall(next, crossfade);

