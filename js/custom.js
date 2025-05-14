$(document).ready(function () {
  // intro 애니메이션 시작 시 스크롤 막기
  $("body").css("overflow", "hidden");

  // intro 애니메이션 처리
  const $circle = $(".follow_circle");
  const $spans = $("#intro h2 span");
  const $intro = $("#intro");

  const maxX = $(window).width() - 400;
  const maxY = $(window).height() - 400;
  const path = [
    { left: 0, top: 0 },
    { left: maxX, top: 0 },
    { left: maxX, top: maxY },
    { left: 0, top: maxY },
    { left: maxX / 2, top: maxY / 2 },
  ];

  let index = 0;

  // intro 페이드인 효과 (2초 동안 페이드인)
  $intro.fadeIn(2000, function () {
    $("body").css("background-color", "rgb(76, 70, 55)");
    $("#intro").css("position", "absolute");
  }); // intro가 페이드인으로 나타납니다.

  function scanMotion() {
    if (index >= path.length) {
      afterScan();
      return;
    }
    const pos = path[index];
    $circle.animate(pos, 1000, "swing", () => {
      index++;
      scanMotion();
    });
  }

  function afterScan() {
    $spans.each(function (i) {
      $(this)
        .delay(i * 600)
        .animate(
          {
            opacity: 0,
            marginLeft: "-50px",
          },
          700
        );
    });

    // intro 애니메이션이 끝난 후 스크롤을 허용
    setTimeout(() => {
      $intro.fadeOut(1000, () => {
        $("body").css("overflow", "auto");
      });
      $circle.css("transform", "scale(3)");
    }, $spans.length * 600 + 1000);
  }

  scanMotion();
});
