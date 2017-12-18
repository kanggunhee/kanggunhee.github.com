// app 전역
var Note = {
  $wrap: $(document.body),
  storageKey: 'memo'
};


(function(app){

  app.model = {

    id: '',
    title: ''
    

  };
})(Note);


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


// Simple JavaScript Templating
// John Resig - http://ejohn.org/ - MIT Licensed
// http://ejohn.org/blog/javascript-micro-templating/
(function(){
  var cache = {};

  this.tmpl = function tmpl(str, data){
    // Figure out if we're getting a template, or if we need to
    // load the template - and be sure to cache the result.
    var fn = !/\W/.test(str) ?
      cache[str] = cache[str] ||
      tmpl(document.getElementById(str).innerHTML) :

      // Generate a reusable function that will serve as a template
      // generator (and which will be cached).
      new Function("obj",
        "var p=[],print=function(){p.push.apply(p,arguments);};" +

          // Introduce the data as local variables using with(){}
        "with(obj){p.push('" +

          // Convert the template into pure JavaScript
        str
          .replace(/[\r\t\n]/g, " ")
          .split("<%").join("\t")
          .replace(/((^|%>)[^\t]*)'/g, "$1\r")
          .replace(/\t=(.*?)%>/g, "',$1,'")
          .split("\t").join("');")
          .split("%>").join("p.push('")
          .split("\r").join("\\'")
        + "');}return p.join('');");

    // Provide some basic currying to the user
    return data ? fn( data ) : fn;
  };
})();
(function(app) {

  app.util = {
    uniqId: function() {
      return new Date().getTime();
    },
    downloadText: function(text) {
      var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
      saveAs(blob, "memo.txt");
    },
    storage : {
      load: function() {
        return localStorage.getItem(app.storageKey)
      },
      save: function(memo) {
        localStorage.setItem(app.storageKey, memo);
      }
    }
  };
})(Note);

console.log('my-note app.js');
(function($, global, app){
  var $memoField = $('textarea#memo');

  $('.btn-newnote').on('click', ()=>{
    app.view.clear();
  });
  $('.btn-savenote').on('click', ()=>{
    app.view.saveMemo();
  });
  $('.btn-download').on('click', ()=>{
    app.view.download();
  });
  $('.btn-fullscreen').on('click', (e)=>{
    if (screenfull.enabled)
      screenfull.toggle();
  });
  $('.btn-about').on('click', ()=>{
    app.view.aboutModal();
  });

  // //처음 로딩시에 기존에 저장된 데이터 가져와서 보여주기
  var initData = app.util.storage.load();
  if(initData) {
    console.log(initData)
    app.view.set( initData );
  }
})(jQuery, window, Note);