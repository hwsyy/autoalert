/*
*自定义弹窗控件
*@author hi_linsunny@163.com
*@since 2015-01-21
*@用法
*var alertObj = new doAlert({
		'id' : "myModal",//模态弹窗的id
		'title' : '测试',//模态弹窗的标题
		'message' : '地地道道',//模态弹窗的内容
		'is_show_head' : 1,//需要模态弹窗的头部：1，不需要模态弹窗的头部：2||不用传这个字段
		'is_show_content' : 1,//需要模态弹窗的内容：2，不需要模态弹窗的内容：2||不用传这个字段
		'is_show_foot' : 1,//需要模态弹窗的底部：1，不需要模态弹窗的头部：2||不用传这个字段
		'auto_destory':1,//需要自动销毁：1，不需要自动销毁：2||不用传这个字段
		'auto_time':3000,//设置自动销毁时间，秒级
	});
*/
function doAlert(obj){
	this.id = obj.id || "myModal";
	this.title = obj.title || "标题";
	this.message = obj.message || "内容";
	this.is_show_head = obj.is_show_head || 0;
	this.is_show_content = obj.is_show_content || 1;
	this.is_show_foot = obj.is_show_foot || 0;
	this.url = obj.url || "javascript:;";
	this.auto_destory = obj.auto_destory || 0;
	this.auto_time = obj.auto_time || 2000;
	this.footConfig = obj.footConfig || {'urlA':'javascript:;','btnA':'确定','urlB':'javascript:;','btnB':'取消','classA':'fcBtn_tj','classB':'fcBtn_close'};
	this.getContainerDiv = function(){
		var html = "";
		html += '<section class="alertMain" id="'+this.id+'" style="text-align:center;">';	
		html += '	<div class="alertcon" id="alertcon">';
		
		if(this.is_show_head == 1){
			html += this.getHeadDiv();
		}
		if(this.is_show_content == 1){
			html += this.getContentDiv();
		}
		if(this.is_show_foot == 1){
			html += this.getFooterDiv(this.footConfig);
		}

		html += '	</div>';
		html += '</section>';

		return html;
	};

	this.getHeadDiv = function(){
		var html = "";
		html += '<div class="alertTop">';
		html += '	<p>'+this.title+'</p>';
		html += '	<a href="javascript://"  class="alertTopClose">×</a>';
		html += '</div>';
		return html;
	};

	this.getContentDiv = function(){
		var html = "";
		html += '<div class="alertCenter">';
		html += '	<p>'+ this.message +'</p>';
		html += '</div>';
		return html;
	};

	this.setCss = function(){
		if(this.is_show_head != 1 && this.is_show_foot != 1){//主动弹窗且没有顶部和底部，表示这个是提示弹窗
			$("#alertcon .alertCenter").remove();
			$("#alertcon").text(this.message);
			$("#alertcon").attr("class","alertcon1");
			$(".alertTop, .alertCenter").css('border-bottom','none');
		}
	}

	this.getFooterDiv = function(obj){
		var html = "";
		html +=  '<div class="alertFooter"> ';
		html +=  '	<a href="'+obj.urlA+'" class="'+obj.classA+'">'+obj.btnA+'</a>';
		html +=  '	<a href="'+obj.urlB+'" class="'+obj.classB+'">'+obj.btnB+'</a>';
		html +=  '</div>';
		return html;
	};

	this.addContainer = function(){
		var container = this.getContainerDiv();
		$("body").append(container);
	};

	this.colose = function(){
		if(this.is_show_head == 1){
			$(".alertTopClose").click(function(){
				$(".alertMain").css('display','none');
			})
		}
		if(this.is_show_foot == 1){
			$(".fcBtn_close").click(function(){
				$(".alertMain").css('display','none');
			})
		}
		if(this.is_show_head != 1 && this.is_show_foot != 1){
			$("body").click(function(event) {
				 if(event.target.className == 'alertMain'){
				 	$(".alertMain").css('display','none');
				 }
			});
		}
		
	};

	this.destory = function(){
		if(this.auto_destory == 1){
			setTimeout(
				function () {
				 	$(".alertMain").remove();
				}, 
				this.auto_time
			);
		}
	};

	this.doAlert = function(){
		this.addContainer();
		this.setCss();
		this.colose();
		this.destory();
	};
	//自动调用构造函数
	this.doAlert();
}
