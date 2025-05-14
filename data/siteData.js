const d = new Date();

const [month, date, year] = [d.getMonth(), d.getDate(), d.getFullYear()];

const [hour, minutes, seconds] = [d.getHours(), d.getMinutes(), d.getSeconds()];

const dayOfWeek = d.getDay();

module.exports = { d, month, date, year, hour, minutes, seconds, dayOfWeek }