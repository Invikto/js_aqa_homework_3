module.exports = async function logInTheApp() {
  const BASE_URI = 'https://viktor-silakov.github.io/course-sut/index.html?quick';
  const LOGIN = 'walker@jw.com';
  const PASSWORD = 'password';

  await browser.url(BASE_URI);
  await $('#login').setValue(LOGIN);
  await $('#password').setValue(PASSWORD);
  await $('button').click();
  await $('#spinner').waitForDisplayed({ timeout: 15000, reverse: true });
  const linkToProfileSelector = `a[title="${LOGIN}"]`;
  await $('header').$(linkToProfileSelector).waitForDisplayed({ timeout: 5000, reverse: false });
};
