$(function(){
	for(var i = 0;i<9;i++){
			$.each(headerList,function(index,data){
				var str = `<li>
							<span class="border r"></span>
							<a href="#" class="list">${data.title}</a>
							<p class="sList">
								<a href="#">${data.t1}</a>
								<a href="#">${data.t2}</a>
								<a href="#">${data.t3}</a>
							</p>
							<div class="navInfoContentHover">
								<div class="navHoverInfo l">
									<div class="navHoverInfoTi">
										<span>${data.title}</span>
							</div>
						</li>`
				console.log(str)
				var oh = $(str)
				$('.leftMenu').append(oh);
			})
	}
})
