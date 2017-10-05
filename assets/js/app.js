jQuery(document).ready(function($) {
	var cabecalho = $('#cabecalho');
	var menu = $('#navpaginas');
	var menufixo = $('#navpaginas-fixo');
	var janela = $(window);

	var menu_top = menu.offset().top;
	var menu_bottom = menu_top+menu.height();
	console.log(menu_bottom);

	var scrollAtual = janela.scrollTop();

	janela.on('scroll', function(event) {
		var thisScroll = $(this).scrollTop();
		if (thisScroll > scrollAtual) {
			if (thisScroll > menu_bottom) {
				menufixo.removeClass('dn visivel');
			} else{
				menufixo.addClass('dn');
			}
		} else if (thisScroll < scrollAtual){
			if (thisScroll > menu_top) {
				menufixo.addClass('visivel');
			} else{
				menufixo.removeClass('visivel').addClass('dn');
			}
		}
		scrollAtual = thisScroll;
	});
});