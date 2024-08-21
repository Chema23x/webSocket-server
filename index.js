import { Server } from "socket.io";

const io = new Server({
    cors:{
        origin: "http://localhost:3000"
    }
});


const today = new Date()
const day = today.getDate()
const month = today.getMonth() + 1
const year = today.getFullYear()

// Formatear la fecha como 'día/mes/año'
const formattedDate = `${day}/${month}/${year}`;

io.on("connection", (socket) => {
  console.log("someone has entered")

  socket.on("newOrder", ({senderId}) => {
    console.log(senderId)
    
    io.emit("getNotification", {senderId})

    io.to(socket.id).emit("getUserNotification", {
      message: `Felicidades por tu compra del día ${formattedDate} , podrás visualizar su status dentro del perfil`
    })
  })

  socket.on("disconnect", () => {
    console.log("someone has disconnected")
  })
});

io.listen(5000);