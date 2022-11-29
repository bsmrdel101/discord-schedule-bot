const { readdirSync } = require('fs');

module.exports = (client) => {
  client.handleComponents = async () => {
    const componentFolders = readdirSync('./src/components');
    componentFolders.forEach((folder) => {
      const componentFiles = readdirSync(`./src/components/${folder}`).filter(
        (file) => file.endsWith('.js')
      );

      const { buttons } = client;

      switch (folder) {
        case 'buttons':
          componentFiles.forEach((file) => {
            const button = require(`../../components/${folder}/${file}`);
            buttons.set(button.data.name, button);
          });
          break;
        default:
          break;
      }
    });
  };
};
