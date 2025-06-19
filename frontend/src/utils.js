import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        position: 'top-right'
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        position: 'top-right'
    })
}



export const popup = (msg) => {
  toast.dismiss(); // ✅ remove any existing toasts

  toast(msg, {
    autoClose: 400, // visible for 400ms
    closeButton: false,
    closeOnClick: false,
    draggable: false,
    pauseOnHover: false,
    hideProgressBar: true,
    position: "top-center",
    style: {
      background: "#4caf50",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "16px",
    },
  });
};