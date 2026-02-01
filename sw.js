let timeoutId=null;

self.addEventListener("message",e=>{
  if(e.data.type==="SET_REMINDER"){
    schedule(e.data.time);
  }
});

function schedule(time){
  if(timeoutId) clearTimeout(timeoutId);

  const [h,m]=time.split(":").map(Number);
  const now=new Date();
  const target=new Date();
  target.setHours(h,m,0,0);
  if(target<=now) target.setDate(target.getDate()+1);

  const delay=target-now;

  timeoutId=setTimeout(()=>{
    self.registration.showNotification("דקה לעצמך 🌿",{
      body:"משפט אחד קטן על היום. זה מספיק.",
      silent:true
    });
  },delay);
}
