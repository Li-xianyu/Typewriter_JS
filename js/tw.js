class TW {
  constructor() {
    this.queue = []; 
    this.index = 0;   
    this.dom;
    this.cursor = "_";
    this.init();
  }

  // 因为执行需要在函数收集之前，因此需要利用事件机制，先收集后执行
  init() {
    setTimeout(() => this.run() , 0);
  }

  run() {
    const fn = this.queue[this.index++];
    fn && fn();
  }

  twget (dom){
    this.queue.push(() => {
      if(null == document.getElementById(dom)){
	    console.log("无法定位相关元素");
      }else{
        this.dom = document.getElementById(dom);
		console.log(this.dom);
        this.dom.innerHTML += this.cursor;
        this.run();
      }
    });
    return this;
  } 

  clear (s = 100){
	this.queue.push(() => {
      let timer = setInterval(() => {
        this.dom.innerHTML = this.dom.innerHTML.slice(0,this.dom.innerHTML.length-1);
        if(this.dom.innerHTML == ""){
            clearInterval(timer);
            this.run();
        }
      },s);
    });
    return this;
  }

  tw (str,s=150){
    this.queue.push(() =>{
      var i = 0;
      var e = setInterval(()=>{
        this.dom.innerHTML += str[i];
        if(i < str.length-1){
          i++;
        }else{
          clearInterval(e);
          this.run();
        }
      },s);
    });
    return this;
  }
};
