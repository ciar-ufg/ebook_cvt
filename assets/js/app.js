jQuery(document).ready(function($) {
	var cabecalho = $('#cabecalho');
	var menu = $('#navpaginas');
	var menufixo = $('#navpaginas-fixo');
	var janela = $(window);
	var menu_top = menu.offset().top;
	var menu_bottom = menu_top+menu.height();
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

	var timeline = $('.timeline');

	if (timeline.length > 0) {

		var containerTextos = timeline.find('.textos');
		var scrollerTextos = containerTextos.find('.scroller');
		var tablesTextos = scrollerTextos.find('table.item');
		var containerBotoes = timeline.find('.tempos');
		var scrollerBotoes = containerBotoes.find('.scroller');
		var timelineBotoes = scrollerBotoes.find('button');

		var tempoAtual = 0;

		var crossBrowserTransform = function(valor){
			return {
				'-webkit-transform': valor,
				    '-ms-transform': valor,
				        'transform': valor
			};
		}
		
		var atualizarTempo = function(){
			var botaoAtual = timelineBotoes.eq(tempoAtual);
			timelineBotoes.removeClass('ativo traco-ativo');
			botaoAtual.addClass('ativo');
			var posScrollerBt = scrollerBotoes.width()/2 - botaoAtual.position().left - botaoAtual.outerWidth()/2 ;
			scrollerBotoes.css(crossBrowserTransform('translateX('+posScrollerBt+'px)'));

			for(i = 0; i < tempoAtual; i++){
				timelineBotoes.eq(i).addClass('traco-ativo');
			}

			var textoAtual = tablesTextos.eq(tempoAtual);
			tablesTextos.removeClass('ativo');
			textoAtual.addClass('ativo');
			var posScrollerTexto = scrollerTextos.width()/2 - textoAtual.position().left - textoAtual.outerWidth()/2 ;
			scrollerTextos.css(crossBrowserTransform('translateX('+posScrollerTexto+'px)'));
		}

		timelineBotoes.on('click', function(event) {
			tempoAtual = timelineBotoes.index($(this));
			atualizarTempo();
		});

		atualizarTempo();
	}
});