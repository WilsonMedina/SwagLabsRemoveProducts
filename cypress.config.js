const { defineConfig } = require("cypress");

async function setupNodeEvents(on, config) {
	await addCucumberPreprocessorPlugin(on, config);

	on('task', { downloadFile });

	on(
		'file:preprocessor',
		createBundler({
			plugins: [createEsbuildPlugin(config)],
		})
	);
	return config;
}

module.exports = defineConfig({
  	projectId: '',
		viewportWidth: 1280,
		viewportHeight: 720,
		watchForFileChanges: false,
		chromeWebSecurity: false,
		reporterOptions: {
			configFile: 'jsconfig.json',
		},
		retries: 0,
		video: false,
  	e2e: {
  	  setupNodeEvents(on, config) {
  	    // implement node event listeners here
  	  },
	},
	env: {
		baseUrl: 'https://www.saucedemo.com',
		endpoint: {
			inventory: '/inventory.html'
		},
		login: {
			username: 'standard_user',
			password: 'secret_sauce'
		}
	}
});


