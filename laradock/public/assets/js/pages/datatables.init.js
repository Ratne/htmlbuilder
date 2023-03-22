/******/ (function() { // webpackBootstrap
var __webpack_exports__ = {};
/*!***********************************************!*\
  !*** ./resources/js/pages/datatables.init.js ***!
  \***********************************************/
$(document).ready(function () {
  window.table = $("#datatable").DataTable({
    language: {
      url: '//cdn.datatables.net/plug-ins/1.11.4/i18n/it_it.json'
    },
    "columnDefs": [{
      "width": "10%",
      "targets": $(".datatable-notif").length ? 0 : 1
    }],
    "lengthMenu": [[10, 25, 50, 100], [10, 25, 50, 100]],
    "pageLength": 25
  }), $("#datatable-buttons").DataTable({
    lengthChange: !1,
    buttons: ["copy", "excel", "pdf", "colvis"]
  }).buttons().container().appendTo("#datatable-buttons_wrapper .col-md-6:eq(0)"), $(".dataTables_length select").addClass("form-select form-select-sm");
});
/******/ })()
;