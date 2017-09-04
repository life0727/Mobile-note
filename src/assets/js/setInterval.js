export function Otime () {
	let itime=setInterval(function(){
        this.size+=1;
       if(this.size==99){
           clearInterval(itime)
         }
        },200)
}