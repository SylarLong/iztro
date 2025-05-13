const { astro } = require("iztro");
const result = astro.bySolar("1991-07-21", 3, "男", true, "vi-VN");
console.log(JSON.stringify(result, null, 2));
