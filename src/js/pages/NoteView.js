
(function($, app){
  var $memoField = $('textarea#memo');
  app.view ={
    clear: function(){
      $('textarea#memo').val('');
    },
    saveMemo: function() {
      app.util.storage.save($memoField.val());
    },
    download: function(){
      app.util.downloadText($memoField.val());
    },
    set: function(str){
      $memoField.val(str);
    },
    aboutModal: function(){
      $('#modal-about').modal();
    }
  };
})(jQuery, Note);

