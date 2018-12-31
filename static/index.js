
'use strict';

$(document).ready(function () {
	$('#name').on('input', function () {
		$('#pick').prop('disabled', $('#name').val().length < 1);
	});
	$('#pick').click(function () {
		$('#pick').text('뽑는 중입니다...');
		$('#pick').prop('disabled', true);
		$.ajax({
			method  : 'GET',
			url     : '/party/' + $('#name').val() + '/presenter',
			dataType: 'json'
		}).done(function (data) {
			if (!data || !data.ok || !data.presenter) {
				$('#pick').text('선물 뽑기');
				$('#pick').prop('disabled', false);

				showMessage('문제가 생겼어요!', String(data.error).trim() + '\n다시 시도해주세요!');
				
				return;
			}
			
			$('#pick').text('뽑았습니다!');
			
			showMessage('축하합니다!', String(data.presenter).trim() + '님에게 선물을 받았습니다!');
		}).fail(function () {
			$('#pick').text('선물 뽑기');
			$('#pick').prop('disabled', false);
			
			showMessage('문제가 생겼어요!', '알 수 없는 오류입니다.\n관리자에게 문의해주세요!');
		});
	});
	$('#alert-close').click(function () {
		$('#alert').css('display', '');
	});
});

$(window).on('load', function () {
	$('#background').css('opacity', '1');
});

function showMessage(title, text) {
	$('#alert-title').text(title);
	$('#alert-text').text(text);
	$('#alert').css('display', 'flex');
}