enum FEATURE {
   None = 0,
   O_BLOOD = 1 << 0, // 轉成10進制會是 1
   BRUNETTE = 1 << 1, // 2
   BROWN_EYE = 1 << 2, // 4
   EAGLE_NOSE = 1 << 3, // 8
   UNIVERSAL_ASIA = BRUNETTE + BROWN_EYE // 6
}

$(function () {
   console.log(FEATURE.UNIVERSAL_ASIA);
});