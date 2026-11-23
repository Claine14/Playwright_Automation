module.exports = {
  default: {
    requireModule: ['ts-node/register'],
    require: ['src/step-definitions/**/*.ts'],
    paths: ['src/features/**/*.feature'],
    format: [
      'progress-bar',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    formatOptions: {
      snippetInterface: 'async-await'
    },
    publishQuiet: true
  }
};
