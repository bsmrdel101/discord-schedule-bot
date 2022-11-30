const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('schedule')
    .setDescription('Shows everyone\'s availability'),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle('Schedule')
      .setDescription('Here\'s everyone\'s availability!')
      .setColor(0x4acfcc)
      .addFields(displaySchedule());

      await interaction.reply({
        embeds: [embed]
      });
  }
};

// Returns all the schedule data to display
const displaySchedule = () => {
  const userSchedules = getSchedules();
  const schedule = determineAvailability(userSchedules);
  return schedule;
};

// Return list of avaiable times for each user
const getSchedules = () => {
  const fakeData = [
    {
      name: 'BEAN',
      days: [
        'monday',
      ],
      times: [
        {
          meridiem: 'pm',
          time: { 
            hour: 1,
            min: 0,
          },
        },
      ],
    },
    {
      name: 'Corny',
      days: [
        'monday',
        'tuesday',
        'wednesday',
      ],
      times: [
        {
          meridiem: 'pm',
          time: { 
            hour: 3,
            min: 30,
          },
        },
        {
          meridiem: 'am',
          time: { 
            hour: 12,
            min: 0,
          },
        },
      ],
    },
    {
      name: 'BEAN 2',
      days: [
        'monday',
      ],
      times: [
        {
          meridiem: 'pm',
          time: { 
            hour: 1,
            min: 0,
          },
        },
      ],
    },
    {
      name: 'BEAN 3',
      days: [
        'monday',
        'tuesday',
      ],
      times: [
        {
          meridiem: 'pm',
          time: { 
            hour: 1,
            min: 0,
          },
        },
      ],
    },
  ]
  return fakeData;
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
        users += `- ${user.name}\n`;
      }
    });
    if (isFree) freeDays.push({day: day.day, users: users});
  });
  return freeDays;
};
