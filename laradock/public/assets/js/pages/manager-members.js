/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./resources/js/pages/manager-members.js ***!
  \***********************************************/
function ManagerMembers() {
  "use strict";

  var self = this;
  self.init();
}

ManagerMembers.prototype.init = function () {
  "use strict";

  var self = this;
  window.table.on('click', '.activate-deactivate-member', function () {
    var btn = $(this);
    var data = {
      type: 'set-team-member-enabling',
      id_team_member: $(this).data("user-id")
    };

    if ("0" == $(this).attr('data-active')) {
      if (!confirm("Sei sicuro di voler attivare il membro all'interno del team?")) return;
    } else {
      if (!confirm("Sei sicuro di voler disattivare il membro all'interno del team?")) return;
    }

    self.makeRequest(data, function (json) {
      btn.toggleClass("btn-danger", false).toggleClass("btn-success", false);

      if (btn.attr("data-active") == "1") {
        btn.toggleClass("btn-success", true);
      } else {
        btn.toggleClass("btn-danger", true);
      }

      btn.text((btn.hasClass("btn-danger") ? 'Disattiva' : 'Attiva') + ' membro');
      btn.attr("data-active", btn.attr("data-active") == "1" ? 0 : 1);
    });
  });
  window.table.on('click', '.edit-user', function () {
    $("#editUserModal [name='team-member']").val($(this).data("user-id"));
    $("#editUserModal [name='firstname']").val($(this).data("firstname"));
    $("#editUserModal [name='lastname']").val($(this).data("lastname"));
    $("#editUserModal [name='name']").val($(this).data("username"));
    $("#editUserModal").modal('show');
  });
  $("[data-no-slots]").off('click');
  self.saveNewTeamMember();
  self.saveNewPasswordTeamMember();
  self.initRadomizerPassword();
  self.initPasswordRevealEditPassword();
};

ManagerMembers.prototype.saveNewPasswordTeamMember = function () {
  "use strict";

  var self = this;
  $(".save-edit-team-member").off('click').click(function () {
    self.makeRequest({
      type: 'edit-member',
      id_user: $("#editUserModal [name='team-member']").val(),
      name: $("#editUserModal [name='name']").val(),
      firstname: $("#editUserModal [name='firstname']").val(),
      lastname: $("#editUserModal [name='lastname']").val(),
      password: $("#editUserModal [type='password']").val()
    }, function (json) {
      alert(json.status == 200 ? "Membro aggiornato con successo" : "Una delle informazioni del membro risultano già presenti nel sistema");
      window.location.reload();
    });
  });
};

ManagerMembers.prototype.makeRequest = function (params, callback) {
  "use strict";

  $.get('/api/controller', params, callback);
};

ManagerMembers.prototype.saveNewTeamMember = function () {
  "use strict";

  var self = this;
  $(".save-new-member").click(function () {
    var isEmpty = false;
    $("#memberModal input").each(function () {
      if ($(this).val().length == 0) isEmpty = true;
    });
    if ($("[name='email']").val() != $("[name='repeat_email']").val() || isEmpty) return;
    $("#memberModal form").submit();
  });
};

ManagerMembers.prototype.initRadomizerPassword = function () {
  "use strict";

  var self = this;
  $("#randomizerPasswordAdd, #randomizerPasswordEdit").click(function () {
    $("[name='password']").val(Math.random().toString(36).slice(-8));
  });
};

ManagerMembers.prototype.initPasswordRevealEditPassword = function () {
  "use strict";

  var self = this;
  $("#password-addon2").click(function () {
    $(this).parent().find("input").attr('type', $(this).parent().find("input").attr('type') == 'password' ? 'input' : 'password');
  });
};

$(document).ready(function () {
  "use strict";

  new ManagerMembers();
});
/******/ })()
;