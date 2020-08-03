document.addEventListener("DOMContentLoaded", () => {
    $('.summernote').summernote({
      placeholder: 'Write your description here...',
      tabsize: 2,
      height: 350
    });
  });

  // $(function () {
  //   $(".fa-heart").click(function () { 
  //             $(this).toggleClass("checked");
  //         });
  // });

  
  function Toggle() {
    var element, name, arr;
    element = document.getElementById("button-heart");
    name ="checked"
    arr = element.classList.split(" ")
      // btnLove.classList.add("checked")
      if (arr.indexOf(name) == -1) {
        element.className += " " + name;
    }
  }