import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 2500,
  background: "azure",
  showCloseButton: true,
  showClass: {
    popup: ""
  }
})

export default Toast