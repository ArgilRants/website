import { createDraggable, animate, svg, stagger, engine, utils, createTimeline} from './anime.esm.js';

const boxes = document.querySelectorAll(".box")


for (let index = 0; index < boxes.length; index++) {
    let disableCurrent = createDraggable(boxes[index], {
        velocityMultiplier: 0,
        cursor: {
            onHover: 'move'
        }
    })
    disableCurrent.disable();
}

function makeDraggable(){
    for (let index = 0; index < boxes.length; index++) {
        let doCurrent = createDraggable(boxes[index], {
            velocityMultiplier: 0,
            cursor: {
                onHover: 'move'
            }
        })
    }
}

document.addEventListener('keydown', draggableboxes);

function draggableboxes(e){
  if(e.key == "U" || e.key == "u"){
    if(e.shiftKey == true && e.ctrlKey == true){
      if (boxes[0].getAttribute("class").includes("is-disabled")){
        makeDraggable();
        console.log("Draggable Enabled");
        easyAlert('Draggable option enabled', 'Refresh the page to reset', 'success', '1500', 'var(--h2-color)')
      }
    }
  }
}

// animate(svg.createDrawable('.titleSVG'), {
//     draw: ['0 0', '0 0.7'],
//     ease: 'inOutQuad',
//     duration: 1500,
//     delay: stagger(0),
//     loop: false
// });


// animate('#loadingGolem', {
//     x: '-100vw',
//     y: {
//       to: '30rem',
//       modifier: v => Math.cos(v) / 2, // Specific modifier to y property
//     },
//     delay: 100,
//     duration: 1800,
// });


// const tl = createTimeline({
//     delay: 1799,
//   })
//   .add('.loading', { display: 'none'})
