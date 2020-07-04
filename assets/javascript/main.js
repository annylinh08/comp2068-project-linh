document.addEventListener("DOMContentLoaded", () => {
    $('.summernote').summernote({
      placeholder: 'Write your description here...',
      tabsize: 2,
      height: 350
    });
  });

  $(function () {
    $(".fa-heart").click(function () { 
              $(this).toggleClass("checked");
          });
  });