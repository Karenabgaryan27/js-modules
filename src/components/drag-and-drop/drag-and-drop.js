// (function () {
//     function DragNDrop({ kanban }) {
//         this.boards = kanban.querySelectorAll('.board');
//         this.items = kanban.querySelectorAll('.board-item');
//         this.dragItem = null
//     }

//     DragNDrop.prototype = {
//         constructor: DragNDrop,
//         dragStart(e) {
//             e.target.style.height = e.target.offsetHeight + 'px'
//             setTimeout(() => (e.target.classList.add('dragging')), 0);
//             this.dragItem = e.target
//         },
//         dragEnd(e) {
//             setTimeout(() => (e.target.classList.remove('dragging')), 0);
//             this.dragItem = null
//         },
//         drop(e) {
//             e.currentTarget.classList.remove('active')
//             const board = e.currentTarget.querySelector('.board-list-inner')
//             board.appendChild(this.dragItem)
//         },
//         dragOver(e) {
//             e.preventDefault()
//             e.currentTarget.classList.add('active')
//         },
//         dragEnter(e) {
//             e.preventDefault()
//         },
//         dragLeave(e) {
//             e.currentTarget.classList.remove('active')
//         },
//         setEvents() {
//             this.items.forEach((item) => {
//                 item.addEventListener("dragstart",(e)=> this.dragStart(e));
//                 item.addEventListener("dragend",(e)=> this.dragEnd(e));
//             });
//             this.boards.forEach(board=>{
//                 board.addEventListener('drop',(e)=>this.drop(e))
//                 board.addEventListener('dragover',(e)=>this.dragOver(e))
//                 board.addEventListener('dragenter',(e)=>this.dragEnter(e))
//                 board.addEventListener('dragleave',(e)=>this.dragLeave(e))
//             })
//         },
//         init() {
//             this.setEvents();
//         },
//     };

//     const dragNDropState = {
//         // boards: document.querySelectorAll("#js-kanban .board"),
//         // items: document.querySelectorAll("#js-kanban .board-item"),
//         kanban: document.querySelector('#js-kanban') 
//     };

//     const dragNDrop = new DragNDrop(dragNDropState);
//     dragNDrop.init();
// })();
