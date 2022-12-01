const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { fetchSchedulesData } = require('../../controllers/scheduleController');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Shows everyone\'s availability'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('Schedule')
      .setDescription('Here\'s the available times!')
      .setColor(0x4acfcc)
      .addFields(await displaySchedule());

      await interaction.reply({
        embeds: [embed]
      });
  }
};

// Returns all the schedule data to display
const displaySchedule = async () => {
  const userSchedules = await getSchedules();
  const schedule = determineAvailability(userSchedules);
  return schedule;
};

// Return list of avaiable times for each user
const getSchedules = async () => {
  const data = await fetchSchedulesData();
  console.log(data);
  return data;
};

// Returns the filtered and formated schedule data
const determineAvailability = (userSchedules) => {
  const schedule = [];
  let days = [{day: 'monday', users: ''}, {day: 'tuesday', users: ''}, {day: 'wednesday', users: ''}, {day: 'thursday', users: ''}, {day: 'friday', users: ''}, {day: 'saturday', users: ''}, {day: 'sunday', users: ''}];
  days = handleAvailableDays(days, userSchedules); // Filter available days

  days.forEach((day) => {
    schedule.push({ name: day.day, value: day.users });
  });
  return schedule;
};

const handleAvailableDays = (days, userSchedules) => {
  const freeDays = [];
  days.forEach((day) => {
    let isFree = true;
    let users = '';
    userSchedules.forEach((user) => {
      if (!user.days.includes(day.day)) {
        isFree = false;
      } else {
        // User text that will be displayed
        users += `- ${user.name} (${displayUserTimes(user.times)})\n`;
      }
    });
    if (isFree) freeDays.push({day: day.day, users: users});
  });
  return freeDays;
};

const displayUserTimes = (times) => {
  let timeText = '';
  times.forEach((time, i) => {
    timeText += `${time.hour}:${numIsTwoDigits(time.min) ? 0 : ''}${time.min} ${time.meridiem}${addComma(times, i)}`;
  });
  return timeText;
};



const numIsTwoDigits = (num) => {
  let str = num.toString();
  return str.length === 1 ? true : false;
};

// Takes in array and current iteration
// Returns comma and space if it's not the last item in the array
const addComma = (arr, i) => {
  return i+1 === arr.length ? '' : ', ';
};
