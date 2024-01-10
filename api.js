// Server Setup
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080

// Routes
app.listen(PORT, () => {
    console.log(`Express is listening on port ${PORT}`)
});

app.get('/', (req, res) => {
    res.send('<h1>Hello, Express!</h1>')
})

app.get('/api/v1/dstwindow', (req, res) => {
    const message = getDstWindowMessage(req.query.year);
    res.send(message)
})

app.get('/api/v1/isDst', (req, res) => {
    const day = req.query.day;
    const month = parseInt(req.query.month);
    const year = req.query.year;
    const message = isDst(day, month, year);
    console.log('Someone is using your api! ;)');
    res.send(message);
})

// Logic
function getDstStart(year) {
    const firstDayOfMarch = new Date(year, 2, 1);
    const dayOfWeek = firstDayOfMarch.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const firstSundayDate = new Date(firstDayOfMarch);
    firstSundayDate.setDate(1 + daysUntilSunday);
    const secondSundayDate = new Date(firstSundayDate);
    secondSundayDate.setDate(firstSundayDate.getDate() + 7);

    return secondSundayDate;
  };

function getDstEnd(year) {
    const firstDayOfNovember = new Date(year, 10, 1);
    const dayOfWeek = firstDayOfNovember.getDay();
    const daysUntilSunday = (7 - dayOfWeek) % 7;
    const firstSunday = new Date(firstDayOfNovember);
    firstSunday.setDate(1 + daysUntilSunday);
    firstSunday.setHours(2);

    return firstSunday
}

function getDstWindowMessage(year) {
    const dstStartDate = getDstStart(year)
    const dstEndDate = getDstEnd(year)
    const message = `In ${year}, Daylight Saving Time begins at 2:00 AM on ${dstStartDate.toDateString()}
                     and ends at 2:00 AM on ${dstEndDate.toDateString()}.`

    return message
}

function isDst(day, month, year) {
    const date = new Date(year, month - 1, day);
    const dstStart = getDstStart(year)
    const dstEnd = getDstEnd(year)

    const dateInDst  = date >= dstStart && date <= dstEnd ? true : false

    return dateInDst

    // const message = dateInDst ? 'is in Daylight Saving Time' : 'is not in Daylight Saving Time'

    // return `You passed in ${date.toDateString()}. <br /> In ${date.getFullYear()}, Daylight Saving Time starts on ${dstStart.toDateString()} and ends on ${dstEnd.toDateString()}.
    //         <br /> This date ${message}.`
}
