// Builds public/assets/brand/og-image.png (1200x630 social card) from the logo SVG before `vite build`.
// Pure Node (zlib only), no dependencies. Text lines are pre-outlined Manrope glyphs (font units, y-up).
import fs from 'node:fs';
import zlib from 'node:zlib';
let W = 1200, H = 630;
const SS = 4;
const OUT = 'public/assets/brand/og-image.png';
const T = {"t1":{"s":0.017,"y":440,"c":"#F4EFE2","g":{"R":"M140 0V1440H709Q730 1440 759 1438Q788 1437 815 1432Q932 1414 1011 1352Q1090 1290 1131 1195Q1171 1100 1171 986Q1171 818 1084 696Q997 574 829 543L761 532H318V0ZM997 0 713 586 889 640 1201 0ZM318 701H703Q722 701 746 703Q770 705 793 710Q862 726 905 768Q948 811 969 868Q989 926 989 986Q989 1046 969 1104Q948 1161 905 1204Q862 1246 793 1262Q770 1268 746 1269Q722 1271 703 1271H318Z","e":"M608 -30Q448 -30 330 40Q212 110 146 237Q80 364 80 533Q80 710 145 840Q210 969 326 1040Q443 1110 600 1110Q762 1110 877 1035Q992 960 1049 821Q1107 682 1098 490H919V554Q916 753 838 852Q760 950 606 950Q440 950 355 844Q269 738 269 540Q269 349 355 244Q440 139 600 139Q707 139 786 188Q865 237 910 329L1081 270Q1018 127 891 48Q765 -30 608 -30ZM209 490V633H1007V490Z","a":"M447 -30Q326 -30 244 14Q162 58 121 132Q80 205 80 292Q80 377 112 439Q144 502 204 543Q263 585 345 609Q422 630 517 645Q612 661 710 674Q808 686 894 699L830 662Q832 806 772 875Q712 944 564 944Q466 944 392 899Q318 854 289 755L120 806Q158 948 271 1029Q383 1110 566 1110Q712 1110 818 1058Q924 1005 970 899Q993 849 999 790Q1005 732 1005 668V0H847V259L884 235Q823 104 713 37Q604 -30 447 -30ZM474 119Q570 119 640 153Q711 188 754 244Q797 301 810 368Q824 418 826 479Q828 540 828 574L890 547Q803 534 719 524Q634 512 560 500Q484 488 425 471Q380 457 342 435Q304 412 280 378Q257 344 257 293Q257 248 279 209Q302 169 349 144Q397 119 474 119Z","l":"M160 0V1470H338V0Z","s":"M548 -29Q354 -29 231 56Q108 140 80 292L262 321Q284 233 363 182Q442 130 559 130Q670 130 733 176Q796 222 796 301Q796 346 775 375Q754 404 688 428Q623 454 491 489Q348 527 266 568Q184 608 149 662Q114 716 114 794Q114 889 166 960Q218 1032 311 1071Q404 1110 529 1110Q652 1110 749 1071Q846 1032 905 960Q964 889 976 794L794 761Q781 848 710 898Q640 948 529 951Q424 954 358 914Q293 872 293 803Q293 764 317 736Q342 708 408 683Q475 658 602 626Q744 590 827 547Q910 505 945 447Q980 390 980 306Q980 150 865 60Q750 -29 548 -29Z","t":"M743 0Q646 -20 553 -16Q460 -12 387 22Q314 56 276 130Q244 194 242 259Q239 324 239 408V1380H417V416Q417 350 418 303Q420 256 439 222Q475 158 554 147Q632 136 743 153ZM20 933V1080H743V933Z","period":"M172 0V196H368V0Z","L":"M160 0V1440H338V169H1006V0Z","i":"M160 1271V1455H338V1271ZM160 0V1080H338V0Z","f":"M243 0V1139Q243 1180 247 1224Q250 1268 265 1310Q279 1351 311 1386Q348 1426 392 1444Q436 1462 482 1466Q527 1470 568 1470H705V1322H578Q499 1322 460 1283Q421 1244 421 1167V0ZM60 933V1080H705V933Z","y":"M290 -480 499 88 502 -80 30 1080H217L587 147H523L870 1080H1051L463 -480Z","S":"M651 -30Q498 -30 376 22Q253 74 174 170Q94 266 70 399L254 428Q288 292 399 216Q510 139 660 139Q756 139 835 170Q914 200 960 257Q1006 314 1006 392Q1006 440 989 474Q972 509 944 533Q916 558 880 574Q844 592 805 603L438 712Q378 730 322 757Q266 784 222 826Q178 868 152 926Q126 985 126 1065Q126 1192 192 1283Q258 1374 372 1422Q486 1470 630 1469Q775 1468 890 1418Q1004 1367 1079 1273Q1154 1179 1181 1048L992 1015Q977 1102 926 1166Q874 1230 797 1264Q720 1299 628 1300Q540 1301 468 1272Q398 1242 356 1191Q314 1140 314 1073Q314 1006 352 966Q390 926 445 902Q500 879 554 864L828 785Q875 772 936 749Q998 726 1056 684Q1114 642 1152 574Q1190 506 1190 402Q1190 298 1148 217Q1106 136 1032 81Q958 26 861 -2Q763 -30 651 -30Z","o":"M600 -30Q438 -30 322 43Q206 116 143 245Q80 374 80 541Q80 710 144 839Q208 967 325 1038Q442 1110 600 1110Q762 1110 879 1037Q996 964 1058 836Q1121 708 1121 541Q1121 372 1058 243Q994 114 878 42Q760 -30 600 -30ZM600 139Q768 139 850 251Q932 363 932 541Q932 724 849 832Q766 941 600 941Q487 941 414 890Q340 839 305 749Q269 659 269 541Q269 358 353 249Q437 139 600 139Z","u":"M550 -28Q446 -28 371 5Q297 38 248 93Q199 148 171 215Q143 282 132 352Q120 422 120 483V1080H300V539Q300 463 314 392Q328 320 361 264Q394 207 451 174Q508 141 593 141Q660 141 715 164Q770 186 808 232Q848 278 869 348Q890 418 890 511L1007 475Q1007 318 950 206Q894 93 792 32Q689 -28 550 -28ZM910 0V289H890V1080H1069V0Z","h":"M909 0V541Q909 618 895 688Q882 760 848 816Q814 873 758 906Q702 939 616 939Q549 939 494 916Q440 894 400 848Q362 802 340 732Q319 663 319 569L202 605Q202 762 258 874Q315 987 418 1048Q520 1108 659 1108Q764 1108 838 1075Q912 1042 961 987Q1010 932 1038 865Q1066 798 1078 728Q1089 658 1089 597V0ZM139 0V1440H299V645H319V0Z","F":"M140 0V1440H980V1262H318V809H860V631H318V0Z","r":"M140 0V1080H299V819L273 853Q292 903 322 945Q353 987 391 1014Q432 1048 486 1066Q539 1084 594 1087Q649 1090 697 1080V913Q641 928 574 920Q506 914 450 872Q398 834 369 782Q341 729 330 668Q319 606 319 542V0Z","d":"M564 -30Q413 -30 305 45Q196 120 138 250Q80 379 80 541Q80 703 138 832Q196 960 305 1035Q413 1110 563 1110Q716 1110 820 1036Q924 962 978 833Q1031 704 1031 541Q1031 380 978 250Q924 121 820 46Q716 -30 564 -30ZM586 133Q695 133 765 186Q835 238 868 330Q902 422 902 541Q902 660 868 752Q834 844 766 896Q696 947 591 947Q481 947 410 893Q338 839 304 747Q269 655 269 541Q269 426 304 334Q339 241 409 187Q480 133 586 133ZM902 0V795H882V1440H1061V0Z"},"p":[["R",295.65],["e",318.43],["a",339.51],["l",359.63],["e",376.9],["s",397.98],["t",417.01],["a",432.0],["t",452.13],["e",467.12],["period",488.2],["L",506.18],["i",524.79],["f",534.26],["e",547.58],["s",568.66],["t",587.7],["y",602.69],["l",621.98],["e",631.44],["period",652.52],["S",670.5],["o",692.92],["u",714.34],["t",735.89],["h",750.88],["F",780.23],["l",798.57],["o",808.04],["r",829.46],["i",843.16],["d",852.62],["a",874.04],["period",894.16]]},"t2":{"s":0.01,"y":512,"c":"#C9A24A","g":{"M":"M140 0V1440H357L855 420L1353 1440H1570V0H1345V923L903 0H807L366 923V0Z","I":"M160 0V1440H401V0Z","G":"M734 -30Q594 -30 471 20Q349 69 257 165Q164 261 112 400Q60 540 60 720Q60 956 148 1123Q236 1291 389 1380Q542 1470 734 1470Q1000 1470 1156 1346Q1311 1223 1366 1000L1120 961Q1079 1089 986 1165Q893 1242 749 1242Q604 1244 508 1179Q412 1114 364 996Q315 878 315 720Q315 562 363 446Q411 329 508 264Q604 199 749 197Q858 196 940 236Q1022 277 1074 359Q1126 442 1144 566H890V755H1400Q1402 739 1403 708Q1404 677 1404 671Q1404 467 1323 308Q1243 150 1093 60Q943 -30 734 -30Z","U":"M720 -30Q548 -30 418 40Q287 110 213 237Q140 364 140 535V1438L384 1440V541Q384 460 411 396Q439 332 486 288Q533 243 594 220Q655 197 720 197Q787 197 848 220Q908 244 955 288Q1002 333 1029 397Q1056 461 1056 541V1440H1300V535Q1300 364 1226 237Q1153 110 1022 40Q892 -30 720 -30Z","E":"M140 0V1440H1070V1214H381V859H950V633H381V226H1070V0Z","L":"M160 0V1440H401V226H1037V0Z","P":"M140 0V1440H735Q756 1440 789 1438Q822 1437 850 1432Q975 1413 1057 1349Q1138 1285 1178 1187Q1217 1090 1217 971Q1217 853 1177 755Q1137 658 1056 594Q974 530 850 511Q822 507 789 505Q755 503 735 503H381V0ZM381 728H725Q745 728 770 730Q795 732 816 738Q876 753 910 791Q945 829 959 877Q974 925 974 971Q974 1017 959 1066Q945 1114 910 1152Q876 1190 816 1205Q795 1211 770 1212Q745 1214 725 1214H381Z","R":"M140 0V1440H735Q756 1440 789 1438Q822 1437 850 1432Q975 1413 1057 1349Q1138 1285 1178 1187Q1217 1090 1217 971Q1217 795 1128 668Q1039 542 855 512L752 503H381V0ZM967 0 683 586 928 640 1240 0ZM381 728H725Q745 728 770 730Q795 732 816 738Q876 753 910 791Q945 829 959 877Q974 925 974 971Q974 1017 959 1066Q945 1114 910 1152Q876 1190 816 1205Q795 1211 770 1212Q745 1214 725 1214H381Z","Z":"M100 0V33L810 1214H150V1440H1227V1406L521 227H1210V0Z","periodcentered":"M270 483Q207 483 164 525Q120 567 120 630Q120 693 164 735Q207 777 270 777Q328 777 371 735Q413 693 413 630Q413 567 371 525Q328 483 270 483Z","X":"M20 0 508 728 34 1440H329L657 933L982 1440H1279L805 728L1291 0H996L657 523L317 0Z","O":"M749 -30Q533 -30 379 64Q225 159 142 328Q60 497 60 720Q60 943 142 1112Q225 1281 379 1376Q533 1470 749 1470Q965 1470 1119 1376Q1274 1281 1356 1112Q1439 943 1439 720Q1439 497 1356 328Q1274 159 1119 64Q965 -30 749 -30ZM749 197Q894 196 991 261Q1087 326 1135 444Q1184 562 1184 720Q1184 878 1135 994Q1087 1111 991 1176Q894 1241 749 1243Q604 1244 508 1179Q412 1114 364 996Q315 878 315 720Q315 562 363 446Q411 329 508 264Q604 199 749 197Z","T":"M486 0V1214H20V1440H1193V1214H727V0Z","S":"M673 -30Q515 -30 389 25Q262 80 181 182Q99 285 77 426L327 464Q359 336 458 266Q558 196 688 196Q765 196 833 220Q901 244 944 290Q986 336 986 403Q986 433 976 458Q966 484 947 504Q927 524 897 540Q866 557 826 569L454 679Q406 693 350 716Q295 740 245 781Q196 823 164 887Q133 952 133 1047Q133 1186 203 1280Q274 1375 393 1422Q513 1469 659 1468Q807 1467 923 1417Q1039 1368 1117 1274Q1195 1180 1227 1047L968 1002Q952 1078 907 1131Q861 1185 795 1213Q730 1241 656 1243Q584 1244 522 1222Q461 1199 424 1157Q386 1115 386 1059Q386 1006 418 972Q450 939 498 919Q545 900 594 887L852 815Q905 801 971 777Q1037 753 1098 710Q1159 667 1198 597Q1238 527 1238 419Q1238 307 1192 223Q1145 138 1066 82Q987 26 885 -2Q784 -30 673 -30Z"},"p":[["M",360.4],["I",382.5],["G",393.12],["U",412.75],["E",432.15],["L",448.85],["P",473.52],["E",491.29],["R",507.99],["E",526.19],["Z",542.89],["periodcentered",570.16],["L",589.5],["U",605.16],["X",624.56],["E",642.67],["P",668.38],["R",686.14],["O",704.35],["P",724.34],["E",742.11],["R",758.81],["T",777.01],["I",794.14],["E",804.75],["S",821.45]]}};

function parse(d, tf, polys) {
  const tk = d.match(/[a-zA-Z]|-?\d*\.?\d+(?:e[-+]?\d+)?/g) || [];
  let i = 0, cmd = '', x = 0, y = 0, sx = 0, sy = 0, cur = null;
  const num = () => parseFloat(tk[i++]);
  const pt = (px, py) => { cur.push(tf(px, py)); };
  const cubic = (x1, y1, x2, y2, x3, y3) => {
    const a = tf(x, y), b = tf(x1, y1), c = tf(x2, y2), e = tf(x3, y3);
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) + Math.hypot(c[0] - b[0], c[1] - b[1]) + Math.hypot(e[0] - c[0], e[1] - c[1]);
    const n = Math.max(2, Math.min(64, Math.ceil(len / 1.5)));
    for (let k = 1; k <= n; k++) {
      const t = k / n, u = 1 - t;
      cur.push([u * u * u * a[0] + 3 * u * u * t * b[0] + 3 * u * t * t * c[0] + t * t * t * e[0], u * u * u * a[1] + 3 * u * u * t * b[1] + 3 * u * t * t * c[1] + t * t * t * e[1]]);
    }
    x = x3; y = y3;
  };
  while (i < tk.length) {
    if (/[a-zA-Z]/.test(tk[i])) cmd = tk[i++];
    const rel = cmd === cmd.toLowerCase(), C = cmd.toUpperCase();
    const ox = rel ? x : 0, oy = rel ? y : 0;
    if (C === 'M') { x = ox + num(); y = oy + num(); sx = x; sy = y; cur = []; polys.push(cur); pt(x, y); cmd = rel ? 'l' : 'L'; }
    else if (C === 'L') { x = ox + num(); y = oy + num(); pt(x, y); }
    else if (C === 'H') { x = ox + num(); pt(x, y); }
    else if (C === 'V') { y = oy + num(); pt(x, y); }
    else if (C === 'C') { const a = [ox + num(), oy + num(), ox + num(), oy + num(), ox + num(), oy + num()]; cubic(...a); }
    else if (C === 'Q') { const qx = ox + num(), qy = oy + num(), ex = ox + num(), ey = oy + num(); cubic(x + 2 / 3 * (qx - x), y + 2 / 3 * (qy - y), ex + 2 / 3 * (qx - ex), ey + 2 / 3 * (qy - ey), ex, ey); }
    else if (C === 'Z') { x = sx; y = sy; }
    else { i++; }
  }
}

function coverage(polys) {
  const acc = new Float32Array(W * H), edges = [];
  for (const p of polys) for (let k = 0; k < p.length; k++) {
    const a = p[k], b = p[(k + 1) % p.length];
    if (a[1] !== b[1]) edges.push(a[1] < b[1] ? [a[0], a[1], b[0], b[1], 1] : [b[0], b[1], a[0], a[1], -1]);
  }
  let y0 = H, y1 = 0;
  for (const e of edges) { y0 = Math.min(y0, Math.floor(e[1])); y1 = Math.max(y1, Math.ceil(e[3])); }
  y0 = Math.max(0, y0); y1 = Math.min(H, y1);
  const w = 1 / SS;
  for (let py = y0; py < y1; py++) for (let s = 0; s < SS; s++) {
    const yy = py + (s + 0.5) / SS, xs = [];
    for (const e of edges) if (yy >= e[1] && yy < e[3]) xs.push([e[0] + (yy - e[1]) * (e[2] - e[0]) / (e[3] - e[1]), e[4]]);
    xs.sort((m, n) => m[0] - n[0]);
    let wind = 0, start = 0;
    for (const [xx, d] of xs) {
      const was = wind; wind += d;
      if (was === 0 && wind !== 0) start = xx;
      else if (was !== 0 && wind === 0) span(acc, py * W, start, xx, w);
    }
  }
  return acc;
}
function span(acc, row, x0, x1, w) {
  x0 = Math.max(0, x0); x1 = Math.min(W, x1); if (x1 <= x0) return;
  const i0 = Math.floor(x0), i1 = Math.floor(x1);
  if (i0 === i1) { acc[row + i0] += (x1 - x0) * w; return; }
  acc[row + i0] += (i0 + 1 - x0) * w;
  for (let i = i0 + 1; i < i1; i++) acc[row + i] += w;
  if (i1 < W) acc[row + i1] += (x1 - i1) * w;
}
const rgb = (h) => [1, 3, 5].map((k) => parseInt(h.slice(k, k + 2), 16));
let img = new Float32Array(W * H * 3);
function paint(polys, color, op = 1) {
  const a = coverage(polys), c = rgb(color);
  for (let i = 0; i < W * H; i++) { const v = Math.min(1, a[i]) * op; if (v > 0) for (let k = 0; k < 3; k++) img[i * 3 + k] += (c[k] - img[i * 3 + k]) * v; }
}
const rect = (x, y, w, h) => [[x, y], [x + w, y], [x + w, y + h], [x, y + h]];

function build() {
  const bg = rgb('#0E1416');
  for (let i = 0; i < W * H; i++) for (let k = 0; k < 3; k++) img[i * 3 + k] = bg[k];
  paint([rect(23, 23, 1154, 2), rect(23, 605, 1154, 2), rect(23, 25, 2, 580), rect(1175, 25, 2, 580)], '#C9A24A', 0.45);
  // sfe-logo-light.svg = official ELEVATED logo, dark-background version (teal #027C94, gold arrow #CB9139, white SOUTH FLORIDA + rules).
  const svg = fs.readFileSync('public/assets/brand/sfe-logo-light.svg', 'utf8');
  const S = 860 / 2147.75, X0 = 170, Y0 = 301 - 476.75 * S;
  const tf = (x, y) => [X0 + S * (0.0125 * x - 14.75), Y0 + S * (724 - 0.0125 * y - 91.75)];
  for (const m of svg.matchAll(/<path fill="(#[0-9A-Fa-f]{6})" d="([^"]+)"/g)) { const ps = []; parse(m[2], tf, ps); paint(ps, m[1]); }
  paint([rect(540, 372, 120, 3)], '#C9A24A');
  for (const L of Object.values(T)) {
    const ps = [];
    for (const [g, gx] of L.p) parse(L.g[g], (x, y) => [gx + L.s * x, L.y - L.s * y], ps);
    paint(ps, L.c);
  }
  writePng(OUT);
}
function writePng(OUT) {
  const raw = Buffer.alloc((W * 3 + 1) * H);
  for (let y = 0; y < H; y++) { raw[y * (W * 3 + 1)] = 0; for (let x = 0; x < W * 3; x++) raw[y * (W * 3 + 1) + 1 + x] = Math.max(0, Math.min(255, Math.round(img[y * W * 3 + x]))); }
  const crcT = Array.from({ length: 256 }, (_, n) => { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; return c >>> 0; });
  const crc = (b) => { let c = 0xffffffff; for (const v of b) c = crcT[(c ^ v) & 255] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
  const chunk = (type, data) => { const len = Buffer.alloc(4); len.writeUInt32BE(data.length); const td = Buffer.concat([Buffer.from(type), data]); const cr = Buffer.alloc(4); cr.writeUInt32BE(crc(td)); return Buffer.concat([len, td, cr]); };
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(W, 0); ihdr.writeUInt32BE(H, 4); ihdr[8] = 8; ihdr[9] = 2; ihdr[10] = 0; ihdr[11] = 0; ihdr[12] = 0;
  const png = Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', ihdr), chunk('IDAT', zlib.deflateSync(raw, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
  fs.writeFileSync(OUT, png);
  console.log('[og-image] wrote ' + OUT + ' (' + png.length + ' bytes)');
}
// Favicons (Oct 2026): the official ELEVATED arrow-A on Onyx, rendered from public/favicon.svg at 32 and 180 px.
function buildIcon(size, out) {
  W = size; H = size; img = new Float32Array(W * H * 3);
  const svg = fs.readFileSync('public/favicon.svg', 'utf8');
  const vb = svg.match(/viewBox="([^"]+)"/)[1].split(/\s+/).map(Number);
  const bg = rgb((svg.match(/<rect[^>]*fill="(#[0-9A-Fa-f]{6})"/) || [0, '#0B0B0B'])[1]);
  for (let i = 0; i < W * H; i++) for (let k = 0; k < 3; k++) img[i * 3 + k] = bg[k];
  const S = size / vb[2];
  const tf = (x, y) => [S * (0.0125 * x - vb[0]), S * (724 - 0.0125 * y - vb[1])];
  for (const m of svg.matchAll(/<path fill="(#[0-9A-Fa-f]{6})" d="([^"]+)"/g)) { const ps = []; parse(m[2], tf, ps); paint(ps, m[1]); }
  writePng(out);
}
// Oct 17 2026: OG card now ships as the static public/assets/brand/og-image-v4-2026-10-17.png (new ELEVATED logo v4, raster),
// so the legacy SVG-based og-image.png build is disabled. Favicons below are unchanged.
// try { build(); } catch (e) { console.warn('[og-image] skipped: ' + (e && e.message)); }
// Oct 17 2026 (later): favicons/app icons now ship as static files from Miguel's ELEVATED icon mark (/workspace/brand/icons/elevated-mark-v4-2026-10-17),
// so the arrow-A SVG favicon build is disabled to avoid overwriting them.
// try { buildIcon(32, 'public/favicon-32.png'); buildIcon(180, 'public/apple-touch-icon.png'); } catch (e) { console.warn('[favicon] skipped: ' + (e && e.message)); }
