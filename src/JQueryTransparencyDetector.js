(function(jq){
    jq.transparencyDetector = function(context,options){
	this.element = jq(context);
	this.options = {
		events : ""	
	}
	this.imgPath = "";
	this.img = new Image();
	this.Alphas = {};
	this.imageData = {};
	this.ImgWidth = 0;
	this.ImgHeight = 0;
	this.init(options);
    };
    
    jq.transparencyDetector.prototype={
    	
	istouchdevice :"ontouchstart" in document ? true : false,

	init:function(options){
	var _me=this,events;
	this.options=jq.extend(this.options,options);
	events=this.options.events.split(",");
    jq.each(events,function(index,value){
	    _me.bindEvents(value);		
	});
	 _me.findImageUrl();
	},
	
	bindEvents:function(event){
	 	this.element.bind(event,{context:this},this.handler);
	},
	
	handler:function(e){
		var _me = e.data.context,falg;
	    flag=_me.check(e);
	     if(flag) console.log("content");
	     else
	     console.log("transperent");
	},
	check:function(event){
    var x=event.pageX,
    y=event.pageY,
    offset=this.element.offset(),
    positionx=x-offset.left,
    positiony=y-offset.top,
    contactpoint=positionx+(positiony-1)*this.ImgWidth,
    flag= this.imageData[contactpoint*4+3];
    return flag;
	},
	unbindEvents:function(){},
	destroy:function(){},
	calculateAlphas:function(propobj){
		     var _me=this,
		     canvas =document.createElement('canvas');
		     //img=new Image();
		     this.img.onload=function(){
		      canvas.width = propobj.imgwidth;
              canvas.height = propobj.imgheight;
              var ctx = canvas.getContext( '2d' );
              ctx.drawImage(_me.img, 0, 0,propobj.imgwidth,propobj.imgheight);	
              _me.imageData = ctx.getImageData( 0, 0,propobj.imgwidth,propobj.imgheight).data;
		     }
		     this.img.src=this.imgPath; 
	},
	findImgDimensions : function(){
		this.ImgWidth = this.element.width();
	    this.ImgHeight = this.element.height();	   
	},
	findImageUrl:function(){
		this.findImgDimensions();
	    if(this.element.prop("tagName") == "IMG"){
	    	this.imgPath= this.element.attr("src");
	    	var propobj={
	    		imgwidth:this.element.width(),
	    		imgheight:this.element.height(),
	    		repeat:"norepeat"
	    	     }
	      this.calculateAlphas(propobj);  	
	       }
	},
	pickColor:function(){}
};



$.fn.transparencyDetector=function(options){
	this.element=$(this);
	if(this.element.prop("tagName")){
         return new jq.transparencyDetector(this,options); 
     }        
};
})(jQuery);
