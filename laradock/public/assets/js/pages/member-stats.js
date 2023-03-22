/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!********************************************!*\
  !*** ./resources/js/pages/member-stats.js ***!
  \********************************************/
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function MemberStats() {
  "use strict";

  var self = this;
  self.chart = {};
  self.init();
}

MemberStats.prototype.init = function () {
  "use strict";

  var self = this;
  setTimeout(function () {
    window.table.destroy();
    window.LicensesOBJ.helpers.initTable("#datatable");
    window.LicensesOBJ.helpers.initTable("#datatableLogged");
    window.tables['#datatable'].on('click', '.btn-primary', function () {
      var logs = $(this).data('logs');
      $("#statModal").modal('show');
      $("#statModal .stats-user-name").text($(this).data('user-name'));
      self.initChart("Video visualizzati", self.getLabels(logs), self.getData(logs));
      self.initSearchDateStatsModal($(this).data('id-user'));
    });
    self.initSearchAccesLogList();
    self.initSearchAvgPlayback();
    self.initSearchVideoCompleted();
    self.initSearchVideoCompletedToday();
  }, 1000);
};

MemberStats.prototype.getData = function (logs, startSelector, endSelector) {
  "use strict";

  var self = this;
  var data = [];
  logs.map(function (item, i) {
    var key = item.created_at.split(":")[0].replace("T", " ") + ":00";
    key = key.split(" ")[0];

    if (item.data_chart) {
      if (!data[key]) {
        data[key] = item.data_chart;
      }
    } else {
      if (!data[key]) {
        data[key] = 0;
      }

      data[key] += 1;
    }
  });
  var start = moment($(startSelector).val(), "YYYY-MM-DD");
  var end = moment($(endSelector).val(), "YYYY-MM-DD");
  var diffDays = Math.abs(moment.duration(start.diff(end)).asDays());
  var keys = Object.keys(data);

  if (!isNaN(diffDays)) {
    for (var i = 0; i < diffDays; i++) {
      var date = start.format('YYYY-MM-DD');

      if (keys.indexOf(date) == -1) {
        data[date] = 0;
      }

      start = start.add(1, 'days');
    }
  }

  data = Object.keys(data).sort().reduce(function (obj, key) {
    obj[key] = data[key];
    return obj;
  }, {});
  return Object.values(data);
};

MemberStats.prototype.getLabels = function (logs, startSelector, endSelector) {
  "use strict";

  var self = this;
  var labels = [];
  logs.map(function (item, i) {
    var key = item.created_at.split(":")[0].replace("T", " ") + ":00";
    labels[key.split(" ")[0]] = 1;
  });
  var start = moment($(startSelector).val(), "YYYY-MM-DD");
  var end = moment($(endSelector).val(), "YYYY-MM-DD");
  var diffDays = Math.abs(moment.duration(start.diff(end)).asDays());
  var keys = Object.keys(labels);

  if (!isNaN(diffDays)) {
    for (var i = 0; i < diffDays; i++) {
      var date = start.format('YYYY-MM-DD');

      if (keys.indexOf(date) == -1) {
        labels[date] = 1;
      }

      start = start.add(1, 'days');
    }
  }

  keys = Object.keys(labels);
  return keys.sort();
};

MemberStats.prototype.initChart = function (label, labels, data, selector, jsonResponse, avoidSteps, startFromOnlyPositive) {
  "use strict";

  var self = this;
  console.log(data);
  console.log(Math.max.apply(Math, _toConsumableArray(data)));
  selector = selector || "#lineChart";
  var t = $(selector).get(0).getContext("2d");

  if (self.chart[selector]) {
    self.chart[selector].destroy();
  }

  labels = ['0'].concat(_toConsumableArray(labels));
  data = [0].concat(_toConsumableArray(data));
  console.log(data);
  var dataChart = {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: label,
        fill: !0,
        lineTension: .5,
        backgroundColor: "rgba(85, 110, 230, 0.2)",
        borderColor: "#556ee6",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0,
        borderJoinStyle: "miter",
        pointBorderColor: "#556ee6",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#556ee6",
        pointHoverBorderColor: "#fff",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: data
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            callback: function callback(value, index, ticks) {
              return value; //jsonResponse && jsonResponse[index] ? jsonResponse[index].data_chart_label : value;
            }
          }
        }]
      },
      legend: {
        onClick: function onClick(e) {
          return e.stopPropagation();
        }
      },
      tooltips: {
        enabled: true
      }
    }
  };

  if (!avoidSteps) {
    dataChart.options.scales.yAxes[0].ticks.max = Math.max.apply(Math, _toConsumableArray(data)) + 5;
    dataChart.options.scales.yAxes[0].ticks.min = startFromOnlyPositive ? 0 : -10; //Math.min(...data)

    dataChart.options.scales.yAxes[0].ticks.stepSize = 5;
  } else {
    dataChart.options.tooltips.enabled = false;

    dataChart.options.scales.yAxes[0].ticks.callback = function (value, index, ticks) {
      return index == ticks.length - 1 ? '0' : jsonResponse && jsonResponse[index] ? jsonResponse[index].data_chart_label : '';
    };
  }

  self.chart[selector] = new Chart(t, dataChart);
};

MemberStats.prototype.initRangeDateSearch = function (selector, selectorRangeStart, selectorRangeEnd, route, callback, id_member) {
  "use strict";

  var self = this;
  $(selector).off('click').click(function (e) {
    var data = {
      id_user: $("[data-id-manager]").data("id-manager"),
      type: route,
      start: $(selectorRangeStart).val(),
      end: $(selectorRangeEnd).val()
    };

    if (id_member || $(selector).parent().parent().find(".member").length) {
      data['id_member'] = id_member || $(selector).parent().parent().find(".member").val();
    }

    self.makeRequest(data, callback);
  });
  $(selector).parent().parent().find(".select-period").change(function (e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    $(selectorRangeStart).parent().toggleClass("d-none", $(this).val() != -1);

    if ($(this).val() != -1) {
      $(selectorRangeStart).val($(this).val().split("|")[0]);
      $(selectorRangeEnd).val($(this).val().split("|")[1]);
      $(this).parent().parent().find("button").trigger('click');
    }
  });
};

MemberStats.prototype.makeRequest = function (params, callback) {
  "use strict";

  var self = this;
  window.LicensesOBJ.api.makeGetRequest(params, callback);
};

MemberStats.prototype.initSearchAccesLogList = function () {
  "use strict";

  var self = this;
  self.initRangeDateSearch(".search-range-date-access", ".search-range-date-access-start", ".search-range-date-access-end", 'get-access-log', function (json) {
    window.tables['#datatableLogged'].destroy();
    $("#datatableLogged tbody").empty();
    json.content.map(function (item, i) {
      $("#datatableLogged tbody").append(['<tr>', '<td>', item.name, '</td>', '<td>', item.tot, '</td>', '<td>', '<button class="btn btn-primary" data-user-name="', item.name, '" data-id-user="', item.id, '">Visualizza i dettagli</button>', '</td>', '</tr>'].join(""));
    });
    window.LicensesOBJ.helpers.initTable("#datatableLogged");
    window.tables['#datatableLogged'].on('click', '.btn-primary', function () {
      var id_user = $(this).data('id-user');
      $("#tableModal").modal('show');
      $("#tableModal .stats-user-name").text($(this).data('user-name'));
      self.makeRequest({
        type: 'get-access-log-details',
        id_user: id_user,
        start: $(".search-range-date-access-start").val(),
        end: $(".search-range-date-access-end").val()
      }, function (json) {
        try {
          window.tables['#datatableModal'].destroy();
        } catch (e) {}

        $("#datatableModal tbody").empty();
        json.content.map(function (item, i) {
          $("#datatableModal tbody").append(['<tr>', '<td>', item.name, '</td>', '<td>', item.created_at, '</td>', '</tr>'].join(""));
        });
        window.LicensesOBJ.helpers.initTable("#datatableModal");
      });
    });
    setTimeout(function () {
      $("#datatableLogged_wrapper").toggleClass('d-none', json.content.length == 0);
      $("#noStatsLogged").toggleClass('d-none', json.content.length != 0);
    }, 400);
  });
  setTimeout(function () {
    $(".search-range-date-access").trigger('click');
  }, 1000);
};

MemberStats.prototype.initSearchAvgPlayback = function () {
  "use strict";

  var self = this;
  self.initRangeDateSearch(".search-range-date-avg", ".search-range-date-avg-start", ".search-range-date-avg-end", 'get-avg-playback', function (json) {
    var avg = json.content.formatted || 0;
    $(".avg-time-watch").text(avg);
    $("#avgWatchTime").toggleClass('d-none', avg == 0);
    $("#noAvgWatchTime").toggleClass('d-none', avg != 0);
    self.initChart("", self.getLabels(json.content.history, ".search-range-date-avg-start", ".search-range-date-avg-end"), self.getData(json.content.history, ".search-range-date-avg-start", ".search-range-date-avg-end"), "#lineChartAvgTimeWatch", json.content.history, true);
  });
  setTimeout(function () {
    $(".search-range-date-avg").trigger('click');
  }, 1000);
};

MemberStats.prototype.initSearchVideoCompleted = function () {
  "use strict";

  var self = this;
  self.initRangeDateSearch(".search-range-date-video-completed", ".search-range-date-video-completed-start", ".search-range-date-video-completed-end", 'get-avg-playback-completed', function (json) {
    $(".avg-video-completed").text(json.content.formatted.toFixed(2));
    $("#noAvgVideoCompleted").toggleClass('d-none', json.content.formatted != null && parseFloat(json.content.formatted) != 0);
    $("#avgVideoCompleted").toggleClass('d-none', !(json.content.formatted != null && parseFloat(json.content.formatted) != 0));
    lineChartAvgCompleted;
    self.initChart("", self.getLabels(json.content.history, ".search-range-date-video-completed-start", ".search-range-date-video-completed-end"), self.getData(json.content.history, ".search-range-date-video-completed-start", ".search-range-date-video-completed-end"), "#lineChartAvgCompleted", json.content.history, false, true);
  });
  setTimeout(function () {
    $(".search-range-date-video-completed").trigger('click');
  }, 1000);
};

MemberStats.prototype.initSearchDateStatsModal = function (id_member) {
  "use strict";

  var self = this;
  self.initRangeDateSearch(".search-range-date-chart", ".search-range-date-chart-start", ".search-range-date-chart-end", 'get-user-logs-activity', function (json) {
    self.initChart("", self.getLabels(json.content, ".search-range-date-chart-start", ".search-range-date-chart-end"), self.getData(json.content, ".search-range-date-chart-start", ".search-range-date-chart-end"), null, null, false, true);
  }, id_member);
  setTimeout(function () {
    $(".search-range-date-chart").trigger('click');
  }, 1000);
};

MemberStats.prototype.initSearchVideoCompletedToday = function (id_member) {
  "use strict";

  var self = this;
  self.initRangeDateSearch(".search-range-date-video-completion", ".search-range-date-video-completion-start", ".search-range-date-video-completion-end", 'get-user-video-completed-today', function (json) {
    window.tables['#datatable'].destroy();
    $("#datatable tbody").empty();
    json.content.map(function (item, i) {
      $("#datatable tbody").append(['<tr>', '<td>', item.user.name, '</td>', '<td>', item.user.logs_video_completed_logs.length, '</td>', '<td>', '<button class="btn btn-primary" data-user-name="', item.user.name, '" data-id-user="', item.user.id, '" data-logs=\'', JSON.stringify(item.user.logs_video_completed_logs), '\'>Visualizza i dettagli</button>', '</td>', '</tr>'].join(""));
    });
    window.LicensesOBJ.helpers.initTable("#datatable");
    /*window.tables['#datatable'].on('click', '.btn-primary', function () {
      var id_user = $(this).data('id-user');
      $("#tableModal").modal('show');
      $("#tableModal .stats-user-name").text($(this).data('user-name'));
         window.LicensesOBJ.helpers.initTable("#datatableModal");
    });*/
  }, id_member);
  setTimeout(function () {
    $(".search-range-date-video-completion").trigger('click');
  }, 1000);
};

$(document).ready(function () {
  new MemberStats();
});
/******/ })()
;