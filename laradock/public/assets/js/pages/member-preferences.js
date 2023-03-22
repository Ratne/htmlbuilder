/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!**************************************************!*\
  !*** ./resources/js/pages/member-preferences.js ***!
  \**************************************************/
function MemberPreferences() {
  "use strict";

  var self = this;
  self.init();
}

MemberPreferences.prototype.init = function () {
  "use strict";

  var self = this;
  self.handleCheckWithSubSelection();
  self.initSelectHowManyTimeVideo();
  self.handleReminderInDayHour();
};

MemberPreferences.prototype.handleCheckWithSubSelection = function () {
  "use strict";

  var self = this;
  $("[type='checkbox']").change(function () {
    if ($(this).parent().hasClass("check-with-subselection")) {
      $(this).parent().next().toggleClass("d-none");

      if ($(this).parent().next().hasClass('d-none')) {
        $(this).parent().next().find("input").prop('checked', false);
      }
    }
  });
};

MemberPreferences.prototype.initSelectHowManyTimeVideo = function () {
  "use strict";

  var self = this;
  $("[name='team-member-notif-no-video-seen-video-time']").change(function (e) {
    if ($("[name='team-member-notif-no-video-seen-video-time-period']").is(':checked') && $(this).val() > 3) {
      e.preventDefault();
      e.stopImmediatePropagation();
      alert("Non puoi selezionare più di 3 video se hai impostato i video come giornalieri");
      $(this).val(3);
    }
  });
  $("[name='team-member-notif-no-video-seen-video-time-period']").change(function () {
    $("[name='team-member-notif-no-video-seen-video-time']").trigger('change');
  });
};

MemberPreferences.prototype.handleReminderInDayHour = function () {
  "use strict";

  var self = this;
  $("[name='team-member-reminder-in-day']").change(function () {
    $("[name='team-member-reminder-in-day-hour[]']").remove();

    for (var i = 0; i < parseInt($(this).val(), 10); i++) {
      $(".add-hour-for-notif-container").append('<input type="time" class="form-control w-lg-50 mb-2" name="team-member-reminder-in-day-hour[]" value="00:00">');
    }
  });
};

$(document).ready(function () {
  new MemberPreferences();
});
/******/ })()
;