console.log('my-note app.js');
(function($, global, app){
  var $memoField = $('textarea#memo');

  $('.btn-newnote').on('click', function(){
    app.view.clear();
  });
  $('.btn-savenote').on('click', function(){
    app.view.saveMemo();
  });
  $('.btn-download').on('click', function(){
    app.view.download();
  });
  $('.btn-fullscreen').on('click', function(e){
    if (screenfull.enabled)
      screenfull.toggle();
  });
  $('.btn-about').on('click', function(){
    app.view.aboutModal();
  });

  // //처음 로딩시에 기존에 저장된 데이터 가져와서 보여주기
  var initData = app.util.storage.load();
  if(initData) {
    console.log(initData)
    app.view.set( initData );
  }
})(jQuery, window, Note);