let capture;
// webカメラのロードフラグ
let videoDataLoaded = false;

let handsfree;

const circleSize = 12;

const targetIndex = [4, 8, 12, 16, 20];
const palette = ["#C05AF2", "#F25A97", "#F25AF2", "#8E5AF2", "#F2635A"];

function setup() {
  // webカメラの映像を準備
  capture = createCapture(VIDEO);

  // 映像をロードできたらキャンバスの大きさを設定
  capture.elt.onloadeddata = function () {
    videoDataLoaded = true;
    createCanvas(capture.width, capture.height);
  };

  // 映像を非表示化
  capture.hide();

  // handsfreeのhandモデルを準備
  handsfree = new Handsfree({
    showDebug: false,
    hands: true
  });

  // handsfreeを開始
  handsfree.start();
}

function draw() {
  // 映像を左右反転させて表示
  push();
  translate(width, 0);
  scale(-1, 1);
  image(capture, 0, 0, width, height);
  pop();

  // 手の頂点を表示
  drawHands();
}

function drawHands() {
  const hands = handsfree.data?.hands;

  // 手が検出されなければreturn
  if (!hands?.multiHandLandmarks) return;

  // 手の数だけlandmarkの地点にcircleを描写
  hands.multiHandLandmarks.forEach((hand, handIndex) => {
    hand.forEach((landmark, landmarkIndex) => {
      // 指先だけ色を変更
      switch (landmarkIndex) {
        case 4:
          fill(palette[0]);
          break;
        case 8:
          fill(palette[1]);
          break;
        case 12:
          fill(palette[2]);
          break;
        case 16:
          fill(palette[3]);
          break;
        case 20:
          fill(palette[4]);
          break;
        default:
          fill(color(255, 255, 255));
      }
      circle(width - landmark.x * width, landmark.y * height, circleSize);
    });
  });
}
