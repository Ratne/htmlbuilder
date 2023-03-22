/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***************************************!*\
  !*** ./resources/js/pages/content.js ***!
  \***************************************/
function Content() {
  "use strict";

  var self = this;
  self.init();
}

Content.prototype.init = function () {
  "use strict";

  var self = this;
  self.secondsWatched = 0;
  self.isCompleted = false;
  self.url = new URLSearchParams(window.location.search);
  self.player = new Vimeo.Player(document.querySelector('iframe'));
  self.getCurrentTime().then(self.setCurrentTime.bind(self));
  self.markVideoCompleted();
  self.scrollVideoListSidebar();
  self.setSidebarHasVideoContainer();
};

Content.prototype.getCurrentTime = function () {
  "use strict";

  var self = this;
  return new Promise(function (resolve, reject) {
    self.makeRequest({
      type: 'get-current-playback-state',
      id_user: $("[data-id-user]").data('id-user'),
      id_content: self.url.get('id_content')
    }, function (json) {
      self.secondsWatched = json.is_completed ? 0 : json.current_state;
      self.isCompleted = json.is_completed;
      console.log(self.isCompleted ? 0 : json.current_state);
      self.player.setCurrentTime(self.isCompleted ? 0 : json.current_state);
      resolve();
    });
  });
};

Content.prototype.setCurrentTime = function () {
  "use strict";

  var self = this;
  self.currentTimeInterval = setInterval(function () {
    self.player.getEnded().then(function (ended) {
      self.player.getPaused().then(function (paused) {
        if (!paused && !ended) {
          self.player.getPlaybackRate().then(function (speed) {
            self.player.getCurrentTime().then(function (seconds) {
              if (seconds >= self.secondsWatched) {
                self.secondsWatched += parseInt(5 * speed);
              }

              console.log("Secondi guardati: " + self.secondsWatched);
              self.makeRequest({
                type: 'set-current-playback-state',
                id_content: self.url.get('id_content'),
                id_user: $("[data-id-user]").data('id-user'),
                duration: self.secondsWatched
              }, function (json) {
                $(".progress-bar").css('width', json.content.progress + '%');
                self.isCompleted = json.is_completed;
              });
            });
          });
        }
      });
    });
  }, 5000);
};

Content.prototype.makeRequest = function (params, callback) {
  "use strict";

  var self = this;
  $.get('/api/controller', params, callback);
};

Content.prototype.markVideoCompleted = function () {
  "use strict";

  var self = this;
  $(".mark-video-completed").click(function () {
    self.makeRequest({
      type: 'mark-video-completed',
      id_content: self.url.get('id_content'),
      id_user: $("[data-id-user]").data('id-user')
    }, function () {
      $(".mark-video-completed").prop('disabled', true).html('Video completato');
    });
  });
};

Content.prototype.scrollVideoListSidebar = function () {
  "use strict";

  var self = this;
  $('.simplebar-content-wrapper').animate({
    scrollTop: $("#scrolla" + ($(window).width() <= 992 ? '_mobile' : '')).offset().top - 150
  }, 500);
};

Content.prototype.setSidebarHasVideoContainer = function () {
  "use strict";

  var self = this;
  $(window).resize(function () {
    if ($("[data-height-auto]").length && $(window).width() > 992) {
      $("[data-height-auto]").css('maxHeight', $(".video-body").height() + "px");
    }
  });
  $(window).trigger('resize');
};

$(document).ready(function () {
  new Content();
});
/******/ })()
;