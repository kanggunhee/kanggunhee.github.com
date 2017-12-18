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
