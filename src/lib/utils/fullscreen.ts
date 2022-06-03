export default function toggleFullscreen() {
  if (
    ((document as any).fullScreenElement &&
      (document as any).fullScreenElement !== null) ||
    (!(document as any).mozFullScreen && !(document as any).webkitIsFullScreen)
  ) {
    if ((document as any).documentElement.requestFullScreen) {
      (document as any).documentElement.requestFullScreen();
    } else if ((document as any).documentElement.mozRequestFullScreen) {
      /* Firefox */
      (document as any).documentElement.mozRequestFullScreen();
    } else if ((document as any).documentElement.webkitRequestFullScreen) {
      /* Chrome, Safari & Opera */
      (document as any).documentElement.webkitRequestFullScreen(
        (Element as any).ALLOW_KEYBOARD_INPUT
      );
    } else if ((document as any).msRequestFullscreen) {
      /* IE/Edge */
      (document as any).documentElement.msRequestFullscreen();
    }
  } else {
    if ((document as any).cancelFullScreen) {
      (document as any).cancelFullScreen();
    } else if ((document as any).mozCancelFullScreen) {
      /* Firefox */
      (document as any).mozCancelFullScreen();
    } else if ((document as any).webkitCancelFullScreen) {
      /* Chrome, Safari and Opera */
      (document as any).webkitCancelFullScreen();
    } else if ((document as any).msExitFullscreen) {
      /* IE/Edge */
      (document as any).msExitFullscreen();
    }
  }
}
